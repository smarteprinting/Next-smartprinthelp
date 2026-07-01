import { connectDB } from '@/lib/mongodb';
import { successResponse, errorResponse } from '@/lib/response';
import { protectMiddleware, adminMiddleware } from '@/middleware/auth';
import Chat from '@/models/Chat';

/**
 * PUT /api/chats/[id]/read
 * Mark all messages in a chat as read (admin only)
 */
export async function PUT(request, { params }) {
  try {
    await connectDB();

    const authResult = await protectMiddleware(request);
    if (authResult.error) {
      return errorResponse(authResult.message, authResult.status);
    }

    const adminCheck = adminMiddleware(authResult.user);
    if (adminCheck.error) {
      return errorResponse(adminCheck.message, adminCheck.status);
    }

    const { id } = await params;
    const chat = await Chat.findById(id);

    if (!chat) {
      return errorResponse('Chat not found', 404);
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
  } catch (error) {
    console.error('Chat read PUT error:', error);
    return errorResponse('Server error: ' + error.message, 500);
  }
}
