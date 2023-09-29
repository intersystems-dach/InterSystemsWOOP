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
    if(this.data == undefined) return "";
    return this.data.version;
  }

  getRealeseData(): string {
    if (this.data == undefined) return '';

    return this.data.date;
  }

  getNotes(): string[] {
    if (this.data == undefined) return [];

    return this.data.notes.split(';');
  }

  getInstanceName(): string {
    if (this.data == undefined) return '';

    return this.data.instanceName;
  }
}
