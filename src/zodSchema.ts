import { z } from "zod"

export const newTodoSchema = z.object({
    title: z.string({required_error: "Title is required!"}).min(1),
    content: z.string({required_error: "Content is required!"}).min(1)
});