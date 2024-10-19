import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnionPdfComponent } from './union-pdf.component';

describe('UnionPdfComponent', () => {
  let component: UnionPdfComponent;
  let fixture: ComponentFixture<UnionPdfComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UnionPdfComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UnionPdfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
