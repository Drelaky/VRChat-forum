import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Anwers } from './anwers';

describe('Anwers', () => {
  let component: Anwers;
  let fixture: ComponentFixture<Anwers>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Anwers]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Anwers);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
