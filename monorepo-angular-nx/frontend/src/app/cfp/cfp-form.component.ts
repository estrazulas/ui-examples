import { Component, computed, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CfpService } from './cfp.service';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

@Component({
  selector: 'app-cfp-form',
  imports: [CommonModule],
  templateUrl: './cfp-form.component.html',
  styleUrl: './cfp-form.component.css',
})
export class CfpFormComponent {
  protected nome = signal('');
  protected email = signal('');
  protected talkTitle = signal('');
  protected isGDE = signal(false);
  protected isSubmitting = signal(false);
  protected submitted = signal(false);
  protected errorMessage = signal('');

  protected nomeError = signal(false);
  protected emailError = signal(false);
  protected talkTitleError = signal(false);

  protected isFormValid = computed(() => {
    return (
      this.nome().trim().length > 0 &&
      this.talkTitle().trim().length > 0 &&
      EMAIL_REGEX.test(this.email())
    );
  });

  protected isSubmitDisabled = computed(() => {
    return !this.isFormValid() || this.isSubmitting();
  });

  private readonly cfpService = inject(CfpService);

  protected onNomeBlur(): void {
    this.nomeError.set(this.nome().trim().length === 0);
  }

  protected onEmailBlur(): void {
    this.emailError.set(!EMAIL_REGEX.test(this.email()));
  }

  protected onTalkTitleBlur(): void {
    this.talkTitleError.set(this.talkTitle().trim().length === 0);
  }

  protected submit(): void {
    if (this.isSubmitDisabled()) {
      return;
    }

    this.isSubmitting.set(true);
    this.errorMessage.set('');

    this.cfpService
      .submit({
        nome: this.nome().trim(),
        email: this.email().trim(),
        talkTitle: this.talkTitle().trim(),
        isGDE: this.isGDE(),
      })
      .subscribe({
        next: (res) => {
          this.submitted.set(true);
          this.isSubmitting.set(false);
        },
        error: (err) => {
          this.errorMessage.set('Erro ao enviar. Tente novamente.');
          this.isSubmitting.set(false);
        },
      });
  }
}
