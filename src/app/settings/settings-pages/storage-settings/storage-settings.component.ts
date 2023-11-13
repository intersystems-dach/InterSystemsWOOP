import { Component } from '@angular/core';
import { LocalStorageService } from '../../../services/local-storage.service';
import { NotificationComponent } from 'src/app/notification/notification.component';

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
    NotificationComponent.showNotification(
      'Storage cleared',
      'All data has been deleted.'
    );
  }

  getRememberPage(): boolean {
    return this.localStorageService.rememberPage;
  }

  toggleRememberPage() {
    this.localStorageService.setRememberPage(
      !this.localStorageService.rememberPage
    );
  }

  coookiesAccepted(): boolean {
    return LocalStorageService.cookiesAccepted;
  }

  toggleCookiesAccepted() {
    if (LocalStorageService.cookiesAccepted) {
      LocalStorageService.rejectCookies();
      NotificationComponent.showNotification(
        'Cookies rejected',
        'Cookies will not be used.'
      );
      return;
    }
    LocalStorageService.acceptCookies();
    NotificationComponent.showNotification(
      'Cookies accepted',
      'Cookies will be used.'
    );
  }
}
