export const getOrSetCache = async (key, callback, expiration = 3600) => {
    try {
        const cachedData = await redis.get(key);

        if (cachedData) {
            console.log(`✅ Cache Hit: ${key}`);
            return cachedData;
        }

        console.log(`❌ Cache Miss: ${key}`);

        const freshData = await callback();

        await redis.set(key, freshData, { ex: expiration });

        return freshData;
    } catch (error) {
        console.error("Redis Error:", error.message);

        // Fallback to TMDB
        return await callback();
    }
};
