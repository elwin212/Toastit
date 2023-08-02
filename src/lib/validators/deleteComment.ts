import {z} from "zod";

export const deleteCommentValidator = z.object({    
    commentId: z.string(),  
});

export type DeleteCommetRequest = z.infer<typeof deleteCommentValidator>;