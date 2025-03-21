import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SchemeBookComponent } from './scheme-book.component';

describe('SchemeBookComponent', () => {
  let component: SchemeBookComponent;
  let fixture: ComponentFixture<SchemeBookComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SchemeBookComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SchemeBookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
