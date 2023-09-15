import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class MetaDataService {
  data: any;

  constructor() {
    this.init();
  }

  async init() {
    this.data = await fetch('assets/metadata.json').then((res) => res.json());
  }

  getVersion(): string {
    return this.data.version;
  }
  getRealeseData(): string {
    return this.data.date;
  }
}
