import { Component, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { ColorSchemeService } from '../../services/color-scheme.service';
import { LocalStorageService } from '../../services/local-storage.service';

@Component({
  selector: 'app-settings-short',
  templateUrl: './settings-short.component.html',
  styleUrls: ['./settings-short.component.sass'],
})
export class SettingsShortComponent {
  logIn: boolean = false;

  constructor(
    private router: Router,
    private colorSchemeService: ColorSchemeService,
    private localStorageService: LocalStorageService
  ) {}

  increaseFontSize() {
    this.localStorageService.setFontSize(
      this.localStorageService.getFontSize() + 2
    );
  }

  decreaseFontSize() {
    let fontSize = this.localStorageService.getFontSize();
    if (fontSize > 2) {
      this.localStorageService.setFontSize(fontSize - 2);
    }
  }

  getFontSize() {
    return this.localStorageService.getFontSize();
  }

  @HostListener('document:keydown.control.alt.l', ['$event'])
  toggleLogIn() {
    this.logIn = !this.logIn;
    if (this.logIn) {
      this.router.navigate(['/login']);
    }
  }

  getDarkModeEnabled() {
    return this.colorSchemeService.darkModeEnabled;
  }

  goToAdvancedSettings() {
    this.router.navigate(['/settings/storage']);
  }
  hoToHelp() {
    this.router.navigate(['/help']);
  }

  toggleDarkMode() {
    this.colorSchemeService.darkModeEnabled =
      !this.colorSchemeService.darkModeEnabled;
    if (this.colorSchemeService.darkModeEnabled) {
      this.colorSchemeService.darkMode();
    } else {
      this.colorSchemeService.lightMode();
    }
  }
}
