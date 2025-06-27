import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-topics',
  imports: [FontAwesomeModule],
  templateUrl: './topics.html',
  styleUrl: './topics.scss',
})
export class Topics {
  topics = [
    {
      name: 'Angular',
      icon: '',
      posts: 120,
    },
    {
      name: 'React',
      icon: '',
      posts: 95,
    },
    {
      name: 'Vue',
      icon: '',
      posts: 80,
    },
    {
      name: 'Svelte',
      icon: '',
      posts: 50,
    },
    {
      name: 'Node.js',
      icon: '',
      posts: 30,
    },
  ];
}
