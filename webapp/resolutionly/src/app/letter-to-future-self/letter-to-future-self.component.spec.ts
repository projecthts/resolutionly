import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LetterToFutureSelfComponent } from './letter-to-future-self.component';

describe('LetterToFutureSelfComponent', () => {
  let component: LetterToFutureSelfComponent;
  let fixture: ComponentFixture<LetterToFutureSelfComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LetterToFutureSelfComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LetterToFutureSelfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
