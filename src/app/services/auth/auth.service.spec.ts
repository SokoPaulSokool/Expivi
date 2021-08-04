import { TestBed } from '@angular/core/testing';
import { MockRequestService } from 'src/app/helper/mock-helpers';
import { RequestService } from '../general/request/request.service';

import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [{ provide: RequestService, useClass: MockRequestService }],
    });
    service = TestBed.inject(AuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call login', () => {
    spyOn(service.request,'post');
    service.login({});
    expect(service.request.post).toHaveBeenCalledTimes(1);
  });

  it('should call logout', () => {
    spyOn(service.request,'get');
    service.logOut();
    expect(service.request.get).toHaveBeenCalledTimes(1);
  });

});
