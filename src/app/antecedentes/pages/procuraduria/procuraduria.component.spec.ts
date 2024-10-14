import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcuraduriaComponent } from './procuraduria.component';

describe('ProcuraduriaComponent', () => {
  let component: ProcuraduriaComponent;
  let fixture: ComponentFixture<ProcuraduriaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProcuraduriaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProcuraduriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
