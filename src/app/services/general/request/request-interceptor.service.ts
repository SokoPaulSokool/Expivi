import {
  HttpErrorResponse,
  HttpHandler,
  HttpHeaders,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Observable, throwError } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';
import { AuthStateService } from '../../auth/authState.service';

@Injectable({
  providedIn: 'root',
})
export class RequestInterceptorService implements HttpInterceptor {
  activeRequests: number = 0;
  constructor(
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    public authStateService: AuthStateService
  ) {}
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<any> {
    // checks for the token and add it to the request headers
    let token = localStorage.getItem('token');
    if (!token) {
      token = '';
    }else{
      this.authStateService.setIsLoggedIn(true);
    }
    const authReq = request.clone({
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      }),
    });

    // only show spinner if there are no active requests
    if (this.activeRequests === 0) {
      this.spinner.show();
    }
    this.activeRequests++;


    return next.handle(authReq).pipe(
      catchError((error: HttpErrorResponse) => {
        // Check for errors and show them in a toaster and hide the spinner
        let errorMsg = '';
        if (error.error instanceof ErrorEvent) {
          errorMsg = `Error: ${error.error}`;

        } else {
          if(error.status === 401){
            this.authStateService.setIsLoggedIn(false);
          }
          if (error.status === 503 || error.status === 0) {
            errorMsg = `server is no avalilable`;
          } else {
            errorMsg = ` ${error.error}`;
          }
        }
        console.log(error)
        this.spinner.hide();
        this.toastr.error(errorMsg);
        return throwError(errorMsg);
      }),
      finalize(() => {
        this.activeRequests--;
        if (this.activeRequests === 0) {
          this.spinner.hide();
        }
      })
    );
  }
}
