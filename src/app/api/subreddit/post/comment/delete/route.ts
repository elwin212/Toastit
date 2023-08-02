import { getAuthSession } from '@/lib/auth';
import { db } from '@/lib/db';
import { deleteCommentValidator } from '@/lib/validators/deleteComment';
import { z } from 'zod';

export async function PATCH(req: Request) {
  try {
    const body = await req.json();
    
    const { commentId } = deleteCommentValidator.parse(body);
    
    const session = await getAuthSession();

    if (!session?.user) {
      return new Response('Unauthorized', { status: 401 });
    }
    
    await db.comment.delete({
        where: {
            id: commentId,
        },
        include: {            
            votes: true,
            author: true,
            post: true,
            replies: true,            
        },
    });  

    return new Response('OK');

  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(error.message, { status: 400 });
    }

    return new Response(
      'Could not post to delete comment at this time. Please try later',
      { status: 500 }
    );
  }
};