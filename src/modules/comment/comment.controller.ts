import { status } from "../../utils/status";
import asyncHandler from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import CommentService from "./comment.services";
import { Request, Response } from "express";

class CommentController {
  constructor(private commentService: CommentService) {}

  createComment = asyncHandler(async (req: Request, res: Response) => {
    const newData = req.body;
    const result = await this.commentService.createComment(newData);
    sendResponse(res, {
      statusCode: status.OK,
      success: true,
      message: "Comment created successfully",
      data: result,
    });
  });

  getAllComments = asyncHandler(async (req: Request, res: Response) => {
    const result = await this.commentService.findAllComments();
    sendResponse(res, {
      statusCode: status.OK,
      success: true,
      message: "Comments fetched successfully",
      data: result,
    });
  });

  getCommentById = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await this.commentService.findCommentById(id as string);
    sendResponse(res, {
      statusCode: status.OK,
      success: true,
      message: "Comment fetched successfully",
      data: result,
    });
  });

  updateComment = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await this.commentService.updateComment(id as string, req.body);
    sendResponse(res, {
      statusCode: status.OK,
      success: true,
      message: "Comment updated successfully",
      data: result,
    });
  });

  deleteComment = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await this.commentService.deleteComment(id as string);
    sendResponse(res, {
      statusCode: status.OK,
      success: true,
      message: "Comment deleted successfully",
      data: result,
    });
  });
}

export default CommentController;