import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForumNav } from './forum-nav';

describe('ForumNav', () => {
  let component: ForumNav;
  let fixture: ComponentFixture<ForumNav>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ForumNav]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ForumNav);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
