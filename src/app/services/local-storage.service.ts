import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ServerManager, VerifyCache } from 'src/utils/classes';
import { ChaptermanagerService } from './chaptermanager.service';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  rememberPage: boolean = true;

  constructor(
    private router: Router,
    private chaptermanagerService: ChaptermanagerService
  ) {
    this.rememberPage = this.getRememberPage();

    this.chaptermanagerService.init().then(() => {
      let verifyCache: any = localStorage.getItem('verifyCache');
      if (verifyCache == null) {
        verifyCache = [];
      } else {
        verifyCache = JSON.parse(verifyCache);
      }
      for (let entry of verifyCache) {
        let chapter = this.chaptermanagerService.getChapterByName(
          entry.name,
          false
        );
        if (chapter != undefined && chapter.Password == entry.pwd) {
          VerifyCache.verifyChapter(entry.name, entry.pwd, false);
        }
      }
    });

    ServerManager.load();
  }

  saveVerifyCache(cache: any[]) {
    localStorage.setItem('verifyCache', JSON.stringify(cache));
  }

  getRememberPage(): boolean {
    let rememberPage = localStorage.getItem('rememberPage');
    if (rememberPage == null) {
      return true;
    }
    return rememberPage == 'true';
  }

  setRememberPage(rememberPage: boolean) {
    localStorage.setItem('rememberPage', rememberPage ? 'true' : 'false');
    this.rememberPage = rememberPage;
  }

  setColorScheme(darkMode: boolean) {
    localStorage.setItem('colorScheme', darkMode ? 'dark' : 'light');
  }

  getColorScheme(): string | null {
    let colorScheme = localStorage.getItem('colorScheme');
    return colorScheme;
  }

  setFontSize(fontSize: number) {
    localStorage.setItem('fontSize', fontSize.toString());
  }

  getFontSize(): number {
    let fontSize = localStorage.getItem('fontSize');
    if (fontSize == null) {
      return 16;
    }
    return parseInt(fontSize);
  }

  setPageForChapter(chapterTitle: string, page: number) {
    localStorage.setItem(chapterTitle, page.toString());
  }

  getPageForChapter(chapterTitle: string): number {
    if (!this.rememberPage) {
      return 0;
    }

    let page = localStorage.getItem(chapterTitle);
    if (page == null) {
      return 0;
    }
    return parseInt(page);
  }

  clearAll() {
    localStorage.clear();
  }

  static isWoopsActivated(): boolean {
    let woopsActivated = localStorage.getItem('woopsActivated');
    return woopsActivated == 'true';
  }

  static setWoopsActivated(woopsActivated: boolean) {
    localStorage.setItem('woopsActivated', woopsActivated ? 'true' : 'false');
  }
}
