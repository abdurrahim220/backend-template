import prisma from "../../db/connectDB";
import { Prisma, User } from "../../../generated/prisma/client";
import { QueryBuilder } from "../../queryBuilder/QueryBuilder";

class UserRepository {
  async createUser(data: Prisma.UserCreateInput) {
    return prisma.user.create({ data });
  }

  async findAllUsers(query: Record<string, unknown>) {
    const qb = new QueryBuilder<User>(query)
      .search(['name', 'email'])
      .filterBy(['name', 'email'])
      .dateRange('createdAt')
      .sortBy({ createdAt: 'desc' })
      .paginate();


    const [users, total] = await Promise.all([
      prisma.user.findMany({
        ...qb.getQuery(),
        include: {
          comments: {
            select: {
              id: true,
              content: true,
            },
          },
          posts: {
            select: {
              id: true,
              title:true,
            }
          }
        }
      }),
      prisma.user.count({
        where: qb.getWhere(),
      }),
    ]);

    return {
      users,
      meta: qb.getMeta(total),
    };
  }

  async findUserById(id: string) {
    return prisma.user.findUnique({
      where: { id },
    });
  }

  async updateUser(id: string, data: Prisma.UserUpdateInput) {
    return prisma.user.update({
      where: { id },
      data,
    });
  }

  async deleteUser(id: string) {
    return prisma.user.delete({
      where: { id },
    });
  }
}

export default UserRepository;
