import { Component, HostListener } from '@angular/core';
import { Chapter } from 'src/utils/classes';
import { ChaptermanagerService } from '../services/chaptermanager.service';
import { ColorSchemeService } from '../services/color-scheme.service';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss'],
})
export class SearchBarComponent {
  searchValue: string = '';
  noMatches: boolean = false;

  constructor(
    private chapterManager: ChaptermanagerService,
    private colorSchemeService: ColorSchemeService
  ) {}

  onSearchChange(): void {
    if (this.searchValue == '') {
      this.chapterManager.chapters = this.chapterManager.allChapters;
      this.noMatches = false;
      return;
    }

    let lowerSearchValue = this.searchValue.toLowerCase();
    if (lowerSearchValue == 'admin') {
      window.location.href = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ';
    }
    if (lowerSearchValue == 'banana') {
      window.location.href = 'https://www.youtube.com/watch?v=9EcjWd-O4jI';
    }
    if (lowerSearchValue == 'pbonin') {
      window.location.href = 'https://philipp-bonin.com/';
    }
    if (lowerSearchValue == 'funky') {
      this.colorSchemeService.funkyMode();
    }

    let words = lowerSearchValue.split(' ');
    let filteredChapters: Chapter[] = [];
    for (let word of words) {
      for (let chapter of this.chapterManager.allChapters) {
        if (chapter.IsPrivate) {
          continue;
        }
        if (
          (!filteredChapters.includes(chapter) &&
            (chapter.Title.toLowerCase().includes(word) ||
              chapter.Description.toLowerCase().includes(word) ||
              chapter.Language.toLowerCase().includes(word) ||
              chapter.Author.toLowerCase().includes(word))) ||
          ('private'.includes(word) && chapter.IsPrivate)
        ) {
          filteredChapters.push(chapter);
        }
      }
    }
    this.noMatches = filteredChapters.length == 0;
    this.chapterManager.chapters = filteredChapters;
  }
  @HostListener('document:keydown.control.alt.c', ['$event'])
  clear(): void {
    this.searchValue = '';
    this.onSearchChange();
  }
}
