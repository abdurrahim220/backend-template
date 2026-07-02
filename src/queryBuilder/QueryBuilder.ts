import { Prisma } from "../../generated/prisma/client";

type QueryParams = Record<string, unknown>;
type Order = Prisma.SortOrder;

export class QueryBuilder<T extends object> {
  private readonly query: QueryParams;

  private where: Record<string, unknown> = {};

  private orderBy: Record<string, Order> = {
    createdAt: "desc",
  };

  private page = 1;
  private limit = 20;

  constructor(query: QueryParams) {
    this.query = query;
  }

  /**
   * Search
   */
  search(fields: (keyof T)[]) {
    const search = this.query.search;

    if (typeof search === "string" && search.trim()) {
      this.where.OR = fields.map((field) => ({
        [field]: {
          contains: search,
          mode: "insensitive",
        },
      }));
    }

    return this;
  }

  /**
   * Exact filters
   */
  filterBy(fields: (keyof T)[]) {
    fields.forEach((field) => {
      const value = this.query[field as string];

      if (value === undefined) return;

      let parsedValue: unknown = value;

      if (value === "true") parsedValue = true;
      else if (value === "false") parsedValue = false;
      else if (!Number.isNaN(Number(value))) parsedValue = Number(value);

      this.where[field as string] = parsedValue;
    });

    return this;
  }

  /**
   * Date range
   */
  dateRange(field: keyof T) {
    const fieldName = field as string;

    const from = this.query[`${fieldName}From`];
    const to = this.query[`${fieldName}To`];

    const range: Record<string, Date> = {};

    if (typeof from === "string") {
      const date = new Date(from);

      if (!Number.isNaN(date.getTime())) {
        range.gte = date;
      }
    }

    if (typeof to === "string") {
      const date = new Date(to);

      if (!Number.isNaN(date.getTime())) {
        range.lte = date;
      }
    }

    if (Object.keys(range).length) {
      this.where[fieldName] = range;
    }

    return this;
  }

  /**
   * Sorting
   */
  sortBy(defaultSort?: Partial<Record<keyof T, Order>>) {
    const sortBy = this.query.sortBy;
    const sortOrder = this.query.sortOrder;

    if (typeof sortBy === "string") {
      this.orderBy = {
        [sortBy]: sortOrder === "asc" ? "asc" : "desc",
      };
    } else if (defaultSort) {
      this.orderBy = defaultSort as Record<string, Order>;
    }

    return this;
  }

  /**
   * Pagination
   */
  paginate(defaultLimit = 20) {
    const page = Number(this.query.page);
    const limit = Number(this.query.limit);

    this.page = page > 0 ? page : 1;
    this.limit = limit > 0 ? limit : defaultLimit;

    return this;
  }

  /**
   * Prisma Query
   */
  getQuery() {
    return {
      where: this.where,
      orderBy: this.orderBy,
      skip: (this.page - 1) * this.limit,
      take: this.limit,
    };
  }

  /**
   * Only where
   */
  getWhere() {
    return this.where;
  }

  /**
   * Meta
   */
  getMeta(total: number) {
    return {
      page: this.page,
      limit: this.limit,
      total,
      totalPages: Math.ceil(total / this.limit),
    };
  }
}
