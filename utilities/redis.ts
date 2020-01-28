import { createClient, RedisClient } from "redis";
import { promisify } from "util";

const redisPrefix = "design-op:";

export const plainRedisConnection = () => {
  const client = createClient({
    prefix: redisPrefix
  });
  const redisSet: Function = promisify(client.set).bind(client);
  const redisGet: Function = promisify(client.get).bind(client);
  const redisExpire: Function = promisify(client.expire).bind(client);
  const redisDel: Function = promisify(client.del).bind(client);
  const redisKeys: Function = promisify(client.keys.bind(client));
  const redisHset: Function = promisify(client.hset).bind(client);
  const redisHgetAll: Function = promisify(client.hgetall).bind(client);
  const redisTTL: Function = promisify(client.ttl).bind(client);
  return {
    redisSet,
    redisGet,
    redisExpire,
    redisDel,
    redisKeys,
    redisHset,
    redisHgetAll,
    redisTTL
  };
};

export const getCachedObject = async (path: string, objectId: string) => {
  const { redisGet } = plainRedisConnection();
  const objectValue = await redisGet(`${path}:${objectId}`);
  return JSON.parse(objectValue);
};

export const setObjectCache = (
  path: string,
  objectId: string,
  objectValue: any,
  duration: number = 3600
) => {
  const { redisSet, redisExpire } = plainRedisConnection();
  redisSet(`${path}:${objectId}`, JSON.stringify(objectValue));
  redisExpire(`${path}:${objectId}`, duration);
};

export default plainRedisConnection;
