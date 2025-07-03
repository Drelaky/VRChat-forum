import { Component } from '@angular/core';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { TranslocoPipe } from '@jsverse/transloco';
import { NgxPermissionsModule } from 'ngx-permissions';
import { filter } from 'rxjs';
import { PermissionEnum } from '../../../mixins/PermissionCode';

@Component({
  selector: 'app-action-button',
  imports: [TranslocoPipe, NgxPermissionsModule, RouterModule],
  templateUrl: './action-button.html',
  styleUrl: './action-button.scss',
})
export class ActionButton {
  permissions = PermissionEnum;
  urlLogic: number = 0;
  url!: string[];
  createMainTopicUrl: boolean = false;
  currentUrl!: string;

  buttons = [
    {
      title: 'FORUM_ACTIONS.ASK_YOUR_QUESTION_BUTTON',
      url: ['/', 'forum', 'ask-your-question'],
      permission: this.permissions.CREATE_POST,
      deniedUrl: ['ask-your-question'],
      urlAllow: 0,
    },
    {
      title: 'FORUM_ACTIONS.CREATE_EVENT',
      url: ['/', 'forum'],
      permission: this.permissions.CREATE_EVENT,
      deniedUrl: ['create-main-category', 'ask-your-question'],
      urlAllow: 0,
    },
    {
      title: 'FORUM_ACTIONS.EDIT_POSTS',
      url: ['/', 'forum'],
      permission: this.permissions.EDIT_POSTS,
      deniedUrl: ['create-main-category', 'ask-your-question'],
      urlAllow: 0,
    },
    {
      title: 'FORUM_ACTIONS.EDIT_OWNER_POST',
      url: ['/', 'forum'],
      permission: this.permissions.EDIT_OWNER_POST,
      deniedUrl: ['create-main-category', 'ask-your-question'],
      urlAllow: 0,
    },
  ];

  constructor(private readonly router: Router) {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((o) => {
        const url = o.url.split('/');
        this.url = url;
        this.urlLogic = url.length;

        this.currentUrl = url.at(-1) ?? '';
      });
  }
}
