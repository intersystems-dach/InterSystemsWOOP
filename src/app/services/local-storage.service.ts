import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ServerManager, VerifyCache } from 'src/utils/classes';
import { ChaptermanagerService } from './chaptermanager.service';
import { CookieMessageComponent } from '../cookie-message/cookie-message.component';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  rememberPage: boolean = true;

  static cookiesAccepted: boolean = false;

  constructor(
    private router: Router,
    private chaptermanagerService: ChaptermanagerService
  ) {
    LocalStorageService.cookiesAccepted = this.getCookiesAccepted();
    if (!LocalStorageService.cookiesAccepted) {
      CookieMessageComponent.show();
    }

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
    LocalStorageService.setLS('verifyCache', JSON.stringify(cache));
  }

  getRememberPage(): boolean {
    let rememberPage = localStorage.getItem('rememberPage');
    if (rememberPage == null) {
      return true;
    }
    return rememberPage == 'true';
  }

  getCookiesAccepted(): boolean {
    let rememberPage = localStorage.getItem('WOOPCookiesAccepted');
    if (rememberPage == null) {
      return false;
    }
    return rememberPage == 'true';
  }

  setRememberPage(rememberPage: boolean) {
    LocalStorageService.setLS('rememberPage', rememberPage ? 'true' : 'false');
    this.rememberPage = rememberPage;
  }

  setColorScheme(darkMode: boolean) {
    LocalStorageService.setLS('colorScheme', darkMode ? 'dark' : 'light');
  }

  getColorScheme(): string | null {
    let colorScheme = localStorage.getItem('colorScheme');
    return colorScheme;
  }

  setFontSize(fontSize: number) {
    LocalStorageService.setLS('fontSize', fontSize.toString());
  }

  getFontSize(): number {
    let fontSize = localStorage.getItem('fontSize');
    if (fontSize == null) {
      return 16;
    }
    return parseInt(fontSize);
  }

  setPageForChapter(chapterTitle: string, page: number) {
    LocalStorageService.setLS(chapterTitle, page.toString());
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
    LocalStorageService.setLS(
      'woopsActivated',
      woopsActivated ? 'true' : 'false'
    );
  }

  static setLS(key: string, value: string) {
    if (!this.cookiesAccepted) {
      return;
    }
    localStorage.setItem(key, value);
  }

  static acceptCookies() {
    LocalStorageService.cookiesAccepted = true;
    LocalStorageService.setLS('WOOPCookiesAccepted', 'true');
  }

  static rejectCookies() {
    LocalStorageService.cookiesAccepted = false;
    localStorage.clear();
  }
}
