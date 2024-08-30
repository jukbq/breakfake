import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageOpenComponent } from './image-open.component';

describe('ImageOpenComponent', () => {
  let component: ImageOpenComponent;
  let fixture: ComponentFixture<ImageOpenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ImageOpenComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ImageOpenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
