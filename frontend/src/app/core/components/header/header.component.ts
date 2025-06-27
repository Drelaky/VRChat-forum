import { Component, computed, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faAngleDown, faUser } from '@fortawesome/free-solid-svg-icons';
import { faGlobe } from '@fortawesome/pro-regular-svg-icons';
import { ChangeLanguageComponent } from '../../../shared/components/change-language-component/change-language-component';
import { User } from '../../../shared/components/user/user';
import { HeaderService } from '../../../shared/services/headerService';

@Component({
  selector: 'app-header',
  imports: [FontAwesomeModule, RouterModule, ChangeLanguageComponent, User],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  faUser = faUser;
  faGlob = faGlobe;
  faAngleDown = faAngleDown;

  private headerService = inject(HeaderService);
  isMainPage = computed(() => this.headerService.isMainPage());
}
