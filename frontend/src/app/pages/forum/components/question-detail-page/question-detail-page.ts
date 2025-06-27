import { Component, OnDestroy, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ForumService } from '../../../../shared/services/forum-service';
import { SmartDatePipe } from '../../../../shared/pipes/smart-date-pipe';
import { SafePipe } from '../../../../shared/pipes/safe-pipe';
import { Anwers } from '../../../../shared/components/anwers/anwers';

@Component({
  selector: 'app-question-detail-page',
  imports: [RouterModule, SmartDatePipe, SafePipe, Anwers],
  templateUrl: './question-detail-page.html',
  styleUrl: './question-detail-page.scss',
})
export class QuestionDetailPage implements OnInit, OnDestroy {
  dummyQuestion = {
    id: '1',
    title: 'Lorem Ipsum is simply dummy text',
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    date: new Date(),
    html: `
      <header>
    <h1>Dummy Weboldal</h1>
  </header>

  <main>
    <h2>Üdvözöllek!</h2>
    <p>Ez egy példa HTML fájl, amit teszteléshez vagy sablonnak is használhatsz.</p>

    <h3>Lista példa:</h3>
    <ul>
      <li>Első elem</li>
      <li>Második elem</li>
      <li>Harmadik elem</li>
    </ul>

    <h3>Űrlap példa:</h3>
    <form>
      <label for="name">Név:</label><br>
      <input type="text" id="name" name="name"><br><br>
      
      <label for="email">Email:</label><br>
      <input type="email" id="email" name="email"><br><br>
      
      <input type="submit" value="Küldés">
    </form>
  </main>

  <footer>
    <p>&copy; 2025 Dummy Cég</p>
  </footer>`,
    tags: [],
    replies: 2,
    views: 13,
    mainTopic: 'Vrchat',
    altTopic: 'UdonSharp',
    soled: false,
    author: {
      name: 'Test user',
    },
  };

  constructor(private readonly forumService: ForumService) {}

  ngOnInit(): void {
    this.forumService.isQestionDetailPage.update(() => true);
  }

  ngOnDestroy(): void {
    this.forumService.isQestionDetailPage.update(() => false);
  }
}
