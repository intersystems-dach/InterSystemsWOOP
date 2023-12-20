import { Component } from '@angular/core';
import { ChaptermanagerService } from '../../../services/chaptermanager.service';
import { VerifyCache } from 'src/utils/classes';
import { ColorSchemeService } from '../../../services/color-scheme.service';
import { NotificationComponent } from 'src/app/notification/notification.component';

@Component({
  selector: 'app-woops-settings',
  templateUrl: './woops-settings.component.html',
  styleUrls: ['./woops-settings.component.sass', '../stylesheet.scss'],
})
export class WoopsSettingsComponent {
  constructor(
    private chapterManager: ChaptermanagerService,
    private colorSchemeService: ColorSchemeService
  ) {}

  verifyAllChapters() {
    localStorage.removeItem('verifyCache');
    this.chapterManager.allChapters.forEach((chapter) => {
      VerifyCache.verifyChapter(chapter.Title, chapter.Password, true);
    });
    NotificationComponent.showNotification(
      'Verification',
      'All chapters have been verified'
    );
  }

  getColorSchemeService(): ColorSchemeService {
    return this.colorSchemeService;
  }

  viewChaptersJSON() {
    fetch('assets/chapters').then((response) => {
      response.text().then((raw) => {
        raw = atob(raw);
        raw = decodeURIComponent(escape(raw));
        let json = JSON.parse(raw);
        console.log(json);
        NotificationComponent.showNotification(
          'Chapters JSON',
          'Open the console to view the chapters.json file'
        );
      });
    });
  }
}
