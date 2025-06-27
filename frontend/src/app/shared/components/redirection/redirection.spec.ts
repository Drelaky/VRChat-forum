import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Redirection } from './redirection';

describe('Redirection', () => {
  let component: Redirection;
  let fixture: ComponentFixture<Redirection>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Redirection]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Redirection);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
