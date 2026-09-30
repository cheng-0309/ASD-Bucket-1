const cache = {};
const TTL = 60 * 1000; // 1 minute

function cacheMiddleware(req, res, next) {
    // --- GET: serve from cache or store after response ---
    if (req.method === 'GET') {
        const key = req.originalUrl;
        const entry = cache[key];

        if (entry && Date.now() - entry.createdAt < TTL) {
            res.set('X-Cache', 'HIT');
            return res.json(entry.data);
        }

        res.set('X-Cache', 'MISS');
        const originalJson = res.json.bind(res);
        res.json = (data) => {
            cache[key] = { data, createdAt: Date.now() };
            return originalJson(data);
        };
        return next();
    }

    // --- POST / PUT / PATCH / DELETE: invalidate all cache on success ---
    const originalJson = res.json.bind(res);
    res.json = (data) => {
        if (res.statusCode < 400) {
            for (const key in cache) delete cache[key];
        }
        return originalJson(data);
    };
    next();
}

module.exports = cacheMiddleware;
