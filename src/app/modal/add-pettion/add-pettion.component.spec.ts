import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPettionComponent } from './add-pettion.component';

describe('AddPettionComponent', () => {
  let component: AddPettionComponent;
  let fixture: ComponentFixture<AddPettionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddPettionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddPettionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
