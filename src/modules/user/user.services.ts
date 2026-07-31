import { Prisma } from "../../../generated/prisma/client";
import AppError from "../../errors/appError";
import { status } from "../../utils/status";
import UserRepository from "./user.repository";

class UserService {
  constructor(private userRepo: UserRepository) {}

  async createUser(data: Prisma.UserCreateInput) {
    return this.userRepo.createUser(data);
  }

  async findAllUsers(query: Record<string, unknown>) {
    return this.userRepo.findAllUsers(query);
  }

  async findUserById(id: string) {
    if (!id) {
      throw new AppError("Enter a valid user id.", status.BAD_REQUEST);
    }

    const user = await this.userRepo.findUserById(id);

    if (!user) {
      throw new AppError("User not found.", status.NOT_FOUND);
    }

    return user;
  }

  async updateUser(id: string, data: Prisma.UserUpdateInput) {
    if (!id) {
      throw new AppError("Enter a valid user id.", status.BAD_REQUEST);
    }

    const user = await this.userRepo.findUserById(id);

    if (!user) {
      throw new AppError("User not found.", status.NOT_FOUND);
    }

    return this.userRepo.updateUser(id, data);
  }

  async deleteUser(id: string) {
    if (!id) {
      throw new AppError("Enter a valid user id.", status.BAD_REQUEST);
    }

    const user = await this.userRepo.findUserById(id);

    if (!user) {
      throw new AppError("User not found.", status.NOT_FOUND);
    }

    return this.userRepo.deleteUser(id);
  }
}

export default UserService;
