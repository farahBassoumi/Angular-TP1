import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { CredentialsDto } from '../dto/credentials.dto';
import { ROUTES, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { APP_ROUTES } from '../../../config/routes.config';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone: true,
  imports: [FormsModule],
})
export class LoginComponent implements OnInit {
  private authService = inject(AuthService);
  private router = inject(Router);
  private toastr = inject(ToastrService);


  constructor() { }

  ngOnInit(): void {
    this.authService.loadUserState();
  }


  login(credentials: CredentialsDto) {
    if (this.authService.login(credentials))
      this.router.navigate([APP_ROUTES.cv]);
    else
      this.toastr.error('Veuillez vérifier vos credentials');
  }

  logout(): void {
    this.authService.logout();
  }
}
