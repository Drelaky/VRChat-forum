import { Component, OnDestroy, OnInit, WritableSignal } from '@angular/core';
import { InputComponent } from '../../shared/components/input-component/input-component';
import { FormControl } from '@angular/forms';
import { faSearch } from '@fortawesome/pro-regular-svg-icons';
import { SearchFilter } from '../../shared/components/search-filter/search-filter';
import { HeaderService } from '../../shared/services/headerService';
import { ForumService } from '../../shared/services/forum-service';

@Component({
  selector: 'app-search',
  imports: [InputComponent, SearchFilter],
  templateUrl: './search.html',
  styleUrl: './search.scss',
})
export class Search implements OnInit, OnDestroy {
  searchControl: FormControl<string> = new FormControl<string>('', {
    nonNullable: true,
  });
  faSearch = faSearch;

  constructor(private readonly forumService: ForumService) {}

  ngOnInit(): void {
    this.forumService.isSearchPage.update(() => true);
  }

  ngOnDestroy(): void {
    this.forumService.isSearchPage.update(() => false);
  }
}
