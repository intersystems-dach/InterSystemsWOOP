import { Component } from '@angular/core';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { ServerManager } from 'src/utils/classes';

@Component({
  selector: 'app-server-settings',
  templateUrl: './server-settings.component.html',
  styleUrls: ['./server-settings.component.scss', '../stylesheet.scss'],
})
export class ServerSettingsComponent {
  host: string = 'localhost';
  port: string = '52773';

  constructor() {
    ServerManager.load();
    this.host = ServerManager.HOST;
    this.port = ServerManager.PORT;
  }

  save() {
    ServerManager.HOST = this.host;
    ServerManager.PORT = this.port;
    ServerManager.save();
  }
}
