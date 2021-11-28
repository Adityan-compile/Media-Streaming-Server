const expressRedisCache = require("express-redis-cache");

const env = process.env;

const options = {
  host: env.REDIS_HOST,
  port: env.REDIS_PORT,
  expire: {
    200: parseInt(env.CACHE_EXPIRY),
    500: 0,
    400: 0,
    xxx: parseInt(env.CACHE_EXPIRY),
  },
};

const cache = expressRedisCache(options);

cache.on("connected", () => {
  console.info(`[${new Date().toJSON()}]`, "Cache Connected");
});

cache.on("disconnected", () => {
  console.info(`Error [${new Date().toJSON()}]`, "Redis Cache Disconnected");
});

export default cache;
