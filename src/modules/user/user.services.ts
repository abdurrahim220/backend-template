import AppError from "../../errors/appError";
import { status } from "../../utils/status";
import { Prisma } from "../../../generated/prisma/client";
import UserRepository from "./user.repository";

class UserService {
  constructor(private userRepo: UserRepository) {}

  async createUser(data: Prisma.UserCreateInput) {
    console.log("data", data);
    return this.userRepo.createUser(data);
  }

  async findAllUsers() {
    return this.userRepo.findAllUsers();
  }

  async findUserById(id: string) {
    if (!id) {
      throw new AppError("Enter a valid user Id", status.NOT_FOUND);
    }
    return this.userRepo.findUserById(id);
  }

  async updateUser(id: string, data: Prisma.UserUpdateInput) {
    if (!id) {
      throw new AppError("Enter a valid user Id", status.NOT_FOUND);
    }
    return this.userRepo.updateUser(id, data);
  }

  async deleteUser(id: string) {
    return this.userRepo.deleteUser(id);
  }
}

export default UserService;
