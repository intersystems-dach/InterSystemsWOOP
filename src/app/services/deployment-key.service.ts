import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DeploymentKeyService {
  key: string = '';
  date: string = '';
  user: string = '';

  constructor() {
    this.init();
  }

  async init() {
    let data = await fetch('assets/deployment.key').then((res) => res.text());
    let lines = data.split('\n');
    this.key = lines[0];
    this.date = lines[1];
    this.user = lines[2];
  }
}
