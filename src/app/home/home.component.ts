import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ChaptermanagerService } from '../services/chaptermanager.service';
import { MetaDataService } from '../services/meta-data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  title = 'InterSystemsWOOP';

  isServerOnline = false;

  constructor(
    private router: Router,
    private chapterManager: ChaptermanagerService,
    private metaDataService: MetaDataService
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
    this.router.navigate(['/info']);
  }
  getLatestVersion(): string {
    return this.metaDataService.getVersion();
  }

  getChapters() {
    return this.chapterManager.chapters;
  }
}
