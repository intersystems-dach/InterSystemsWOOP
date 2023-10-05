import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageService } from '../../services/local-storage.service';

@Component({
  selector: 'app-settings-header',
  templateUrl: './settings-header.component.html',
  styleUrls: ['./settings-header.component.scss'],
})
export class SettingsHeaderComponent {
  @Input() selected: string = 'storage';
  @Output() selectedChange = new EventEmitter<string>();
  constructor(
    private router: Router,
    private localStorageService: LocalStorageService
  ) {}

  setSelected(selected: string) {
    this.selected = selected;
    this.router.navigate(['/settings', selected]);
    this.selectedChange.emit(selected);
  }

  isWoopsActive(): boolean {
    return this.localStorageService.isWoopsActivated();
  }
}
