import ToFeedButton from "@/components/ToFeedButtom";
import { db } from "@/lib/db";
import Image from "next/image";
import Link from "next/link";


const Page = async () => {
    const groups = await db.subreddit.findMany({
        orderBy: {
            createdAt: "desc"
        },
        include: {
            subscribers: true,
            posts: true,
        },
        take: 50,
    });
        
    return (       
        <>
        <div><ToFeedButton /></div>
        <div className="container flex items-center h-full max-w-2xl mx-auto">              
                <div className="relative bg-white w-full h-fit p-4 rounded-lg space-y-6">                                    
                    <div className="flex justify-between items-center">
                        <h1 className="text-xl font-semibold mb-1">Groups</h1> 
                        <p className="text-sm text-zinc-400">Choose a Group to subscribe!</p>                       
                    </div>                    
                    <hr className='bg-red-500 h-px' />                    
                    {groups.map((group) => (
                        <div key={group.id} className="flex items-center justify-between">
                            {/* Create a link for each group */}          
                            <div className="flex items-center">                                                  
                            <Image
                                src="/favicon-32x32.png"
                                alt="My Icon"
                                width={30}
                                height={30}
                                className="h-8 w-8 sm:h-6 sm:w-6"
                            />                                                            
                            <Link href={`/r/${group.name}`} className="text-lg ml-2 text-black hover:underline">
                                {group.name}
                            </Link>
                            <p className="text-sm text-zinc-500">&nbsp;&nbsp;-&nbsp;&nbsp;{group.posts.length} posts</p>           
                            </div>
                            <div className="flex items-center">                 
                            <span >Members: {group.subscribers.length}</span>
                            </div>                            
                        </div>
                    ))}
                </div>
        </div>
        </>
    );
}

export default Page;