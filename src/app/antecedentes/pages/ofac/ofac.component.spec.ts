import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OfacComponent } from './ofac.component';

describe('OfacComponent', () => {
  let component: OfacComponent;
  let fixture: ComponentFixture<OfacComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OfacComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OfacComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
