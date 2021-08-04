import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelect, MatSelectModule } from '@angular/material/select';
import { MatToolbarModule } from '@angular/material/toolbar';
import { By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AvatorsComponent } from '../avators/avators.component';
import {
  MockAuthStateService,
  MockModelsStateService,
} from '../helper/mock-helpers';
import { AuthStateService } from '../services/auth/authState.service';
import { ModelsStateService } from '../services/models/modelsState.service';

import { ModelsListComponent } from './models-list.component';

describe('ModelsListComponent', () => {
  let component: ModelsListComponent;
  let fixture: ComponentFixture<ModelsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModelsListComponent, AvatorsComponent],
      imports: [
        BrowserAnimationsModule,
        MatDialogModule,
        MatIconModule,
        MatToolbarModule,
        MatButtonModule,
        MatDialogModule,
        MatInputModule,
        MatSelectModule,
        MatRadioModule,
        MatCardModule,
      ],
      providers: [
        { provide: AuthStateService, useClass: MockAuthStateService },
        { provide: ModelsStateService, useClass: MockModelsStateService },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModelsListComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should detect key changes of search input', () => {
    fixture.detectChanges();
    const searchInputElement = fixture.debugElement.query(
      By.css('#search')
    ).nativeElement;
    searchInputElement.value = 'a';
    const event = new KeyboardEvent('keyup', {
      bubbles: true,
      cancelable: true,
      shiftKey: false,
    });
    searchInputElement.dispatchEvent(event);
    expect(component.searchValue).toBe('a');
    searchInputElement.value = '';
    searchInputElement.dispatchEvent(event);
    expect(component.searchValue).toBe('');
  });

  it('should detect key changes of Search By input', () => {
    fixture.detectChanges();
    const searchByElement = fixture.debugElement.query(By.css('#searchBy'));

    searchByElement.triggerEventHandler('selectionChange', { value: 'name' });
    fixture.detectChanges();
    expect(component.searchByKey).toBe('name');
    searchByElement.triggerEventHandler('selectionChange', { value: 'vertices' });
    fixture.detectChanges();
    expect(component.searchByKey).toBe('vertices');
  });

  it('should detect key changes of Sort By input', () => {
    fixture.detectChanges();
    const sortByElement = fixture.debugElement.query(By.css('#sortBy'));

    sortByElement.triggerEventHandler('selectionChange', { value: 'name' });
    fixture.detectChanges();
    expect(component.sortByKey).toBe('name');
    sortByElement.triggerEventHandler('selectionChange', { value: 'vertices' });
    fixture.detectChanges();
    expect(component.sortByKey).toBe('vertices');
  });

  it('should detect key changes of Sort Order  input', () => {
    fixture.detectChanges();
    const sortOrderElement = fixture.debugElement.query(By.css('#sortOrder'));

    sortOrderElement.triggerEventHandler('selectionChange', { value: 'asc' });
    fixture.detectChanges();
    expect(component.sortOrder).toBe('asc');
    sortOrderElement.triggerEventHandler('selectionChange', { value: 'desc' });
    fixture.detectChanges();
    expect(component.sortOrder).toBe('desc');
    
  });
});
