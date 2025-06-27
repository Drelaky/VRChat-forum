import { Component, computed, inject } from '@angular/core';
import { ForumNav } from '../../shared/components/forum-nav/forum-nav';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from '../../core/components/header/header.component';
import { FooterComponent } from '../../core/components/footer/footer.component';
import { ActionButton } from '../../shared/components/action-button/action-button';
import { Event } from '../../shared/components/event/event';
import { QuestionData } from '../../shared/components/question-data/question-data';
import { ForumService } from '../../shared/services/forum-service';

@Component({
  selector: 'app-forum',
  imports: [
    ForumNav,
    RouterOutlet,
    HeaderComponent,
    FooterComponent,
    ActionButton,
    Event,
    QuestionData,
  ],
  templateUrl: './forum.html',
  styleUrl: './forum.scss',
})
export class Forum {
  private forumService = inject(ForumService);
  isQuestionDetail = computed(() => this.forumService.isQestionDetailPage());
}
