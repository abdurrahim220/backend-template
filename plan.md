User
   │
   ▼
Post
   │
   ▼
Comment
   │
   ▼
Category
   │
   ▼
Tag
   │
   ▼
Like
   │
   ▼
Bookmark




model Comment {
  id        String   @id @default(cuid())
  content   String

  postId    String
  post      Post     @relation(fields: [postId], references: [id], onDelete: Cascade)

  authorId  String
  author    User     @relation(fields: [authorId], references: [id], onDelete: Cascade)

  parentId  String?
  parent    Comment? @relation("CommentReplies", fields: [parentId], references: [id])
  replies   Comment[] @relation("CommentReplies")

  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}



Post
   │
   ├── Comment
   │      │
   │      └── Reply
   │              │
   │              └── Reply