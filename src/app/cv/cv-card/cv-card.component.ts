import { Component, Input, OnChanges, inject, signal } from '@angular/core';
import { Cv } from '../model/cv';
import { EmbaucheService } from '../services/embauche.service';
import { ToastrService } from 'ngx-toastr';

import { RouterLink } from '@angular/router';
import { DefaultImagePipe } from '../pipes/default-image.pipe';

@Component({
    selector: 'app-cv-card',
    templateUrl: './cv-card.component.html',
    styleUrls: ['./cv-card.component.css'],
    standalone: true,
    imports: [
    RouterLink,
    DefaultImagePipe
],
})
export class CvCardComponent implements OnChanges {
  private embaucheService = inject(EmbaucheService);
  private toastr = inject(ToastrService);

  /** Inserted by Angular inject() migration for backwards compatibility */
  constructor(...args: unknown[]);

  constructor() {}
  @Input() cv: Cv | null = null;
  SignalCv=signal<Cv>(new Cv());
  ngOnChanges() {
    if(this.cv)
    this.SignalCv.set(this.cv);
  }
  embaucher() {
      if (this.embaucheService.embauche(this.SignalCv())) {
        this.toastr.success(
          `${this.SignalCv()?.firstname} ${this.SignalCv?.name} a été pré embauché`
        );
      } else {
        this.toastr.warning(
          `${this.SignalCv()?.firstname} ${this.SignalCv?.name} est déjà pré embauché`
        );
      }
    }
  
}
