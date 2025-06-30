import { Injectable } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { BehaviorSubject, filter } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class BreadcrumbService {
  private breadcrumbsSubject = new BehaviorSubject<
    Array<{ label: string; url: string }>
  >([]);

  public MainCategoryData!: { title: string; url: string } | null;
  public altCategoryData!: { title: string; url: string } | null;
  public readonly breadcrumbs$ = this.breadcrumbsSubject.asObservable();

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {
    const navigation = this.router.getCurrentNavigation();
    const state = navigation?.extras.state;
    this.MainCategoryData = state?.['mainCategoryId_title'];
    this.altCategoryData = state?.['altTopic']?.title;

    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        console.log(state);
        const breadcrumbs = this.createBreadcrumbs(this.activatedRoute.root);
        this.breadcrumbsSubject.next(breadcrumbs);
      });
  }

  private createBreadcrumbs(
    route: ActivatedRoute,
    url: string = '',
    breadcrumbs: Array<{ label: string; url: string }> = []
  ): Array<{ label: string; url: string }> {
    const children: ActivatedRoute[] = route.children;

    if (children.length === 0) return breadcrumbs;

    for (const child of children) {
      const breadcrumbKeys = child.snapshot?.data['breadcrumbKeys'];
      const staticTitle = child.snapshot?.data['title'];
      const breadcrumbKey = child.snapshot?.data['breadcrumbKey'];
      const skip = child.snapshot?.data['skipBreadcrumb'];
      let label = staticTitle;

      if (breadcrumbKeys) {
        let index = 0;
        let generatedLabel = '';
        let generatedUrl: string[] = [];

        for (let key of breadcrumbKeys) {
          generatedLabel = this.titleCase(child.snapshot?.paramMap.get(key)!);
          generatedUrl.push(child.snapshot?.url[index].path);
          breadcrumbs.push({
            label: generatedLabel,
            url: this.buildPathSegments(generatedUrl)[index],
          });
          index++;
        }
      }

      const routeURL: string = child.snapshot?.url
        .map((seg) => seg.path)
        .join('/');
      if (routeURL !== '') {
        url += `/${routeURL}`;
      }

      if (
        !label &&
        breadcrumbKey &&
        child.snapshot?.paramMap.has(breadcrumbKey)
      ) {
        if (this.altCategoryData) {
          label = this.altCategoryData.title;
        }

        if (this.MainCategoryData) {
          label = this.MainCategoryData;
        } else {
          label = this.titleCase(child.snapshot?.paramMap.get(breadcrumbKey)!);
        }
      }

      if (label && !skip) {
        breadcrumbs.push({ label, url });
      }

      return this.createBreadcrumbs(child, url, breadcrumbs);
    }

    return breadcrumbs;
  }

  private titleCase(str: string): string {
    return str.replace(/[-_]/g, ' ');
  }

  private buildPathSegments(segments: string[]): string[] {
    const result: string[] = [];

    for (let i = 0; i < segments.length; i++) {
      if (i === 0) {
        result.push(segments[i]);
      } else {
        result.push(`${result[i - 1]}/${segments[i]}`);
      }
    }

    return result;
  }
}
