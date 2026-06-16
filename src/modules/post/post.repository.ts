import prisma from "../../db/connectDB";
import { Prisma } from "../../../generated/prisma/client";

class PostRepository {
  async findAllPosts() {
    return prisma.post.findMany();
  }

  async createPost(data: Prisma.PostCreateInput) {
    return prisma.post.create({ data });
  }

  async findPostById(id: number) {
    return prisma.post.findUnique({ where: { id } });
  }

  async updatePost(id: number, data: Prisma.PostUpdateInput) {
    return prisma.post.update({ where: { id }, data });
  }

  async deletePost(id: number) {
    return prisma.post.delete({ where: { id } });
  }
}

export default PostRepository;
