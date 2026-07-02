import prisma from "../../db/connectDB";
import { Post, Prisma } from "../../../generated/prisma/client";
import { QueryBuilder } from "../../queryBuilder/QueryBuilder";
class PostRepository {
  async findAllPosts(query: Record<string, unknown>) {
    const qb = new QueryBuilder<Post>(query)
      .search(["title", "content"])
      .filterBy(["published"])
      .dateRange("createdAt")
      .sortBy({
        createdAt: "desc",
      })
      .paginate();

    const [items, total] = await prisma.$transaction([
      prisma.post.findMany({
        ...qb.getQuery(),

        include: {
          author: {
            select: {
              id: true,
              name: true,
            },
          },
        },
      }),

      prisma.post.count({
        where: qb.getWhere(),
      }),
    ]);

    return {
      items,
      meta: qb.getMeta(total),
    };
  }
  async createPost(data: Prisma.PostCreateInput) {
    return prisma.post.create({ data });
  }

  async findPostById(id: string) {
    return prisma.post.findUnique({ where: { id } });
  }

  async updatePost(id: string, data: Prisma.PostUpdateInput) {
    return prisma.post.update({ where: { id }, data });
  }

  async deletePost(id: string) {
    return prisma.post.delete({ where: { id } });
  }
}

export default PostRepository;
