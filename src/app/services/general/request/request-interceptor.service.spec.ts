import { HttpErrorResponse, HttpRequest } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { ToastrModule } from 'ngx-toastr';
import { of } from 'rxjs';
import { take } from 'rxjs/operators';
import { MockRequestService } from 'src/app/helper/mock-helpers';

import { RequestInterceptorService } from './request-interceptor.service';
import { RequestService } from './request.service';

describe('RequestInterceptorService', () => {
  let service: RequestInterceptorService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        ToastrModule.forRoot({
          preventDuplicates: true,
        }),
      ],
      providers: [{ provide: RequestService, useClass: MockRequestService }],
    });
    service = TestBed.inject(RequestInterceptorService);
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
