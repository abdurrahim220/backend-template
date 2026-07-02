import prisma from "../../db/connectDB";
import { Prisma } from "../../../generated/prisma/client";
import AppError from "../../errors/appError";
import { status } from "../../utils/status";

class UserRepository {
  async findAllUsers() {
    return prisma.user.findMany();
  }

  async createUser(data: Prisma.UserCreateInput) {
    return prisma.user.create({ data });
  }

  async findUserById(id: string) {
    const findUser = await prisma.user.findUnique({ where: { id } });
    if (!findUser) {
      throw new AppError("user not found", status.NOT_FOUND);
    }
    return findUser;
  }

  async updateUser(id: string, data: Prisma.UserUpdateInput) {
    const findUser = await prisma.user.findUnique({ where: { id } });
    if (!findUser) {
      throw new AppError("user not found", status.NOT_FOUND);
    }

    return prisma.user.update({ where: { id: findUser.id }, data });
  }

  async deleteUser(id: string) {
    if (!id) {
      throw new AppError("id is required", status.BAD_REQUEST);
    }
    return prisma.user.delete({ where: { id } });
  }
}

export default UserRepository;
