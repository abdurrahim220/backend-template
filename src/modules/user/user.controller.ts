import { status } from "../../utils/status";
import asyncHandler from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import UserService from "./user.services";
import { Request, Response } from "express";

class UserController {
  constructor(private userService: UserService) {}

  createUser = asyncHandler(async (req: Request, res: Response) => {
    const newData = req.body;
    const result = await this.userService.createUser(newData);
    sendResponse(res, {
      statusCode: status.OK,
      success: true,
      message: "User created successfully",
      data: result,
    });
  });

  getAllUsers = asyncHandler(async (req: Request, res: Response) => {
    const result = await this.userService.findAllUsers();
    sendResponse(res, {
      statusCode: status.OK,
      success: true,
      message: "Users fetched successfully",
      data: result,
    });
  });

  getUserById = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await this.userService.findUserById(id as string);
    sendResponse(res, {
      statusCode: status.OK,
      success: true,
      message: "User fetched successfully",
      data: result,
    });
  });

  updateUser = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await this.userService.updateUser(id as string, req.body);
    sendResponse(res, {
      statusCode: status.OK,
      success: true,
      message: "User updated successfully",
      data: result,
    });
  });

  deleteUser = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await this.userService.deleteUser(id as string);
    sendResponse(res, {
      statusCode: status.OK,
      success: true,
      message: "User deleted successfully",
      data: result,
    });
  });
}

export default UserController;
