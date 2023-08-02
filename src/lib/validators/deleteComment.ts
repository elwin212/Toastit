import {z} from "zod";

export const deleteCommentValidator = z.object({    
    commentId: z.string(),  
});


export type DeleteCommentRequest = z.infer<typeof deleteCommentValidator>;