import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MetaDataService } from 'src/app/services/meta-data.service';

@Component({
  selector: 'app-about-settings',
  templateUrl: './about-settings.component.html',
  styleUrls: ['./about-settings.component.sass', '../stylesheet.sass'],
})
export class AboutSettingsComponent {
  constructor(
    private router: Router,
    private metaDataService: MetaDataService
  ) {}

  getHelp() {
    this.router.navigate(['help']);
  }
  goToDeploymentInfo() {
    this.router.navigate(['deployment']);
  }
  goToImpressum() {
    this.router.navigate(['impressum']);
  }

  whatsNew() {
    this.router.navigate(['info']);
  }

  getVersion() {
    return this.metaDataService.getVersion();
  }

  getInstanceName() {
    return this.metaDataService.getInstanceName();
  }
}
