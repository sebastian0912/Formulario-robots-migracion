import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SisbenComponent } from './sisben.component';

describe('SisbenComponent', () => {
  let component: SisbenComponent;
  let fixture: ComponentFixture<SisbenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SisbenComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SisbenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
