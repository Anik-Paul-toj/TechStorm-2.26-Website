const NodeCache = require('node-cache');

// Create cache instance (5 min default TTL)
const cache = new NodeCache({ 
  stdTTL: parseInt(process.env.CACHE_TTL) || 300,
  checkperiod: parseInt(process.env.CACHE_CHECK_PERIOD) || 60,
  useClones: false
});

/**
 * Cache middleware for GET requests
 * @param {number} duration - Cache duration in seconds (default: 300)
 */
const cacheMiddleware = (duration = 300) => {
  return (req, res, next) => {
    // Only cache GET requests
    if (req.method !== 'GET') {
      return next();
    }

    const key = `__express__${req.originalUrl || req.url}`;
    const cachedResponse = cache.get(key);

    if (cachedResponse) {
      console.log(`✅ Cache HIT: ${key}`);
      return res.json(cachedResponse);
    }

    console.log(`⚠️ Cache MISS: ${key}`);
    
    // Store original res.json
    res.originalJson = res.json;
    
    // Override res.json to cache the response
    res.json = function(body) {
      cache.set(key, body, duration);
      res.originalJson(body);
    };
    
    next();
  };
};

/**
 * Clear cache manually
 * @param {string} pattern - Pattern to match cache keys (optional)
 */
const clearCache = (pattern) => {
  if (pattern) {
    const keys = cache.keys();
    keys.forEach(key => {
      if (key.includes(pattern)) {
        cache.del(key);
        console.log(`🗑️ Cleared cache: ${key}`);
      }
    });
  } else {
    cache.flushAll();
    console.log('🗑️ Cleared all cache');
  }
};

/**
 * Get cache statistics
 */
const getCacheStats = () => {
  return {
    keys: cache.keys().length,
    stats: cache.getStats()
  };
};

module.exports = { cacheMiddleware, clearCache, cache, getCacheStats };
