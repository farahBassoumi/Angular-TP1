import { Component, inject } from '@angular/core';
import { NavbarComponent } from './components/navbar/navbar.component';
import { RouterOutlet } from '@angular/router';
import { AuthService } from './auth/services/auth.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    standalone: true,
    imports: [NavbarComponent, RouterOutlet]
})
export class AppComponent {
  private authService = inject(AuthService);

  ngOnInit(): void {
    this.authService.loadUserState();
  }
  title = 'Starting Advanced Topics';
}
