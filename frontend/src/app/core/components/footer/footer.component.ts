import { Component } from '@angular/core';
import { TranslocoPipe } from '@jsverse/transloco';

@Component({
  selector: 'app-footer',
  imports: [TranslocoPipe],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
})
export class FooterComponent {
  footerItems = [
    {
      title: 'FOOTER.FOOTER_SUPPORT.TITLE',
      actions: [
        {
          title: 'FOOTER.FOOTER_SUPPORT.ACTIONS.CONTACT_US',
          url: '',
        },
      ],
    },
    {
      title: 'FOOTER.FOOTER_RESOURCES.TITLE',
      actions: [
        {
          title: 'FOOTER.FOOTER_RESOURCES.ACTIONS.TERMS_OF_SERVICE',
          url: '',
        },
        {
          title: 'FOOTER.FOOTER_RESOURCES.ACTIONS.PRIVACY_POLICY',
          url: '',
        },
      ],
    },
  ];
}
