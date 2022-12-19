import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartaSComponent } from './carta-s.component';

describe('CartaSComponent', () => {
  let component: CartaSComponent;
  let fixture: ComponentFixture<CartaSComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CartaSComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CartaSComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
