package com.azoudmustafa.service.caching;

import org.springframework.cache.Cache;
import org.springframework.cache.CacheManager;
import org.springframework.cache.caffeine.CaffeineCache;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.Set;

@Service
public class CacheInspectorService {

    private final CacheManager cacheManager;

    public CacheInspectorService(CacheManager cacheManager) {
        this.cacheManager = cacheManager;
    }

    public Set<Object> getKeysFromCache(String cacheName) {
        try {
            CaffeineCache cache =(CaffeineCache) cacheManager.getCache(cacheName);
            if (cache != null) {
                com.github.benmanes.caffeine.cache.Cache<Object, Object> nativeCache =
                        cache.getNativeCache();
                return nativeCache.asMap().keySet();
            }
        } catch (Exception e) {
            // You can log the exception here or handle it as appropriate for your use case.
        }
        return Collections.emptySet();
    }
}
