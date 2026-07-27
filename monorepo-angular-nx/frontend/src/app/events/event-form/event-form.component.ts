import { Component, computed, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { toSignal } from '@angular/core/rxjs-interop';
import { EventService } from '../../services/event.service';

@Component({
  selector: 'app-event-form',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './event-form.component.html',
  styleUrl: './event-form.component.css',
})
export class EventFormComponent {
  protected isSubmitting = signal(false);
  protected submitted = signal(false);
  protected errorMessage = signal('');

  private readonly eventService = inject(EventService);

  protected eventForm = new FormGroup({
    nome: new FormControl('', { validators: Validators.required, nonNullable: true }),
    endereco: new FormControl('', { validators: Validators.required, nonNullable: true }),
    capacidade: new FormControl(0, { validators: Validators.required, nonNullable: true }),
    data: new FormControl('', { validators: Validators.required, nonNullable: true }),
  });

  protected formStatus = toSignal(this.eventForm.statusChanges, { initialValue: this.eventForm.status });

  protected isFormValid = computed(() => {
    this.formStatus();
    return this.eventForm.valid;
  });

  protected isSubmitDisabled = computed(
    () => !this.isFormValid() || this.isSubmitting()
  );

  protected submit(): void {
    if (this.isSubmitDisabled()) {
      this.eventForm.markAllAsTouched();
      return;
    }

    this.isSubmitting.set(true);
    this.errorMessage.set('');

    const formValue = this.eventForm.getRawValue();
    this.eventService
      .createEvent({
        nome: formValue.nome.trim(),
        endereco: formValue.endereco.trim(),
        capacidade: formValue.capacidade,
        data: formValue.data,
      })
      .subscribe({
        next: () => {
          this.submitted.set(true);
          this.isSubmitting.set(false);
          this.eventForm.reset({ nome: '', endereco: '', capacidade: 0, data: '' });
        },
        error: () => {
          this.errorMessage.set('Erro ao criar evento. Tente novamente.');
          this.isSubmitting.set(false);
        },
      });
  }
}
