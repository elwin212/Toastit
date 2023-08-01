import { getAuthSession } from '@/lib/auth';
import { db } from '@/lib/db';
import { deletePostValidator } from '@/lib/validators/deletePost';
import { z } from 'zod';

export async function PATCH(req: Request) {
  try {
    const body = await req.json();
    
    const { postId } = deletePostValidator.parse(body);
    
    const fakeId = "clkrpreq70001uev0t9sy0zaw";
    

    const session = await getAuthSession();

    if (!session?.user) {
      return new Response('Unauthorized', { status: 401 });
    }
    
    await db.post.delete({
        where: {
            id: postId,
        },
        include: {
            comments: true,
            votes: true,
            author: true,
            subreddit: true,
        },
    });  

    return new Response('OK');

  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(error.message, { status: 400 });
    }

    return new Response(
      'Could not post to delete post at this time. Please try later',
      { status: 500 }
    );
  }
};