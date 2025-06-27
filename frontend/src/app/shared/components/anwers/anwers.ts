import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { SmartDatePipe } from '../../pipes/smart-date-pipe';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faThumbsUp } from '@fortawesome/pro-regular-svg-icons';
import { NgxEditorComponent, NgxEditorMenuComponent, Editor } from 'ngx-editor';
import { FormsModule } from '@angular/forms';
import { SafePipe } from '../../pipes/safe-pipe';

@Component({
  selector: 'app-anwers',
  imports: [
    SmartDatePipe,
    FontAwesomeModule,
    NgxEditorComponent,
    NgxEditorMenuComponent,
    FormsModule,
    SafePipe,
  ],
  templateUrl: './anwers.html',
  styleUrl: './anwers.scss',
})
export class Anwers implements OnInit, OnDestroy {
  @Input() replies!: number;
  @Input() answers: any = [
    {
      title: 'Support Agent',
      badge: 'Author',
      answer:
        "<div>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</div>",
      like: 0,
      solveAnswer: false,
      date: new Date(),
    },
    {
      title: 'Support Agent',
      badge: 'User',
      answer:
        "<div>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</div>",
      like: 1,
      solveAnswer: true,
      date: new Date(),
    },
  ];

  faThumbsUp = faThumbsUp;
  html = '';
  editor!: Editor;

  ngOnInit(): void {
    this.editor = new Editor();
  }

  saveAnswer() {
    this.answers.push({
      title: 'Me',
      badge: 'DEVELOPER',
      answer: this.html,
      like: 0,
      solveAnswer: false,
      date: new Date(),
    });

    this.html = '';
  }

  ngOnDestroy(): void {
    this.editor.destroy();
  }
}
