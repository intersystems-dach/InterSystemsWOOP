import { Component, EventEmitter, HostListener, Output } from '@angular/core';

@Component({
  selector: 'app-are-you-sure',
  templateUrl: './are-you-sure.component.html',
  styleUrls: ['./are-you-sure.component.scss'],
})
export class AreYouSureComponent {
  @Output() sureEmitter = new EventEmitter<boolean>();

  @HostListener('document:keydown.escape', ['$event'])
  close() {
    this.sureEmitter.emit(false);
  }
  yes() {
    this.sureEmitter.emit(true);
  }
}
