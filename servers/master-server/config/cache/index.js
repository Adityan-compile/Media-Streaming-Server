const redis = require("redis");

const env = process.env;

// const cache = redis.createClient({
//   port: env.REDIS_PORT,
//   host: env.REDIS_HOST
// });

const cache = redis.createClient({url:`redis://${env.REDIS_HOST}:${env.REDIS_PORT}`});

cache.connect().then(async() => {
  await cache.ping();
  console.info(`[${new Date().toJSON()}]`, "Redis Cache Connected");
});

cache.on("error", (e) => {
  console.error(`Error [${new Date().toJSON()}]`, "Redis Cache Error");
  console.error(e)
});

const checkCache = async (key) => {
  const res = await cache.get(key);
  if (!res) return null;
  return res;
};

const cacheResponse = async (key, value) => {
  await cache.set(key, value, {
    EX: env.CACHE_EXPIRY || 600,
    NX: true
  });
  return null;
};

module.exports = {
  checkCache,
  cacheResponse,
  redis: cache,
};
