import { Component } from '@angular/core';
import { MetaDataService } from '../services/meta-data.service';

@Component({
  selector: 'app-whats-new',
  templateUrl: './whats-new.component.html',
  styleUrls: ['./whats-new.component.sass'],
})
export class WhatsNewComponent {
  constructor(private metaDataService: MetaDataService) {}

  goBack() {
    window.history.back();
  }

  getMetaData() {
    return this.metaDataService;
  }
}
