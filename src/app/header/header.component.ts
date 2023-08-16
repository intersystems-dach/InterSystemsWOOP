import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ColorSchemeService } from '../services/color-scheme.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass'],
})
export class HeaderComponent {
  showSettings = false;

  constructor(
    private router: Router,
    private colorSchemeService: ColorSchemeService,
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
}
