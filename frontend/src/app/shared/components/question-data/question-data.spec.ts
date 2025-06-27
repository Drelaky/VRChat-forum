import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionData } from './question-data';

describe('QuestionData', () => {
  let component: QuestionData;
  let fixture: ComponentFixture<QuestionData>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuestionData]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuestionData);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
