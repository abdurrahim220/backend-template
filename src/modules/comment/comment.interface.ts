
export interface CreateCommentDto {
  content: string;
  postId: string;
  authorId: string;
  parentId: string;
}

export interface UpdateCommentDto {
  content?: string;
  postId?: string;
  authorId?: string;
  parentId?: string;
}