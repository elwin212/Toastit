import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { redis } from "@/lib/redis";
import { PostVoteValidator } from "@/lib/validators/vote";
import type { CachedPost } from '@/types/redis'
import { z } from "zod";

const CACHE_AFTER_UPVOTES = 5;

export async function PATCH(req:Request) {
    try{
        const body = await req.json();
        
        const {postId, voteType} = PostVoteValidator.parse(body);

        const session = await getAuthSession();

        if(!session?.user) {
            return new Response( "Unauthorized", {status: 401});
        }

        const existVote = await db.vote.findFirst({
            where: {
                userId: session.user.id,
                postId,
            },            
        });

        const post = await db.post.findUnique({
            where: {
                id: postId,
            },
            include: {
                author: true,
                votes: true,
            },
        });

        //if the post does not exist
        if(!post){  
            return new Response("Post not found", {status: 404});
        }

        if(existVote) {
            if(existVote.type === voteType) {
                await db.vote.delete({
                    where: {
                        userId_postId: {
                            postId,
                            userId: session.user.id,
                        },
                    },
                });
                return new Response("OK");
            }
            
            await db.vote.update({
                where: {
                    userId_postId: {
                        postId,
                        userId: session.user.id,
                    },
                },
                data: {
                    type: voteType,
                },
            });

            // recount the votes
            const voteCnt = post.votes.reduce((acc, vote) => {
                if(vote.type === "UP"){
                    return acc++;
                }
                else{
                    return acc--;
                }
                return acc;
            }, 0);

            if(voteCnt >= CACHE_AFTER_UPVOTES){
                const cachePayload: CachedPost = {
                    id:post.id,
                    title: post.title,
                    authorUserName: post.author.username ?? "",
                    content: JSON.stringify(post.content),
                    createdAt: post.createdAt,
                    currentVote: voteType
                };

                await redis.hset(`post:${postId}`, cachePayload);

            }
            return new Response("OK");
        }

        await db.vote.create({
            data: {
                type: voteType,
                userId: session.user.id,
                postId,
            },
        });

        const voteCnt = post.votes.reduce((acc, vote) => {
            if(vote.type === "UP"){
                return acc++;
            }
            else{
                return acc--;
            }
            return acc;
        }, 0);
        
        if(voteCnt >= CACHE_AFTER_UPVOTES){
            const cachePayload: CachedPost = {
                id:post.id,
                title: post.title,
                authorUserName: post.author.username ?? "",
                content: JSON.stringify(post.content),
                createdAt: post.createdAt,
                currentVote: voteType
            };

            await redis.hset(`post:${postId}`, cachePayload);

        }

        return new Response("OK");
    }
    catch (errors) {
        (errors)
        if(errors instanceof z.ZodError){
            return new Response(errors.message, { status: 400 });
        }
        return new Response(
            "Could not post to subreddit at this time. Please try later",
            { status: 500 }
          );
    }
    
}