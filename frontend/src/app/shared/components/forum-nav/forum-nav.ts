import { Component, computed, inject, OnInit, Signal } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { BreadcrumbsComponent } from '../breadcrumbs-component/breadcrumbs-component';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { faNewspaper } from '@fortawesome/pro-regular-svg-icons';
import { TranslocoPipe } from '@jsverse/transloco';
import { InputComponent } from '../input-component/input-component';
import { ForumService } from '../../services/forum-service';

@Component({
  selector: 'app-forum-nav',
  imports: [
    BreadcrumbsComponent,
    FontAwesomeModule,
    InputComponent,
    TranslocoPipe,
  ],
  templateUrl: './forum-nav.html',
  styleUrl: './forum-nav.scss',
})
export class ForumNav {
  faNewspaper = faNewspaper;
  iconSearch = faNewspaper;

  searchControl: FormControl<string> = new FormControl('', {
    nonNullable: true,
  });

  constructor(private readonly router: Router) {}

  searchForum(): void {
    if (!this.searchControl.value && this.searchControl.value === '') {
      this.router.navigate(['/', 'forum', 'search']);
    }
  }

  private forumService = inject(ForumService);

  isSearchPage = computed(() => this.forumService.isSearchPage());
}
