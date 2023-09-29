import { Injectable } from '@angular/core';
import { Chapter, Page, VerifyCache } from 'src/utils/classes';

@Injectable({
  providedIn: 'root',
})
export class ChaptermanagerService {
  public chapters: Chapter[] = [];
  public allChapters: Chapter[] = [];
  private initDone = false;

  private errorChapter = new Chapter('Error 404', '', []);

  currentChapter: Chapter = this.errorChapter;

  constructor() {
    this.init();
  }

  async init() {
    if (this.initDone) return;

    let json = await (await fetch('assets/chapters.json')).json();
    this.allChapters = this.getAllChapters(json);

    for (let chapter of this.allChapters) {
      if (chapter.Password === undefined) {
        chapter.Password = '';
      }
      if (chapter.Language === undefined) {
        chapter.Language = '';
      }
      if (chapter.Author === undefined) {
        chapter.Author = '';
      }
      if (chapter.IsPrivate === undefined) {
        chapter.IsPrivate = false;
      }
      if (chapter.Description === undefined) {
        chapter.Description = '';
      }
      if (chapter.Pages === undefined) {
        chapter.Pages = [];
      }

      for (let page of chapter.Pages) {
        if (page.Content === undefined) {
          page.Content = '';
        }
        if (page.Hint === undefined) {
          page.Hint = '';
        }
        if (page.Result === undefined) {
          page.Result = '';
        }
      }

      if (chapter.Password === '') {
        VerifyCache.verifyChapter(chapter.Title, "");
      }
    }
    this.allChapters = this.sortChaptersAlphabetically(this.allChapters);
    this.chapters = this.allChapters;
    this.initDone = true;
  }

  getAllChapters(json: any): Chapter[] {
    let chapter = undefined;
    let chapters = [];

    for (let chapterJson of json) {
      chapter = new Chapter(
        chapterJson.Title,
        chapterJson.Author,
        [],
        chapterJson.Password,
        chapterJson.Language,
        chapterJson.Description,
        chapterJson.IsPrivate
      );
      let pages = [];
      for (let pageJson of chapterJson.Pages) {
        let page = new Page(pageJson.Content, pageJson.Hint, pageJson.Result);
        pages.push(page);
      }
      chapter.Pages = pages;
      chapters.push(chapter);
    }
    return chapters;
  }

  sortChaptersAlphabetically(array: Chapter[]): Chapter[] {
    return array.sort((a, b) => {
      return a.Title.localeCompare(b.Title);
    });
  }

  getChapterByName(chapterName: string, replaceWhitespaces: boolean): Chapter {
    chapterName = chapterName.toLowerCase();
    for (let chapter of this.chapters) {
      if (replaceWhitespaces) {
        if (chapter.Title.replace(/\s/g, '-').toLowerCase() == chapterName) {
          return chapter;
        }
      } else {
        if (chapter.Title.toLowerCase() == chapterName) {
          return chapter;
        }
      }
    }
    return this.errorChapter;
  }
}
