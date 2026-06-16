export const config = {
  port: process.env["PORT"],
  env: process.env["NODE_ENV"],
  databaseUrl: process.env["DATABASE_URL"],
  redisUrl: process.env["REDIS_URL"],
  jwtAccessSecret:
    process.env["JWT_ACCESS_SECRET"] ,
  jwtAccessExpiresIn: process.env["JWT_ACCESS_EXPIRES_IN"] ,
  jwtRefreshSecret:
    process.env["JWT_REFRESH_SECRET"],
  jwtRefreshExpiresIn: process.env["JWT_REFRESH_EXPIRES_IN"] || "7d",
  
};
