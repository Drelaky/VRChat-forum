import { ActivatedRoute } from '@angular/router';

export type Breadcrumb = {
  readonly title: string;
  readonly url: string | null;
  readonly ActivatedRoute: ActivatedRoute;
};
