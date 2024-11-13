import { Directive, ElementRef, HostBinding, HostListener } from '@angular/core';

@Directive({
  selector: '[appRainbowText]',
  standalone: true
})
export class RainbowTextDirective {
  @HostBinding('style.color') textColor: string | undefined;
  @HostBinding('style.borderColor') borderColor: string | undefined;

  private colors: string[] = ['red', 'orange', 'yellow', 'green', 'blue', 'indigo', 'violet'];

  @HostListener('keyup') onKeyUp() {
    this.changeColor();
  }

  private changeColor() {
    const randoColor = this.colors[Math.floor(Math.random() * this.colors.length)];
    this.textColor = randoColor;
    this.borderColor = randoColor;
  }

  constructor(private el: ElementRef) {
    if (this.el.nativeElement.tagName !== 'INPUT') {
      console.warn('La directive appRainbow ne peut être appliquée qu\'aux éléments INPUT');
    }
  }
  
}
