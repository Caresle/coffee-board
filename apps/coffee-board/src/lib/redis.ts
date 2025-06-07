import { createClient, type RedisClientType } from "redis"

let redisClient: RedisClientType | null = null

const init = async () => {
	if (redisClient) return redisClient

	const client = await createClient({
		url: process.env.REDIS_URL,
	})
		.on("error", err => {
			console.error("Redis Client Error", err)
		})
		.connect()

	redisClient = client as RedisClientType

	return redisClient
}

init()

export class RedisCache {
	async set(key: string, value: any, ttl?: number): Promise<void> {
		try {
			if (!redisClient) await init()
			await redisClient?.set(key, JSON.stringify(value))
		} catch (error) {
			console.error(error)
		}
	}

	async get<T>(key: string): Promise<T | null> {
		try {
			if (!redisClient) await init()
			const value = await redisClient?.get(key)
			if (!value) return null
			return JSON.parse(value)
		} catch (error) {
			console.error(error)
			return null
		}
	}

	async delete(key: string): Promise<void> {
		try {
			if (!redisClient) await init()
			await redisClient?.del(key)
		} catch (error) {
			console.error(error)
		}
	}

	async clear(): Promise<void> {
		try {
			if (!redisClient) await init()
			await redisClient?.flushDb()
		} catch (error) {
			console.error(error)
		}
	}
}
