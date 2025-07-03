import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faArrowRight } from '@fortawesome/pro-regular-svg-icons';
import { filter, takeUntil } from 'rxjs';
import { QuestionListComponent } from '../../../../shared/components/question-list-component/question-list-component';
import { WithDestroyObservable } from '../../../../mixins/with-destroy-observable';
import { ForumService } from '../../../../shared/services/forum-service';
import {
  AltCategory,
  MainCategory,
} from '../../../../shared/types/mainCategory.types';
import { ApiService } from '../../../../core/services/api.service';
import { ApiResponse } from '../../../../shared/types/api.types';

@Component({
  selector: 'app-main-topic',
  imports: [FontAwesomeModule, QuestionListComponent],
  templateUrl: './main-topic.html',
  styleUrl: './main-topic.scss',
})
export class MainTopic extends WithDestroyObservable(Object) implements OnInit {
  faArrowRight = faArrowRight;
  mainTopic!: MainCategory | null;
  altTopic!: AltCategory | null;
  altCategoryId!: string;
  isAltTopic: boolean = false;
  MainCategoryId!: string;

  constructor(
    private readonly router: Router,
    private readonly fourmService: ForumService,
    private readonly apiService: ApiService
  ) {
    super();
  }

  ngOnInit(): void {
    this.fourmService.CurrentMainCategory.pipe(
      takeUntil(this.destroy$)
    ).subscribe((o) => {
      if (o) {
        this.MainCategoryId = o.id;
      }
    });

    this.fourmService.CurrentAltCategory.pipe(
      takeUntil(this.destroy$)
    ).subscribe((o) => {
      console.log(o);
      if (o) {
        this.altCategoryId = o.id;
      }
    });

    this.getMainCategoryOneById();

    if (this.isAltTopic) {
      this.getSubCategoryOneById();
    }

    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((o) => {
        o.url.split('/').length >= 4
          ? (this.isAltTopic = true)
          : (this.isAltTopic = false);

        if (this.isAltTopic) {
          this.getSubCategoryOneById();
        }
      });
  }

  goToTopic(topic: AltCategory): void {
    this.isAltTopic = true;
    this.altCategoryId = topic.id;
    this.router.navigate(['/', 'forum', this.mainTopic?.url, topic.url], {
      state: {
        altTopic: topic,
        mainCategoryId: this.mainTopic?.id,
        altCategoryId: topic.id,
      },
    });
  }

  getMainCategoryOneById() {
    this.apiService
      .getMainCategoryOneById(this.MainCategoryId)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (res: ApiResponse<string, MainCategory[]>) => {
          this.mainTopic = res.result[0];
        },
        error: (err: any) => {
          console.log(err);
        },
      });
  }

  getSubCategoryOneById() {
    this.apiService
      .getSubCategoryOneById(this.altCategoryId)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (res: ApiResponse<string, AltCategory[]>) => {
          this.altTopic = res.result[0];
        },
      });
  }
}
