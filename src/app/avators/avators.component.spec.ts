import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MockAuthStateService, MockModelsStateService } from '../helper/mock-helpers';
import { AuthStateService } from '../services/auth/authState.service';
import { ModelsStateService } from '../services/models/modelsState.service';

import { AvatorsComponent } from './avators.component';

describe('AvatorsComponent', () => {
  let component: AvatorsComponent;
  let fixture: ComponentFixture<AvatorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AvatorsComponent ],
      providers: [
        { provide: AuthStateService, useClass: MockAuthStateService },
        { provide: ModelsStateService, useClass: MockModelsStateService },
      ],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AvatorsComponent);
    component = fixture.componentInstance;

  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should show avators', () => {
    fixture.detectChanges();
    component.modelsStateService.getModels();
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });
});
