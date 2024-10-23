import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InformeConsultaComponent } from './informe-consulta.component';

describe('InformeConsultaComponent', () => {
  let component: InformeConsultaComponent;
  let fixture: ComponentFixture<InformeConsultaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InformeConsultaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InformeConsultaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
