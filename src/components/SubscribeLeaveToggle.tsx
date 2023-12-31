'use client'
import { FC, startTransition } from 'react';
import { Button } from './ui/Button';
import { useMutation } from '@tanstack/react-query';
import { SubscribeToSubredditPayload } from '@/lib/validators/subreddit';
import axios, { AxiosError } from 'axios';
import { toast } from '@/hooks/use-toast';
import { useCustomToasts } from '@/hooks/use-website-toast';
import { useRouter } from 'next/navigation';


//get the paramaters from parent
interface SubscribeLeaveToggleProps {
  subredditId: string;
  subredditName: string;
  isSubscribed: boolean;
};

const SubscribeLeaveToggle: FC<SubscribeLeaveToggleProps> = ({subredditId, subredditName, isSubscribed}) => {    
    const { loginToast } = useCustomToasts();
    const router = useRouter();

    const {mutate: subscribe, isLoading: isSubLoading } = useMutation({
        mutationFn: async () => {
            const payload: SubscribeToSubredditPayload = {
                subredditId,
            }
            const {data} = await axios.post("/api/subreddit/subscribe", payload);
            return data as string;
        },
        onError: (err) => {
            if(err instanceof AxiosError){
                if(err.response?.status === 401) {
                    return loginToast();
                }
            }

            return toast({
                title: "Something went wrong...",
                description: "Please try again later",
                variant: "destructive",
            });
        },

        onSuccess: () => {
            startTransition(() => {
                router.refresh();
            })

            toast({
                title: 'Subscribed!',
                description: `You are now subscribed to r/${subredditName}`,
            })
        },
    });

    const { mutate: unsubscribe, isLoading: isUnsubLoading } = useMutation({
        mutationFn: async () => {
          const payload: SubscribeToSubredditPayload = {
            subredditId,
          }
    
          const { data } = await axios.post('/api/subreddit/unsubscribe', payload)
          return data as string
        },
        onError: (err: AxiosError) => {
          toast({
            title: 'Error',
            description: err.response?.data as string,
            variant: 'destructive',
          })
        },
        onSuccess: () => {
          startTransition(() => {
            // Refresh the current route and fetch new data from the server without
            // losing client-side browser or React state.
            router.refresh()
          })
          toast({
            title: 'Unsubscribed!',
            description: `You are now unsubscribed from/${subredditName}`,
          })
        },
      })

      return isSubscribed ? (
        <Button
          className='w-full mt-1 mb-4'
          isLoading={isUnsubLoading}
          onClick={() => unsubscribe()}>
          Leave community
        </Button>
      ) : (
        <Button
          className='w-full mt-1 mb-4'
          isLoading={isSubLoading}
          onClick={() => subscribe()}>
          Join to post
        </Button>
      )
    };

export default SubscribeLeaveToggle;