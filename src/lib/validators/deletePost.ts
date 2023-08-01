import {z} from "zod";

export const deletePostValidator = z.object({    
    postId: z.string(),  
});

export type DeletePostRequest = z.infer<typeof deletePostValidator>;