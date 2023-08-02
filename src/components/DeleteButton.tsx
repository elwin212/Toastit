'use client'
import { FC, startTransition } from 'react'
import { Button } from './ui/Button'
import { useRouter } from 'next/navigation'
import { useMutation } from '@tanstack/react-query'
import axios from 'axios'
import { toast } from '@/hooks/use-toast';
import { DeletePostRequest } from '@/lib/validators/deletePost'


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
                title: "Something went wrong...",
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

    const handleDelete = () => {
        // Show a confirmation message using window.alert
        const confirmDelete = window.confirm('Are you sure you want to delete the post?');
        if (confirmDelete) {
          deletePost();
        }
      };

    return <Button className='ml-auto bg-red-500' variant="destructive" size="xs" onClick={handleDelete}> Delete </Button>    
}

export default DeleteButton;