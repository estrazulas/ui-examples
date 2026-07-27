import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';

@Component({
  selector: 'app-error-modal',
  templateUrl: './error-modal.component.html',
  styleUrls: ['./error-modal.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    role: 'dialog',
    'aria-modal': 'true',
    '[attr.aria-labelledby]': '"error-modal-title"',
    '[attr.aria-describedby]': '"error-modal-message"',
    '(document:keydown)': 'handleKeydown($event)',
  },
})
export class ErrorModalComponent {
  readonly title = input.required<string>();
  readonly message = input.required<string>();
  readonly closed = output<void>();

  closeModal(): void {
    this.closed.emit();
  }

  handleKeydown(event: KeyboardEvent): void {
    if (event.key === 'Escape') {
      this.closeModal();
    }
  }
}
