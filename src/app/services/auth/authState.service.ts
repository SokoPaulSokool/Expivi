import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { LoginState } from '../../interfaces/login-state';
import { StateService } from '../general/state/state.service';

const initialState: LoginState = {
  isLoggedIn: false,
};
@Injectable({
  providedIn: 'root',
})
export class AuthStateService extends StateService<LoginState> {
  isLoggedIn$: Observable<Boolean> = this.select((state) => state.isLoggedIn);

  constructor(private auth: AuthService) {
    super(initialState);
  }

  setIsLoggedIn(isLoggedIn: boolean) {
    if (!isLoggedIn) {
      localStorage.removeItem('token');
    }
    this.setState({
      isLoggedIn: isLoggedIn,
    });
  }

  login(email: string, password: string) {
    // Subscribe to login and update state
    this.auth.login({ email, password }).subscribe((results) => {
      const { plainTextToken } = results;
      if (plainTextToken) {
        localStorage.setItem('token', plainTextToken);
        this.setIsLoggedIn(true);
      } else {
        this.setIsLoggedIn(false);
      }
    });
  }
  logOut() {
    // Subscribe to logOut and update state
    this.auth.logOut().subscribe((results) => {
      this.setIsLoggedIn(false);
    });
  }
}
