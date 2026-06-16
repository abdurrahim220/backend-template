
import app from "./app";
import { config } from "./config/config";
import { connectToDatabase } from "./db/connectDB";
import { connectToRedis } from "./db/connectRedis";

async function main() {
  await connectToDatabase();
  await connectToRedis();
  app.listen(config.port, () => {
    console.log(`Server is running on port ${config.port}`);
  });
  
}

 main();