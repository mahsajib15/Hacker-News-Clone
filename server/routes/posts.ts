import { db } from "@/adapter";
import type { Context } from "@/context";
import { postsTable } from "@/db/schemas/posts";
import { loggedIn } from "@/middleware/loggedin";
import { createPostSchema } from "@/shared/types";
import type { SuccessResponse } from "@/shared/types";
import { zValidator } from "@hono/zod-validator"
import { Hono } from "hono";


export const postRouter = new Hono<Context>().post("/", loggedIn, zValidator("form", createPostSchema),
 async (c) => {
    const {title, url, content } = c.req.valid("form");
    const user = c.get("user")!;
    const [post] = await db.insert(postsTable).values({
        title,
        content, 
        url,
        userId: user.id
    }).returning({ id: postsTable.id });
    return c.json<SuccessResponse<{ postId: number }>>({
        success: true,
        message: "Post Created",
        data: { postId: post.id }
    }, 201)
 },
);