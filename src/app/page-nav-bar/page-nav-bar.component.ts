import {
  Component,
  Input,
  Output,
  EventEmitter,
  HostListener,
} from '@angular/core';
import { ColorSchemeService } from '../services/color-scheme.service';

@Component({
  selector: 'app-page-nav-bar',
  templateUrl: './page-nav-bar.component.html',
  styleUrls: ['./page-nav-bar.component.scss'],
})
export class PageNavBarComponent {
  @Input() showNextButton: boolean = true;
  @Input() showPrevButton: boolean = true;
  @Input() showhintButton: boolean = true;
  @Input() showResultButton: boolean = true;

  hintIsShown: boolean = false;

  @Output() showNextEmitter = new EventEmitter<string>();
  @Output() showPrevEmitter = new EventEmitter<string>();
  @Output() showhintEmitter = new EventEmitter<string>();
  @Output() showResultEmitter = new EventEmitter<string>();

  constructor(private colorSchemeService: ColorSchemeService) {}

  @HostListener('document:keydown.control.arrowright', ['$event'])
  showNext() {
    this.showNextEmitter.emit('showNext');
    this.hintIsShown = false;
  }

  @HostListener('document:keydown.control.arrowleft', ['$event'])
  showPrev() {
    this.showPrevEmitter.emit('showPrev');
    this.hintIsShown = false;
  }
  showhint() {
    this.hintIsShown = true;
    this.showhintEmitter.emit('showhint');
  }
  showResult() {
    this.showResultEmitter.emit('showResult');
  }
  getDarkModeEnabled() {
    return this.colorSchemeService.darkModeEnabled;
  }
}
