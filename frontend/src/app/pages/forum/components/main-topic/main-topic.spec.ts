import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainTopic } from './main-topic';

describe('MainTopic', () => {
  let component: MainTopic;
  let fixture: ComponentFixture<MainTopic>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MainTopic]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MainTopic);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
