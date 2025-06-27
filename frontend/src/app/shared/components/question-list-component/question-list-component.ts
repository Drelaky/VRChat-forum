import { Component } from '@angular/core';
import { SmartDatePipe } from '../../pipes/smart-date-pipe';
import * as freesolid from '@fortawesome/free-solid-svg-icons';
import * as proRegular from '@fortawesome/pro-regular-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-question-list-component',
  imports: [SmartDatePipe, FontAwesomeModule, RouterModule],
  templateUrl: './question-list-component.html',
  styleUrl: './question-list-component.scss',
})
export class QuestionListComponent {
  faStar = freesolid.faStar;
  faStarPro = proRegular.faStar;
  faCircleCheck = freesolid.faCircleCheck;
  faCircleCheckPro = proRegular.faCircleCheck;
  questions = [
    {
      id: '1',
      title: 'Lorem Ipsum is simply dummy text',
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
      date: new Date(),
      tags: [],
      replies: 1,
      views: 13,
      mainTopic: 'Vrchat',
      altTopic: 'UdonSharp',
      soled: false,
      author: {
        name: 'Test user',
      },
    },
    {
      id: '2',
      title: 'Lorem Ipsum is simply dummy text',
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
      date: new Date('2025-05-21:02:25:30'),
      tags: [],
      replies: 1,
      views: 13,
      mainTopic: 'TEST',
      altTopic: 'BABY',
      soled: false,
      author: {
        name: 'Test user',
      },
    },
    {
      id: '3',
      title: 'Lorem Ipsum is simply dummy text',
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
      date: new Date('2025-06-19:17:40:10'),
      tags: [],
      replies: 1,
      views: 13,
      mainTopic: '',
      altTopic: '',
      soled: false,
      author: {
        name: 'Test user',
      },
    },
    {
      id: '4',
      title: 'Lorem Ipsum is simply dummy text',
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
      date: new Date('2020-06-19:17:40:10'),
      tags: [],
      replies: 1,
      views: 13,
      mainTopic: '',
      altTopic: '',
      soled: false,
      author: {
        name: 'Test user',
      },
    },
    {
      id: '5',
      title: 'Lorem Ipsum is simply dummy text',
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
      date: new Date(),
      tags: [],
      replies: 1,
      views: 13,
      mainTopic: '',
      altTopic: '',
      soled: false,
      author: {
        name: 'Test user',
      },
    },
  ];

  constructor(private readonly router: Router) {}

  openQuestion(question: any) {
    console.log(question);
    console.log(question.mainTopic, question.altTopic, question.id);

    this.router.navigate([
      '/',
      'forum',
      question.mainTopic,
      question.altTopic,
      question.id,
    ]);
  }
}
