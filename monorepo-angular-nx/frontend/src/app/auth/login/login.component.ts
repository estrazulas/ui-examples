import { Component, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import {
  ReactiveFormsModule,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  protected isSubmitting = signal(false);
  protected errorMessage = signal('');

  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  protected loginForm = new FormGroup({
    email: new FormControl('', {
      validators: Validators.required,
      nonNullable: true,
    }),
    senha: new FormControl('', {
      validators: Validators.required,
      nonNullable: true,
    }),
  });

  protected submit(): void {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    this.isSubmitting.set(true);
    this.errorMessage.set('');

    const { email, senha } = this.loginForm.getRawValue();
    this.authService.login(email, senha).subscribe({
      next: () => {
        this.isSubmitting.set(false);
        this.router.navigate(['/event/new']);
      },
      error: () => {
        this.errorMessage.set('Credenciais invalidas');
        this.isSubmitting.set(false);
      },
    });
  }
}
