import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearSandwichComponent } from './crear-sandwich.component';

describe('CrearSandwichComponent', () => {
  let component: CrearSandwichComponent;
  let fixture: ComponentFixture<CrearSandwichComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CrearSandwichComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrearSandwichComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
