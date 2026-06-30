import AppError from "../../errors/appError";
import { status } from "../../utils/status";
import { Prisma } from "../../../generated/prisma/client";
import PostRepository from "./post.repository";

class PostService {
  constructor(private postRepo: PostRepository) {}

  async createPost(data: Prisma.PostCreateInput) {
    return this.postRepo.createPost(data);
  }

  async findAllPosts(query: Record<string, unknown>) {
    return this.postRepo.findAllPosts(query);
  }

  async findPostById(id: string) {
    if (!id) {
      throw new AppError("Enter a valid post Id", status.NOT_FOUND);
    }
    return this.postRepo.findPostById(id);
  }

  async updatePost(id: string, data: Prisma.PostUpdateInput) {
    if (!id) {
      throw new AppError("Enter a valid post Id", status.NOT_FOUND);
    }
    return this.postRepo.updatePost(id, data);
  }

  async deletePost(id: string) {
    return this.postRepo.deletePost(id);
  }
}

export default PostService;
