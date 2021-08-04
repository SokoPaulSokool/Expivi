import { TestBed, ComponentFixture } from '@angular/core/testing';
import { MatDialogModule } from '@angular/material/dialog';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserModule } from '@angular/platform-browser';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ToastrModule } from 'ngx-toastr';
import { AppRoutingModule } from './app-routing.module';
import { AvatorsComponent } from './avators/avators.component';
import { LoginDialogComponent } from './login-dialog/login-dialog.component';
import { ModelDetailsComponent } from './model-details/model-details.component';
import { ModelsListComponent } from './models-list/models-list.component';
import { AuthStateService } from './services/auth/authState.service';
import { of } from 'rxjs';
import { MockAuthStateService } from './helper/mock-helpers';


describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let component: AppComponent;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        MatIconModule,
        MatToolbarModule,
        MatButtonModule,
        MatDialogModule,
        MatInputModule,
        MatSelectModule,
        MatRadioModule,
        MatCardModule,
        ReactiveFormsModule,
        NgxSpinnerModule,
        HttpClientModule,
        ToastrModule.forRoot({
          preventDuplicates: true,
        }),
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      declarations: [
        AppComponent,
        LoginDialogComponent,
        ModelDetailsComponent,
        AvatorsComponent,
        ModelsListComponent,
      ],
      providers: [
        { provide: AuthStateService, useClass: MockAuthStateService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
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

  it('should create the app', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it(`should have as title 'Expivi'`, () => {
    fixture.detectChanges();
    expect(component.title).toEqual('Expivi');
  });

  it('should render title', () => {
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('mat-toolbar span')?.textContent).toContain(
      'Expivi'
    );
  });

  it('should open dialog for login when user is not loggedin', () => {
    spyOn(component, 'openLoginDialog');
    fixture.detectChanges();
    expect(component.openLoginDialog).toHaveBeenCalledTimes(1);
  });

  it('should not open dialog for login when user is not loggedin', () => {
    spyOn(component, 'openLoginDialog');
    localStorage.setItem('token', '12334');
    fixture.detectChanges();
    expect(component.openLoginDialog).toHaveBeenCalledTimes(0);
  });
  it('should logout', () => {
    spyOn(component.authStateService, 'logOut');
    fixture.detectChanges();
    component.logout()
    expect(component.authStateService.logOut).toHaveBeenCalledTimes(1);
  });
});
