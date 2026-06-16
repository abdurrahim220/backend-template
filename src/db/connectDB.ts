import { PrismaClient } from "../../generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import pg from "pg";
import { config } from "../config/config";

if (!config.databaseUrl) {
  console.error("❌ Database connection failed");
  process.exit(1);
}

const pool = new pg.Pool({
  connectionString: config.databaseUrl,
});
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

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
