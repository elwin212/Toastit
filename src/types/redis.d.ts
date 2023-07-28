import { Vote, VoteType } from "@prisma/client"

export type CachedPost = {
    id: string
    title: string
    authorUserName: string
    content: string //for json use
    currentVote: VoteType | null
    createdAt: Date
}