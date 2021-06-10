import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KshListInputComponent } from './ksh-list-input.component';

describe('KshListInputComponent', () => {
  let component: KshListInputComponent;
  let fixture: ComponentFixture<KshListInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KshListInputComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(KshListInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
