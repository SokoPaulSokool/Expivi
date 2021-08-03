import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CacheService {
  constructor() {}

  cache = new Map();
  expiry = 5000;

  // Get cached data for url if it exists and clearing cache if it's expired
  get(url: string) {
    const result = this.cache.get(url);
    if (result) {
      const response = result.response;
      const setDate = result.date;
      return Date.now() - setDate.getTime() > this.expiry
        ? this.delete(url)
        : response;
    } else {
      return null;
    }
  }

  // Save url and response to cache
  set(url: string, response: any, date: any) {
    this.cache.set(url, { response, date });
  }

  // Delete cache of a url
  delete(url: string) {
    this.cache.delete(url);
    return null;
  }
}
