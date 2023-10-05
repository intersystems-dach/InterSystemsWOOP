import {
  Component,
  Input,
  Output,
  EventEmitter,
  HostListener,
} from '@angular/core';
import { Chapter } from 'src/utils/classes';
import { ColorSchemeService } from '../services/color-scheme.service';
@Component({
  selector: 'app-chapter-selection',
  templateUrl: './chapter-selection.component.html',
  styleUrls: ['./chapter-selection.component.scss'],
})
export class ChapterSelectionComponent {
  @Input() chapters: Chapter[] = [];

  @Output() chapterSelected = new EventEmitter<string>();
  @Output() chapterEditSelected = new EventEmitter<string>();

  newChapter: boolean = false;

  chapterToDelete: Chapter | undefined = undefined;

  constructor(
    private colorSchemeService: ColorSchemeService
  ) {}

  onChapterSelected(chapterName: string) {
    this.chapterSelected.emit(chapterName);
  }

  onChapterEditSelected(chapterName: string) {
    this.chapterEditSelected.emit(chapterName);
  }

  setChapterToDelete(chapter: Chapter) {
    this.chapterToDelete = chapter;
  }

  getDarkModeEnabled() {
    return this.colorSchemeService.darkModeEnabled;
  }
}
