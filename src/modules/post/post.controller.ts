import { status } from "../../utils/status";
import asyncHandler from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import PostService from "./post.services";
import { Request, Response } from "express";

class PostController {
  constructor(private postService: PostService) {}

  createPost = asyncHandler(async (req: Request, res: Response) => {
    const newData = req.body;
    const result = await this.postService.createPost(newData);
    sendResponse(res, {
      statusCode: status.OK,
      success: true,
      message: "Post created successfully",
      data: result,
    });
  });

  getAllPosts = asyncHandler(async (req: Request, res: Response) => {
    const result = await this.postService.findAllPosts();
    sendResponse(res, {
      statusCode: status.OK,
      success: true,
      message: "Posts fetched successfully",
      data: result,
    });
  });

  getPostById = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await this.postService.findPostById(Number(id));
    sendResponse(res, {
      statusCode: status.OK,
      success: true,
      message: "Post fetched successfully",
      data: result,
    });
  });

  updatePost = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await this.postService.updatePost(Number(id), req.body);
    sendResponse(res, {
      statusCode: status.OK,
      success: true,
      message: "Post updated successfully",
      data: result,
    });
  });

  deletePost = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await this.postService.deletePost(Number(id));
    sendResponse(res, {
      statusCode: status.OK,
      success: true,
      message: "Post deleted successfully",
      data: result,
    });
  });
}

export default PostController;