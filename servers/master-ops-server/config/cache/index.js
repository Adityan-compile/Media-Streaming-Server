const expressRedisCache = require("express-redis-cache");

const env = process.env;

const options = {
  host: env.REDIS_HOST,
  port: env.REDIS_PORT,
};

const cache = expressRedisCache(options);

export default cache;
