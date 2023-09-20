import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import * as Prism from 'prismjs';
import { ColorSchemeService } from '../services/color-scheme.service';

@Component({
  selector: 'app-code-window',
  templateUrl: './code-window.component.html',
  styleUrls: ['./code-window.component.sass'],
})
export class CodeWindowComponent {
  @Input() code: string = '';

  @Input() language: string = 'javascript';
  @Input() title: string = 'mycode';

  @ViewChild('codeEle') codeEle!: ElementRef;

  copied: boolean = false;

  constructor(private colorSchemeService: ColorSchemeService) {}

  ngAfterViewInit() {
    Prism.highlightElement(this.codeEle.nativeElement);
  }

  ngOnChanges(changes: any): void {
    if (changes?.code) {
      if (this.codeEle?.nativeElement) {
        this.codeEle.nativeElement.textContent = this.code;
        Prism.highlightElement(this.codeEle.nativeElement);
      }
    }
  }

  getDarkModeEnabled() {
    return this.colorSchemeService.darkModeEnabled;
  }

  copyCode() {
    const el = document.createElement('textarea');
    el.value = this.code;
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
    this.copied = true;
    setTimeout(() => {
      this.copied = false;
    }, 1000);
  }
}