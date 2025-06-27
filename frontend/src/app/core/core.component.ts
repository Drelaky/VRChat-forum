import {
  Component,
  OnDestroy,
  OnInit,
  Signal,
  WritableSignal,
} from '@angular/core';
import { HeaderComponent } from './components/header/header.component';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderService } from '../shared/services/headerService';

@Component({
  selector: 'app-core',
  imports: [HeaderComponent, RouterOutlet, FooterComponent],
  templateUrl: './core.component.html',
  styleUrl: './core.component.scss',
})
export class CoreComponent implements OnInit, OnDestroy {
  constructor(private readonly headerService: HeaderService) {}

  ngOnInit(): void {
    this.headerService.isMainPage.update(() => true);
  }

  ngOnDestroy(): void {
    this.headerService.isMainPage.update(() => false);
  }
}
