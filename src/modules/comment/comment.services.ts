import { Prisma } from "../../../generated/prisma/client";
import AppError from "../../errors/appError";
import { status } from "../../utils/status";
import { CreateCommentDto, UpdateCommentDto } from "./comment.interface";

import CommentRepository from "./comment.repository";

class CommentService {
  constructor(private commentRepo: CommentRepository) {}

  async createComment(data: CreateCommentDto) {
    const createData: Prisma.CommentCreateInput = {
      content: data.content,
      post: {
        connect: {
          id: data.postId,
        },
      },
      author: {
        connect: {
          id: data.authorId,
        },
      },
    };

    if (data.parentId) {
      createData.parent = {
        connect: {
          id: data.parentId,
        },
      };
    }

    return this.commentRepo.createComment(createData);
  }

  async findAllComments() {
    return this.commentRepo.findAllComments();
  }

  async findCommentById(id: string) {
    if (!id) {
      throw new AppError("Enter a valid comment Id", status.NOT_FOUND);
    }
    return this.commentRepo.findCommentById(id);
  }

  async updateComment(id: string, data: UpdateCommentDto) {
    if (!id) {
      throw new AppError("Enter a valid comment Id", status.NOT_FOUND);
    }
    return this.commentRepo.updateComment(id, data);
  }

  async deleteComment(id: string) {
    return this.commentRepo.deleteComment(id);
  }
}

export default CommentService;