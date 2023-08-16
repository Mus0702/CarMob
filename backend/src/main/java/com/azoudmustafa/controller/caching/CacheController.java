package com.azoudmustafa.controller.caching;

import com.azoudmustafa.service.caching.CacheInspectorService;
import com.github.benmanes.caffeine.cache.Cache;
import org.springframework.cache.caffeine.CaffeineCache;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;
import java.util.Set;
@RestController
@RequestMapping("/cache")
public class CacheController {
    private final CacheInspectorService cacheInspectorService;

    public CacheController(CacheInspectorService cacheInspectorService) {
        this.cacheInspectorService = cacheInspectorService;
    }

    @GetMapping("/keys")
    public Set<Object> getKeysFromCache(@RequestParam String cacheName) {
        return cacheInspectorService.getKeysFromCache(cacheName);
    }
}
