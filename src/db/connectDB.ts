import { PrismaClient } from "../../generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import pg from "pg";
import { config } from "../config/config";

if (!config.databaseUrl) {
  console.error("❌ Database connection failed");
  process.exit(1);
}

// Prevent multiple instances of PrismaClient and pg.Pool in development
declare global {
  var prisma: PrismaClient | undefined;
  var pgPool: pg.Pool | undefined;
}

const pool = globalThis.pgPool ?? new pg.Pool({
  connectionString: config.databaseUrl,
});

if (process.env.NODE_ENV !== "production") {
  globalThis.pgPool = pool;
}

const adapter = new PrismaPg(pool);
const prisma = globalThis.prisma ?? new PrismaClient({ adapter });

if (process.env.NODE_ENV !== "production") {
  globalThis.prisma = prisma;
}

export default prisma;

export async function connectToDatabase() {
  try {
    await prisma.$connect();
    // console.log("dburl", config.databaseUrl);
    console.log("✅ Database connected successfully!");
  } catch (error) {
    console.error("❌ Database connection failed:", error);
    process.exit(1);
  }
}
