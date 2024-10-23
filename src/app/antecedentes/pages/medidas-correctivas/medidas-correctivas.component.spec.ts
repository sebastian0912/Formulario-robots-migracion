import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MedidasCorrectivasComponent } from './medidas-correctivas.component';

describe('MedidasCorrectivasComponent', () => {
  let component: MedidasCorrectivasComponent;
  let fixture: ComponentFixture<MedidasCorrectivasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MedidasCorrectivasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MedidasCorrectivasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
