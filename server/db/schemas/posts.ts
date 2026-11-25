import { relations } from "drizzle-orm";
import { integer, pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";
import { userTable } from "./auth";
import { postUpvotesTable } from "./upvotes";
import { commentsTable } from "./comments";

export const postsTable = pgTable("posts", {
  id: serial("id").primaryKey(),
  userId: text("user_id").notNull(),
  title: text("title").notNull(),
  url: text("url"),
  content: text("content"),
  points: integer("points").default(0).notNull(),
  commentsCount: integer("comments_count").default(0).notNull(),
  createdAt: timestamp("created_at", {
    withTimezone: true,
  })
    .defaultNow()
    .notNull(),
});


export const postRelations = relations(postsTable, ({ one, many}) => ({
    auther: one(userTable, {
        fields: [postsTable.userId],
        references: [userTable.id],
        relationName: "auther",
    }),
    postUpvotesTable: many(postUpvotesTable, { relationName: "postUpvotes" }),
    comments: many(commentsTable),
}))