import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PolicivoComponent } from './policivo.component';

describe('PolicivoComponent', () => {
  let component: PolicivoComponent;
  let fixture: ComponentFixture<PolicivoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PolicivoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PolicivoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
