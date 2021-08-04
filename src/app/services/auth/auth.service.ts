import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { RequestService } from '../general/request/request.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(public request: RequestService) {}

  // Send request to login endpoint
  login(data: any): Observable<any> {
    return this.request.post(`api/login`, { ...data });
  }

  // Send request to login endpoint
  logOut(): Observable<any> {
    return this.request.get(`api/logout`,{});
  }
}
