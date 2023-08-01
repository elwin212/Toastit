'use client'
import { FC, startTransition } from 'react'
import { Button } from './ui/Button'
import { useRouter } from 'next/navigation'
import { useMutation } from '@tanstack/react-query'
import axios, { AxiosError } from 'axios'
import { toast } from '@/hooks/use-toast';
import { DeletePostRequest } from '@/lib/validators/deletePost'
import { Post, User, Vote } from '@prisma/client'
import { db } from '@/lib/db'

interface DeleteButtonProps {
  postId: string
}

const DeleteButton: FC<DeleteButtonProps> = ({ postId } :DeleteButtonProps) => {
    const router = useRouter();
        
    const {mutate: deletePost } = useMutation({
        mutationFn: async () => {

            const payload: DeletePostRequest = {
                postId
            };

            await axios.patch("/api/subreddit/post/delete", payload);            
        },
        onError: (err) => {  
            console.log(err);
            return toast({
                title: "Something went wrong...123",
                description: `Cant delete post ${postId}`,
                variant: "destructive",
            });
        },

        onSuccess: () => {
            startTransition(() => {
                router.back();
            });

            toast({
                title: 'Deleted!',
                description: "The post has been deleted.",
            });
        },
    });
  return <Button className='ml-auto bg-red-500' variant="destructive" size="sm" onClick={() => deletePost()}> Delete </Button>
}

export default DeleteButton;