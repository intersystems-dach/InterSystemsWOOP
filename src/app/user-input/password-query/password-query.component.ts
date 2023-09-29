import { ChaptermanagerService } from '../../services/chaptermanager.service';
import {
  Component,
  Input,
  Output,
  EventEmitter,
  HostListener,
} from '@angular/core';

@Component({
  selector: 'app-password-query',
  templateUrl: './password-query.component.html',
  styleUrls: ['./password-query.component.sass'],
})
export class PasswordQueryComponent {
  enteredPassword: string = '';
  isWrong: boolean = false;
  wrongText = '';
  type: string = 'password';
  @Input() chapterName: string = '';

  @Output() passwordEntered = new EventEmitter<string>();

  constructor(private chaptermanagerService: ChaptermanagerService) {}

  submit() {
    if (
      this.enteredPassword ===
      this.chaptermanagerService.getChapterByName(this.chapterName, false)
        .Password
    ) {
      this.passwordEntered.emit(this.enteredPassword);
      this.isWrong = false;
      this.enteredPassword = '';
    } else {
      this.isWrong = true;
      this.enteredPassword = '';
      this.wrongText = 'Wrong password';
    }
  }

  viewPassword() {
    if (this.type === 'password') {
      this.type = 'text';
    } else {
      this.type = 'password';
    }
  }
  @HostListener('document:keydown.escape', ['$event'])
  close() {
    this.passwordEntered.emit(undefined);
    this.isWrong = false;
    this.enteredPassword = '';
  }
}
