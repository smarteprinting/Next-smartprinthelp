import { connectDB } from '@/lib/mongodb';
import { successResponse, errorResponse } from '@/lib/response';
import { protectMiddleware } from '@/middleware/auth';
import Chat from '@/models/Chat';

/**
 * POST /api/chats/[id]/messages
 * Send a message in a chat (same as POST /api/chats/[id] but at /messages sub-path)
 */
export async function POST(request, { params }) {
  try {
    await connectDB();

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
      return errorResponse('Not authorized to send messages in this chat', 403);
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
    console.error('Chat messages POST error:', error);
    return errorResponse('Server error: ' + error.message, 500);
  }
}
