import { Component } from '@angular/core';
import { LocalStorageService } from '../../../services/local-storage.service';

@Component({
  selector: 'app-storage-settings',
  templateUrl: './storage-settings.component.html',
  styleUrls: ['./storage-settings.component.scss', '../stylesheet.scss'],
})
export class StorageSettingsComponent {
  showSelectChapter = false;

  constructor(private localStorageService: LocalStorageService) {}

  clearStorage() {
    this.localStorageService.clearAll();
    alert('Storage cleared!');
  }

  getRememberPage(): boolean {
    return this.localStorageService.rememberPage;
  }

  toggleRememberPage() {
    this.localStorageService.setRememberPage(
      !this.localStorageService.rememberPage
    );
  }
}
