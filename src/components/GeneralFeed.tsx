import { INFINITE_SCROLLING_PAGINATION_RESULT } from "@/config"
import { db } from "@/lib/db"
import { tr } from "date-fns/locale"
import PostFeed from "./PostFeed";

const GeneralFeed =async () => {
    const post = await db.post.findMany({
        orderBy: {
            createdAt: "desc"
        },
        include: {
            votes: true,
            author: true,
            comments: true,
            subreddit: true,
        },
        take: INFINITE_SCROLLING_PAGINATION_RESULT,
    });

    return <PostFeed initialPosts={post} />;    
};

export default GeneralFeed;