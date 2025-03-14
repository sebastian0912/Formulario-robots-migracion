import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdresComponent } from './adres.component';

describe('AdresComponent', () => {
  let component: AdresComponent;
  let fixture: ComponentFixture<AdresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdresComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
