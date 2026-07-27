import { Injectable, signal, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly http = inject(HttpClient);
  protected readonly tokenSignal = signal<string | null>(
    localStorage.getItem('auth_token')
  );

  get isAuthenticated(): boolean {
    return !!this.tokenSignal();
  }

  login(email: string, senha: string): Observable<{ token: string }> {
    return this.http
      .post<{ token: string }>('/api/auth/login', { email, senha })
      .pipe(
        tap((res) => {
          localStorage.setItem('auth_token', res.token);
          this.tokenSignal.set(res.token);
        })
      );
  }

  logout(): void {
    localStorage.removeItem('auth_token');
    this.tokenSignal.set(null);
  }
}
