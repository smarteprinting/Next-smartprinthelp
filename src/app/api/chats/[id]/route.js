import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import { successResponse, errorResponse } from '@/lib/response';
import { protectMiddleware, adminMiddleware } from '@/middleware/auth';
import Chat from '@/models/Chat';

/**
 * GET /api/chats/[id]
 * Get a specific chat (user or admin)
 */
export async function GET(request, { params }) {
  try {
    await connectDB();

    // Protect route
    const authResult = await protectMiddleware(request);
    if (authResult.error) {
      return errorResponse(authResult.message, authResult.status);
    }

    const { id } = await params;
    
    // Special case: "my" returns user's chat
    if (id === 'my') {
      let chat = await Chat.findOne({ user: authResult.user._id }).populate(
        'user',
        'name email avatar'
      );

      if (!chat) {
        chat = await Chat.create({
          user: authResult.user._id,
          messages: [],
          status: 'active',
        });
        chat = await Chat.findById(chat._id).populate(
          'user',
          'name email avatar'
        );
      }

      return successResponse(chat, 'Chat retrieved', 200);
    }

    // Get specific chat by ID
    const chat = await Chat.findById(id).populate(
      'user',
      'name email avatar'
    );

    if (!chat) {
      return errorResponse('Chat not found', 404);
    }

    // Check authorization - user or admin only
    if (
      chat.user._id.toString() !== authResult.user._id.toString() &&
      !authResult.user.isAdmin
    ) {
      return errorResponse('Not authorized to access this chat', 403);
    }

    return successResponse(chat, 'Chat retrieved', 200);
  } catch (error) {
    console.error('Chat GET error:', error);
    return errorResponse('Server error: ' + error.message, 500);
  }
}

/**
 * POST /api/chats/[id]
 * Send a message in a chat
 */
export async function POST(request, { params }) {
  try {
    await connectDB();

    // Protect route
    const authResult = await protectMiddleware(request);
    if (authResult.error) {
      return errorResponse(authResult.message, authResult.status);
    }

    const { id } = await params;
    const body = await request.json();
    const { message } = body;

    if (!message) {
      return errorResponse('Message is required', 400);
    }

    const chat = await Chat.findById(id);

    if (!chat) {
      return errorResponse('Chat not found', 404);
    }

    // Check authorization
    if (
      chat.user.toString() !== authResult.user._id.toString() &&
      !authResult.user.isAdmin
    ) {
      return errorResponse(
        'Not authorized to send messages in this chat',
        403
      );
    }

    const newMessage = {
      sender: authResult.user._id,
      senderModel: 'User',
      message,
      isRead: false,
      timestamp: new Date(),
    };

    chat.messages.push(newMessage);
    chat.lastMessage = message;
    chat.updatedAt = new Date();

    // Increment unread count if message is from user (not admin)
    if (!authResult.user.isAdmin) {
      chat.unreadCount = (chat.unreadCount || 0) + 1;
    }

    await chat.save();

    const updatedChat = await Chat.findById(chat._id).populate(
      'user',
      'name email avatar'
    );

    return successResponse(updatedChat, 'Message sent successfully', 201);
  } catch (error) {
    console.error('Chat POST error:', error);
    return errorResponse('Server error: ' + error.message, 500);
  }
}

/**
 * PUT /api/chats/[id]
 * Mark messages as read or close chat
 * body.action: 'read' or 'close'
 */
export async function PUT(request, { params }) {
  try {
    await connectDB();

    // Protect route
    const authResult = await protectMiddleware(request);
    if (authResult.error) {
      return errorResponse(authResult.message, authResult.status);
    }

    const { id } = await params;
    const body = await request.json();
    const { action } = body;

    const chat = await Chat.findById(id);

    if (!chat) {
      return errorResponse('Chat not found', 404);
    }

    // MARK AS READ - admin only
    if (action === 'read') {
      const adminCheck = adminMiddleware(authResult.user);
      if (adminCheck.error) {
        return errorResponse(adminCheck.message, adminCheck.status);
      }

      // Mark all messages as read
      chat.messages.forEach((msg) => {
        msg.isRead = true;
      });
      chat.unreadCount = 0;

      await chat.save();

      return successResponse(
        { message: 'Messages marked as read' },
        'Messages marked',
        200
      );
    }

    // CLOSE CHAT - admin only
    if (action === 'close') {
      const adminCheck = adminMiddleware(authResult.user);
      if (adminCheck.error) {
        return errorResponse(adminCheck.message, adminCheck.status);
      }

      chat.status = 'closed';
      await chat.save();

      return successResponse(
        { message: 'Chat closed successfully' },
        'Chat closed',
        200
      );
    }

    return errorResponse('Invalid action', 400);
  } catch (error) {
    console.error('Chat PUT error:', error);
    return errorResponse('Server error: ' + error.message, 500);
  }
}
