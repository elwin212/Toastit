'use client'

import { useOnClickOutside } from '@/hooks/use-on-click-outside';
import { formatTimeToNow } from '@/lib/utils';
import { CommentRequest } from '@/lib/validators/comment';
import { Comment, CommentVote, User } from '@prisma/client';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { MessageSquare, Trash } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { FC, startTransition, useRef, useState } from 'react';
import CommentVotes from '../CommentVotes';
import  UserAvatar  from '../UserAvatar';
import { Button } from '../ui/Button';
import { Label } from '../ui/Label';
import { Textarea } from '../ui/Textarea';
import { toast } from '../../hooks/use-toast';
import { useSession } from 'next-auth/react';
import { DeleteCommentRequest } from '@/lib/validators/deleteComment';


type ExtendedComment = Comment & {
    votes: CommentVote[]
    author: User
};

interface PostCommentProps {
    comment: ExtendedComment
    votesCnt: number
    currentVote: CommentVote | undefined
    postId: string
};

const PostComment: FC<PostCommentProps> = ({comment, votesCnt, currentVote, postId}) => {
  const { data: session } = useSession();
  const [isReplying, setIsReplying] = useState<boolean>(false);
  const [input, setInput] = useState<string>(`@${comment.author.username} `)
  const commentRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  useOnClickOutside(commentRef, () => {
    setIsReplying(false)
  });

  const { mutate: postComment, isLoading } = useMutation({
    mutationFn: async ({ postId, text, replyToId }: CommentRequest) => {
      const payload: CommentRequest = { postId, text, replyToId }

      const { data } = await axios.patch(
        `/api/subreddit/post/comment/`,
        payload
      )
      return data;
    },

    onError: () => {
      return toast({
        title: 'Something went wrong.',
        description: "Comment wasn't created successfully. Please try again.",
        variant: 'destructive',
      });
    },
    onSuccess: () => {
      router.refresh();
      setIsReplying(false);
    },
  });

  const {mutate: deleteComment } = useMutation({
    mutationFn: async () => {
        const payload: DeleteCommentRequest = {
            commentId: comment.id
        };
        await axios.patch("/api/subreddit/post/comment/delete", payload);            
    },
    onError: (err) => {  
        console.log(err);
        return toast({
            title: "Something went wrong...",
            description: `Can't delete comment ${postId}`,
            variant: "destructive",
        });
    },

    onSuccess: () => {
        startTransition(() => {
            router.refresh();                                
        });

        toast({
            title: 'Deleted!',
            description: "The comment has been deleted.",
        });
    },
});

const handleDelete = () => {
  // Show a confirmation message using window.alert
  const confirmDelete = window.confirm('Are you sure you want to delete the comment?');
    if (confirmDelete) {
      deleteComment();
    }
  };

  return (
    <div ref={commentRef} className='flex flex-col'>
      <div className='flex items-center'>
        <UserAvatar
          user={{
            name: comment.author.name || null,
            image: comment.author.image || null,
          }}
          className='h-6 w-6'
        />

        <div className='ml-2 flex items-center flex-grow gap-x-2'>
          <p className='text-sm font-medium text-gray-900'>u/{comment.author.username}</p>

          <p className='max-h-40 truncate text-xs text-zinc-500'>
            {formatTimeToNow(new Date(comment.createdAt))}
          </p>          
        </div>
        {session?.user.id === comment.authorId ? 
        <button className="btn btn-xs btn-primary" onClick={handleDelete}>
        <Trash size={16} />
        </button> : null}
        
      </div>

      <p className='text-sm text-zinc-900 mt-2'>{comment.text}</p>

      <div className='flex gap-2 items-center'>
        <CommentVotes
          commentId={comment.id}
          votesAmt={votesCnt}
          currentVote={currentVote}
        />

        <Button
          onClick={() => {
            if (!session) return router.push('/sign-in')
            setIsReplying(true)
          }}
          variant='ghost'
          size='xs'>
          <MessageSquare className='h-4 w-4 mr-1.5' />
          Reply
        </Button>
      </div>

      {isReplying ? (
        <div className='grid w-full gap-1.5'>
          <Label htmlFor='comment'>Your comment</Label>
          <div className='mt-2'>
            <Textarea
              onFocus={(e) =>
                e.currentTarget.setSelectionRange(
                  e.currentTarget.value.length,
                  e.currentTarget.value.length
                )
              }
              autoFocus
              id='comment'
              value={input}
              onChange={(e) => setInput(e.target.value)}
              rows={1}
              placeholder='What are your thoughts?'
            />

            <div className='mt-2 flex justify-end gap-2'>
              <Button
                tabIndex={-1}
                variant='subtle'
                onClick={() => setIsReplying(false)}>
                Cancel
              </Button>
              <Button
                isLoading={isLoading}
                onClick={() => {
                  if (!input) return
                  postComment({
                    postId,
                    text: input,
                    replyToId: comment.replyToId ?? comment.id, // default to top-level comment
                  })
                }}>
                Post
              </Button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default PostComment;