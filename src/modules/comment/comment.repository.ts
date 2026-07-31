import prisma from "../../db/connectDB";
import { Prisma } from "../../../generated/prisma/client";

class CommentRepository {
  async findAllComments() {
    return prisma.comment.findMany();
  }

  async createComment(data: Prisma.CommentCreateInput) {
    return prisma.comment.create({ data });
  }

  async findCommentById(id: string) {
    return prisma.comment.findUnique({ where: { id } });
  }

  async updateComment(id: string, data: Prisma.CommentUpdateInput) {
    return prisma.comment.update({ where: { id }, data });
  }

  async deleteComment(id: string) {
    return prisma.comment.delete({ where: { id } });
  }
}

export default CommentRepository;
