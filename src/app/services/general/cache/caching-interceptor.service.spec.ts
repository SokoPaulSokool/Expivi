import { HttpHandler, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';

import { CachingInterceptorService } from './caching-interceptor.service';
import { take } from 'rxjs/operators';
import { of } from 'rxjs';

describe('CachingInterceptorService', () => {
  let service: CachingInterceptorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CachingInterceptorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should be accept to cache get', () => {
    const res = service.isCachable({ method: 'GET' });
    expect(res).toBeTruthy();
    const res2 = service.isCachable({ method: 'POST' });
    expect(res2).toBeFalsy();
  });

  it('should be intercept', () => {
    const
      response = new HttpRequest("POST","",{status:500}),
      next: any = {
        handle: jasmine.createSpy('handle').and.callFake(() => of(new HttpErrorResponse({status:401}))),
      };
      service.intercept(response as any, next).pipe(take(1))
    expect(service).toBeTruthy();
  });
});
