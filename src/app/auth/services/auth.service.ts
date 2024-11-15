import { Injectable, computed, inject, signal } from '@angular/core';
import { CredentialsDto } from '../dto/credentials.dto';
import { LoginResponseDto } from '../dto/login-response.dto';
import { HttpClient } from '@angular/common/http';
import { API } from '../../../config/api.config';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http = inject(HttpClient);

  private isAuthenticatedSignal = signal(false);
  private userEmailSignal = signal<string | null>(null);
  private userIdSignal = signal<string | null>(null);

  isAuthenticated = computed(() => this.isAuthenticatedSignal());
  userEmail = computed(() => this.userEmailSignal());
  userId = computed(() => this.userIdSignal());

  login(credentials: CredentialsDto): boolean {
    this.callAPI(credentials).subscribe({
      next: (response) => {
        this.isAuthenticatedSignal.set(true);
        this.userEmailSignal.set(credentials.email);
        this.userIdSignal.set(response.id); 
        return true;
      },
      error: (err) => {
        console.error('Invalid credentials or API error:', err);
        this.isAuthenticatedSignal.set(false);
        this.userEmailSignal.set(null);
        this.userIdSignal.set(null);
      }
    });
    return false;

  }

  callAPI(credentials: CredentialsDto): Observable<LoginResponseDto> {
    return this.http.post<LoginResponseDto>(API.login, credentials);
  }

  loadUserState(): void {
    if (this.isAuthenticatedSignal()) {
      console.log('L’utilisateur est déjà authentifié.');
      return;
    }
    this.logout();
    console.log('Aucun état utilisateur chargé.');
  }

  logout(): void {
    this.isAuthenticatedSignal.set(false);
    this.userEmailSignal.set(null);
    this.userIdSignal.set(null);
  }
}
