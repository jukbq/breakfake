import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SigeinComponent } from './sigein.component';

describe('SigeinComponent', () => {
  let component: SigeinComponent;
  let fixture: ComponentFixture<SigeinComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SigeinComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SigeinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
