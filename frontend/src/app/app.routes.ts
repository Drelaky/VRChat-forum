import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    data: { title: 'BREADCRUMBS.BREADCRUMBS.HOME' },
    children: [
      {
        path: '',
        data: { skipBreadcrumb: true },
        loadComponent: () =>
          import('./core/core.component').then((m) => m.CoreComponent),
        children: [
          {
            path: '',
            pathMatch: 'full',
            loadComponent: () =>
              import('./pages/home-component/home-component').then(
                (m) => m.HomeComponent
              ),
          },
        ],
      },
      {
        path: 'forum',
        data: { title: 'BREADCRUMBS.BREADCRUMBS.FORUM' },
        loadComponent: () => import('./pages/forum/forum').then((m) => m.Forum),
        children: [
          {
            path: '',
            pathMatch: 'full',
            data: { skipBreadcrumb: true },
            loadComponent: () =>
              import('./shared/components/forum-home/forum-home').then(
                (m) => m.ForumHome
              ),
          },
          {
            path: 'create-main-category',
            data: { title: 'BREADCRUMBS.BREADCRUMBS.CREATE-MAIN-CATEGORY' },
            loadComponent: () =>
              import(
                './pages/forum/components/create-new-topic/create-new-topic'
              ).then((m) => m.CreateNewTopic),
          },
          {
            path: 'ask-your-question',
            data: { title: 'BREADCRUMBS.BREADCRUMBS.ASK-YOUR-QUESTION' },
            loadComponent: () =>
              import('./shared/components/ask-question/ask-question').then(
                (m) => m.AskQuestion
              ),
          },
          {
            path: ':category/create-sub-topic',
            data: { title: 'BREADCRUMBS.BREADCRUMBS.CREATE-SUB-TOPIC' },
            loadComponent: () =>
              import(
                './pages/forum/components/create-new-topic/create-new-topic'
              ).then((m) => m.CreateNewTopic),
          },
          {
            path: 'search',
            loadComponent: () =>
              import('./pages/search/search').then((m) => m.Search),
            data: { title: 'BREADCRUMBS.BREADCRUMBS.SEARCH' },
          },
          {
            path: ':category/:subcategory/:id',
            data: { breadcrumbKeys: ['category', 'subcategory', 'id'] },
            loadComponent: () =>
              import(
                './pages/forum/components/question-detail-page/question-detail-page'
              ).then((m) => m.QuestionDetailPage),
          },
          {
            path: ':category',
            data: { breadcrumbKey: 'category' },
            loadComponent: () =>
              import('./pages/forum/components/main-topic/main-topic').then(
                (m) => m.MainTopic
              ),
            children: [
              {
                data: { breadcrumbKey: 'subcategory' },
                path: ':subcategory',
                loadComponent: () =>
                  import('./pages/forum/components/main-topic/main-topic').then(
                    (m) => m.MainTopic
                  ),
              },
            ],
          },
        ],
      },
    ],
  },
  {
    path: '404',
    pathMatch: 'full',
    loadComponent: () =>
      import('./pages/not-found-component/not-found-component').then(
        (m) => m.NotFoundComponent
      ),
    data: { title: 'BREADCRUMBS.BREADCRUMBS.NOT_FOUND', skipBreadcrumb: true },
  },
  {
    path: 'redirection',
    loadComponent: () =>
      import('./shared/components/redirection/redirection').then(
        (m) => m.Redirection
      ),
    data: {
      title: 'BREADCRUMBS.BREADCRUMBS.REDIRECTION',
      skipBreadcrumb: true,
    },
  },
  {
    path: '**',
    redirectTo: '404',
  },
];
