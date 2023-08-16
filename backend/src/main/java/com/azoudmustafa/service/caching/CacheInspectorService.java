package com.azoudmustafa.service.caching;

import org.springframework.cache.Cache;
import org.springframework.cache.CacheManager;
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
            Cache cache = cacheManager.getCache(cacheName);
            if (cache != null && cache.getNativeCache() instanceof com.github.benmanes.caffeine.cache.Cache) {
                com.github.benmanes.caffeine.cache.Cache<Object, Object> nativeCache =
                        (com.github.benmanes.caffeine.cache.Cache<Object, Object>) cache.getNativeCache();
                return nativeCache.asMap().keySet();
            }
        } catch (Exception e) {
            // You can log the exception here or handle it as appropriate for your use case.
        }
        return Collections.emptySet();
    }
}
