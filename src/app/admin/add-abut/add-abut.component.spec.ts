import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAbutComponent } from './add-abut.component';

describe('AddAbutComponent', () => {
  let component: AddAbutComponent;
  let fixture: ComponentFixture<AddAbutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddAbutComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddAbutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
