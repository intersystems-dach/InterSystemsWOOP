import { LocalStorageService } from 'src/app/services/local-storage.service';

export class Chapter {
  public Title: string;
  public Pages: Page[];
  public Password: string;
  public Language: string;
  public Author: string;
  public Description: string;
  public IsPrivate: boolean;
  constructor(
    Title: string,
    Author: string,
    Pages: Page[],
    Password: string = '',
    Language: string = 'en',
    Description: string = '',
    IsPrivate: boolean = false
  ) {
    this.Title = Title;
    this.Pages = Pages;
    this.Password = Password;
    this.Language = Language;
    this.Author = Author;
    this.Description = Description;
    this.IsPrivate = IsPrivate;

    this.setUndefinedValues();
  }

  setUndefinedValues() {
    if (this.Password === undefined) {
      this.Password = '';
    }
    if (this.Language === undefined) {
      this.Language = '';
    }
    if (this.Author === undefined) {
      this.Author = '';
    }
    if (this.Password === undefined) {
      this.Password = '';
    }
    if (this.Description === undefined) {
      this.Description = '';
    }
  }

  getPageForHeading(heading: string, trim = true): number {
    if (trim) {
      heading = heading.toLowerCase().replace(/\s/g, '-');
    }
    for (let i = 0; i < this.Pages.length; i++) {
      let page = this.Pages[i];
      for (let line of page.Content.split('\n')) {
        if (line.startsWith('#')) {
          if (trim) {
            line = line.toLowerCase().replace(/\s/g, '-');
          }
          if (line.includes(heading)) {
            return i;
          }
        }
      }
    }
    return -1;
  }

  static getChapterPageForHeading(
    chapter: Chapter,
    heading: string,
    trim = true
  ): number {
    if (trim) {
      heading = heading.toLowerCase().replace(/\s/g, '-');
    }
    for (let i = 0; i < chapter.Pages.length; i++) {
      let page = chapter.Pages[i];
      for (let line of page.Content.split('\n')) {
        if (line.startsWith('#')) {
          if (trim) {
            line = line.toLowerCase().replace(/\s/g, '-');
          }
          if (line.includes(heading)) {
            return i;
          }
        }
      }
    }
    return -1;
  }
}

export class Page {
  public Content: string;
  public Hint: string;
  public Result: string;
  constructor(Content: string, Hint: string = '', Result: string = '') {
    this.Content = Content;
    this.Hint = Hint;
    this.Result = Result;
  }
}

export class VerifyCache {
  private static verifyCache: any[] = [];

  static isChapterVerified(chapterName: string): boolean {
    for (let chapter of this.verifyCache) {
      if (chapter.name == chapterName) {
        return true;
      }
    }
    return false;
  }

  static verifyChapter(chapterName: string, password: string, save = true) {
    for (let x of this.verifyCache) {
      if (x.name == chapterName) {
        x.pwd = password;
        return;
      }
    }
    this.verifyCache.push({ name: chapterName, pwd: password });
    if (password == '') {
      return;
    }
    if (save) {
      LocalStorageService.setLS(
        'verifyCache',
        JSON.stringify(this.verifyCache)
      );
    }
  }

  static setCache(cache: any[]) {
    this.verifyCache = cache;
  }
}

export class ServerManager {
  static HOST = 'localhost';
  static PORT = '52773';

  static save() {
    LocalStorageService.setLS(
      'serverProps',
      JSON.stringify({ host: this.HOST, port: this.PORT })
    );
  }

  static load() {
    let props = localStorage.getItem('serverProps');
    if (props == undefined) {
      return;
    }
    let obj = JSON.parse(props);
    this.HOST = obj.host;
    this.PORT = obj.port;
  }
}
