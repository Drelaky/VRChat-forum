import { Component, OnInit, OnDestroy } from '@angular/core';
import { BreadcrumbService } from '../../services/breadcrumb-service';
import { RouterLink } from '@angular/router';
import { TranslocoPipe } from '@jsverse/transloco';
import { Subscription, takeUntil } from 'rxjs';
import { WithDestroyObservable } from '../../../mixins/with-destroy-observable';

@Component({
  selector: 'app-breadcrumbs-component',
  imports: [RouterLink, TranslocoPipe],
  templateUrl: './breadcrumbs-component.html',
  styleUrl: './breadcrumbs-component.scss',
  standalone: true,
})
export class BreadcrumbsComponent
  extends WithDestroyObservable(Object)
  implements OnInit
{
  breadcrumbs: Array<{ label: string; url: string }> = [];

  constructor(private readonly breadcrumbService: BreadcrumbService) {
    super();
  }

  ngOnInit(): void {
    this.breadcrumbService.breadcrumbs$
      .pipe(takeUntil(this.destroy$))
      .subscribe((crumbs) => (this.breadcrumbs = crumbs));
  }

  reset() {
    (this.breadcrumbService.MainCategoryData = null),
      (this.breadcrumbService.altCategoryData = null);
  }
}
