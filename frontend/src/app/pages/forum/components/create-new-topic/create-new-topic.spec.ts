import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateNewTopic } from './create-new-topic';

describe('CreateNewTopic', () => {
  let component: CreateNewTopic;
  let fixture: ComponentFixture<CreateNewTopic>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateNewTopic]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateNewTopic);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
