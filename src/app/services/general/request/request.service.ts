import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class RequestService {
  constructor(private http: HttpClient) {}
  get(
    endpoint: string,
    params: {
      params?: HttpParams | { [param: string]: string | string[] };
      headers?: HttpHeaders | { [header: string]: string | string[] };
    }
  ) {
    return this.http.get<any>(`${environment.backendUrl}/${endpoint}`, params);
  }
  post(endpoint: string, data: any, options = {}): Observable<any> {
    return this.http.post(
      `${environment.backendUrl}/${endpoint}`,
      data,
      options
    );
  }
}
