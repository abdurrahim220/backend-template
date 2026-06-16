import prisma from "../../db/connectDB";
import { Prisma } from "../../../generated/prisma/client";

class UserRepository {
  async findAllUsers() {
    return prisma.user.findMany();
  }

  async createUser(data: Prisma.UserCreateInput) {
    return prisma.user.create({ data });
  }

  async findUserById(id: number) {
    return prisma.user.findUnique({ where: { id } });
  }

  async updateUser(id: number, data: Prisma.UserUpdateInput) {
    return prisma.user.update({ where: { id }, data });
  }

  async deleteUser(id: number) {
    return prisma.user.delete({ where: { id } });
  }
}

export default UserRepository;
