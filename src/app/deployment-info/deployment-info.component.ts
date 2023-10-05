import { Component } from '@angular/core';
import { DeploymentKeyService } from '../services/deployment-key.service';

@Component({
  selector: 'app-deployment-info',
  templateUrl: './deployment-info.component.html',
  styleUrls: ['./deployment-info.component.scss'],
})
export class DeploymentInfoComponent {
  constructor(private deploymentKeyService: DeploymentKeyService) {}

  goBack() {
    window.history.back();
  }

  getKey() {
    return this.deploymentKeyService.key;
  }
  getUser() {
    return this.deploymentKeyService.user;
  }
  getDate() {
    return this.deploymentKeyService.date;
  }
}
