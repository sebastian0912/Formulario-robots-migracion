import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FondoPensionComponent } from './fondo-pension.component';

describe('FondoPensionComponent', () => {
  let component: FondoPensionComponent;
  let fixture: ComponentFixture<FondoPensionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FondoPensionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FondoPensionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
