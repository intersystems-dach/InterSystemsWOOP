import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ChaptermanagerService } from '../services/chaptermanager.service';
import { VersionService } from '../services/version.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass'],
})
export class HomeComponent {
  title = 'InterSystemsWOOP';

  isServerOnline = false;

  constructor(
    private router: Router,
    private chapterManager: ChaptermanagerService,
    private versionService: VersionService
  ) {}

  ngOnInit(): void {
    this.chapterManager.init();
  }

  goToServerSettings() {
    this.router.navigate(['settings/server']);
  }

  selectChapter(chapterName: string) {
    this.router.navigate(['/chapter', chapterName.replace(/\s/g, '-')]);
  }

  selectEditChapter(chapterName: string) {
    this.router.navigate(['/chapter', chapterName.replace(/\s/g, '-'), 'edit']);
  }
  goToWhatsNew() {
    this.router.navigate(['/whats-new']);
  }
  getLatestVersion(): string {
    return this.versionService.getLatestVersion().version;
  }

  getChapters() {
    return this.chapterManager.chapters;
  }

}
