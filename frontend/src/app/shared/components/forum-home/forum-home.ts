import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faArrowRight } from '@fortawesome/pro-regular-svg-icons';
import { TranslocoPipe } from '@jsverse/transloco';
import { QuestionListComponent } from '../question-list-component/question-list-component';
import { WithDestroyObservable } from '../../../mixins/with-destroy-observable';
import { ApiService } from '../../../core/services/api.service';
import { takeUntil } from 'rxjs';
import { ApiResponse } from '../../types/api.types';
import { MainCategory } from '../../types/mainCategory.types';
import { ForumService } from '../../services/forum-service';

@Component({
  selector: 'app-forum-home',
  imports: [FontAwesomeModule, TranslocoPipe, QuestionListComponent],
  templateUrl: './forum-home.html',
  styleUrl: './forum-home.scss',
})
export class ForumHome extends WithDestroyObservable(Object) implements OnInit {
  faArrowRight = faArrowRight;
  topics: MainCategory[] = [];

  constructor(
    private readonly router: Router,
    private readonly apiService: ApiService,
    private readonly forumService: ForumService
  ) {
    super();
  }

  ngOnInit(): void {
    this.getAllMainTopic();
  }

  goToTopic(topic: MainCategory): void {
    this.forumService.CurrentMainCategory.next(topic);
    this.router.navigate(['/', 'forum', topic.url], {
      state: {
        mainCategoryId_title: topic.title,
        mainCategory: topic,
      },
    });
  }

  getAllMainTopic() {
    this.apiService
      .getMainCategory()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (res: ApiResponse<string, MainCategory[]>) => {
          this.topics = res.result;
        },
      });
  }
}
