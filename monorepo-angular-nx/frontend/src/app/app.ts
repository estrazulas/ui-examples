import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthService } from './services/auth.service';

@Component({
  imports: [RouterModule],
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected title = 'frontend';
  private readonly authService = inject(AuthService);

  protected get isAuthenticated(): boolean {
    return this.authService.isAuthenticated;
  }

  protected logout(): void {
    this.authService.logout();
  }
}
