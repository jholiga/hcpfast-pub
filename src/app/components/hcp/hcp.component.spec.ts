import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HCPComponent } from './hcp.component';

describe('HCPComponent', () => {
  let component: HCPComponent;
  let fixture: ComponentFixture<HCPComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HCPComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HCPComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
