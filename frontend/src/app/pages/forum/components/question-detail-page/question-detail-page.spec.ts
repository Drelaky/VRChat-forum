import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionDetailPage } from './question-detail-page';

describe('QuestionDetailPage', () => {
  let component: QuestionDetailPage;
  let fixture: ComponentFixture<QuestionDetailPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuestionDetailPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuestionDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
