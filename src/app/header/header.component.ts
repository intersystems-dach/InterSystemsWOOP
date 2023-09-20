import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Chapter } from 'src/utils/classes';
import { ColorSchemeService } from '../services/color-scheme.service';
import { LocalStorageService } from '../services/local-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass'],
})
export class HeaderComponent {
  showSettings = false;

  @Input() enableSearchBar: boolean = true;
  @Input() chapter: Chapter | null = null;
  @Output() pageChange: EventEmitter<number> = new EventEmitter<number>();

  searchBarOn = false;

  constructor(
    private router: Router,
    private colorSchemeService: ColorSchemeService,
    private localStorageService: LocalStorageService
  ) {}

  goBack() {
    this.router.navigate(['/']);
  }

  toggleSettings() {
    this.showSettings = !this.showSettings;
  }

  getDarkModeEnabled() {
    return this.colorSchemeService.darkModeEnabled;
  }
  turnOnSearchBar() {
    this.searchBarOn = true;
  }
  turnOffSearchBar() {
    this.searchBarOn = false;
  }
}
