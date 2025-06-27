import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForumHome } from './forum-home';

describe('ForumHome', () => {
  let component: ForumHome;
  let fixture: ComponentFixture<ForumHome>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ForumHome]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ForumHome);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
