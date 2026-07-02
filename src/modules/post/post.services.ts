import AppError from "../../errors/appError";
import { status } from "../../utils/status";
import PostRepository from "./post.repository";
import { CreatePostDto, UpdatePostDto } from "./post.interface";

class PostService {
  constructor(private postRepo: PostRepository) {}

  async createPost(data: CreatePostDto) {
    return this.postRepo.createPost({
      title: data.title,
      content: data.content ?? null,
      author: {
        connect: {
          id: data.authorId,
        },
      },
    });
  }

  async findAllPosts(query: Record<string, unknown>) {
    return this.postRepo.findAllPosts(query);
  }

  async findPostById(id: string) {
    if (!id) {
      throw new AppError("Enter a valid post id.", status.BAD_REQUEST);
    }

    const post = await this.postRepo.findPostById(id);

    if (!post) {
      throw new AppError("Post not found.", status.NOT_FOUND);
    }

    return post;
  }

  async updatePost(id: string, data: UpdatePostDto) {
    if (!id) {
      throw new AppError("Enter a valid post id.", status.BAD_REQUEST);
    }

    const post = await this.postRepo.findPostById(id);

    if (!post) {
      throw new AppError("Post not found.", status.NOT_FOUND);
    }

    return this.postRepo.updatePost(id, data);
  }

  async deletePost(id: string) {
    if (!id) {
      throw new AppError("Enter a valid post id.", status.BAD_REQUEST);
    }

    const post = await this.postRepo.findPostById(id);

    if (!post) {
      throw new AppError("Post not found.", status.NOT_FOUND);
    }

    return this.postRepo.deletePost(id);
  }
}

export default PostService;
