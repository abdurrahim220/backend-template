import { createClient } from "redis";
import { config } from "../config/config";

if (!config.redisUrl) {
  console.error("❌ REDIS_URL is not defined in environment variables.");
  process.exit(1);
}

const redisClient = createClient({
  url: config.redisUrl,
  socket: {
    connectTimeout: 5000,
    reconnectStrategy: (retries) => {

      const delay = Math.min(retries * 100, 3000);
      return delay;
    },
  },
});

redisClient.on("error", (err) => {
  console.error("❌ Redis Client Error:", err);
});

redisClient.on("connect", () => {
  console.log("ℹ️ Redis Client connecting...");
});

redisClient.on("ready", () => {
  console.log("✅ Redis Client ready and connected successfully!");
});

redisClient.on("end", () => {
  console.log("⚠️ Redis Client connection closed.");
});

export async function connectToRedis() {
  try {
    await redisClient.connect();
  } catch (error) {
    console.error("❌ Redis connection initiation failed:", error);
    process.exit(1);
  }
}

export default redisClient;
