export interface CreatePostDto {
  title: string;
  content?: string;
  authorId: string;
}

export interface UpdatePostDto {
  title?: string;
  content?: string;
  published?: boolean;
}