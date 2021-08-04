import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { of } from 'rxjs';
import { MockRequestService } from 'src/app/helper/mock-helpers';
import { RequestService } from '../general/request/request.service';

import { AuthService } from './auth.service';
import { AuthStateService } from './authState.service';

class MockAuthService{
  login=()=>of({plainTextToken:"ss"});
  logOut=()=>of({});
}
describe('AuthStateService', () => {
  let service: AuthStateService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: AuthService, useClass: MockAuthService }
      ],
    });
    service = TestBed.inject(AuthStateService);
  });

  beforeEach(function () {
    let store: any = {};

    spyOn(localStorage, 'getItem').and.callFake((key: string) => {
      return store[key];
    });
    spyOn(localStorage, 'setItem').and.callFake(
      (key: string, value: string) => {
        return (store[key] = value + '');
      }
    );
    spyOn(localStorage, 'clear').and.callFake(() => {
      store = {};
    });
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should set IsLoggedIn true', (done) => {
    service.setIsLoggedIn(true);
    service.isLoggedIn$.subscribe((res) => {
      expect(res).toEqual(true);
      done();
    });
  });

  it('should set IsLoggedIn false', (done) => {
    service.setIsLoggedIn(false);
    service.isLoggedIn$.subscribe((res) => {
      expect(res).toEqual(false);
      done();
    });
  });

  it('should call login success', () => {

    spyOn(service.auth,"login").and.returnValue(of({plainTextToken:"ss"}))
    service.login("","");
    expect(service.auth.login).toHaveBeenCalledTimes(1);
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);

  });
  it('should call login fail', () => {
    spyOn(service.auth,"login").and.returnValue(of({plainTextToken:""}))
    service.login("","");
    expect(service.auth.login).toHaveBeenCalledTimes(1);
    expect(localStorage.setItem).toHaveBeenCalledTimes(0);

  });

  it('should logout', (done) => {
    service.logOut();
    service.isLoggedIn$.subscribe((res) => {
      expect(res).toEqual(false);
      done();
    });
  });
});
