import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AvatorsComponent } from './avators.component';

describe('AvatorsComponent', () => {
  let component: AvatorsComponent;
  let fixture: ComponentFixture<AvatorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AvatorsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AvatorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
