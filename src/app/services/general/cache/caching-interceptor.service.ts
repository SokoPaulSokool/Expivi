import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { CacheService } from './cache.service';

@Injectable({
  providedIn: 'root',
})
export class CachingInterceptorService implements HttpInterceptor {
  constructor(private cache: CacheService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    if (this.isCachable(req)) {
      // Gets cached data of a request and returns it
      let cachedResponse = this.cache.get(req.url);
      return cachedResponse
        ? of(cachedResponse)
        : this.sendNewRequest(req, next);
    } else {
      return this.sendNewRequest(req, next);
    }
  }

  // Allows only caching for GET requests
  isCachable(req: any) {
    return req.method === 'GET' ? true : false;
  }

  // Taps data of a requests and caches it
  sendNewRequest(req: HttpRequest<any>, next: HttpHandler) {
    return next
      .handle(req)
      .pipe(tap((event) => this.cache.set(req.url, event, new Date())));
  }
}
