import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { faPen, faT } from '@fortawesome/pro-regular-svg-icons';
import { TranslocoPipe } from '@jsverse/transloco';
import { takeUntil } from 'rxjs';
import { ApiService } from '../../../../core/services/api.service';
import { WithDestroyObservable } from '../../../../mixins/with-destroy-observable';
import { InputComponent } from '../../../../shared/components/input-component/input-component';
import { ApiResponse } from '../../../../shared/types/api.types';
import { Router } from '@angular/router';
import { ForumService } from '../../../../shared/services/forum-service';
import { MainCategory } from '../../../../shared/types/mainCategory.types';

@Component({
  selector: 'app-create-new-topic',
  imports: [InputComponent, ReactiveFormsModule, TranslocoPipe],
  templateUrl: './create-new-topic.html',
  styleUrl: './create-new-topic.scss',
})
export class CreateNewTopic
  extends WithDestroyObservable(Object)
  implements OnInit
{
  formGroup!: ReturnType<typeof this.genereateCreateForm>;
  faT = faT;
  faPen = faPen;
  currentUrl!: string;

  currentMainCategory!: MainCategory | null;

  constructor(
    private readonly apiService: ApiService,
    private readonly router: Router,
    private readonly forumService: ForumService
  ) {
    super();

    this.currentUrl = this.router.url.split('/').at(-1) ?? '';
  }

  ngOnInit(): void {
    this.formGroup = this.genereateCreateForm();
    this.forumService.CurrentMainCategory.pipe(
      takeUntil(this.destroy$)
    ).subscribe((o) => {
      this.currentMainCategory = o;
    });
  }

  genereateCreateForm() {
    return new FormGroup({
      title: new FormControl<string>('', { nonNullable: true }),
      description: new FormControl<string>('', { nonNullable: true }),
    });
  }

  saveMainCategory(): void {
    if (this.currentUrl === 'create-main-category') {
      this.apiService
        .saveMainCategory(this.formGroup)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: (response: ApiResponse<string, string>) => {
            console.log(response.result);
          },
        });
    } else {
      if (!this.currentMainCategory) {
        return console.log('ja');
      }

      this.apiService
        .saveSubCategory(this.currentMainCategory.id, this.formGroup)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: (response: ApiResponse<string, string>) => {
            console.log(response.result);
          },
        });
    }
  }
}
