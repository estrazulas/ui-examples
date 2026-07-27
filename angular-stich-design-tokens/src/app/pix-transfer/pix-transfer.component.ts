import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { ErrorModalComponent } from '../error-modal/error-modal.component';
import { PixReceiptComponent } from '../pix-receipt/pix-receipt.component';

const LIMIT_VALUE = 5000;

@Component({
  selector: 'app-pix-transfer',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './pix-transfer.component.html',
  styleUrl: './pix-transfer.component.css',
  imports: [ErrorModalComponent, PixReceiptComponent],
})
export class PixTransferComponent {
  protected readonly pixKey = signal('');
  protected readonly amount = signal('');
  protected readonly scheduleDate = signal('');
  protected readonly showReceipt = signal(false);
  protected readonly showLimitModal = signal(false);
  protected readonly transactionId = signal('');
  protected readonly transactionTime = signal('');

  protected readonly canConfirm = computed(() => {
    return (
      this.pixKey().trim().length > 0 &&
      this.amount().trim().length > 0 &&
      this.scheduleDate().trim().length > 0
    );
  });

  protected readonly parsedAmount = computed(() => {
    const raw = this.amount().replace(',', '.');
    const parsed = parseFloat(raw);
    return Number.isFinite(parsed) ? parsed : 0;
  });

  private readonly exceedsLimit = computed(() => {
    return this.parsedAmount() > LIMIT_VALUE;
  });

  protected updatePixKey(value: string): void {
    this.pixKey.set(value);
  }

  protected updateAmount(value: string): void {
    this.amount.set(value);
  }

  protected updateScheduleDate(value: string): void {
    this.scheduleDate.set(value);
  }

  protected confirm(event: SubmitEvent): void {
    event.preventDefault();

    if (!this.canConfirm()) {
      return;
    }

    if (this.exceedsLimit()) {
      this.showLimitModal.set(true);
      return;
    }

    const now = new Date();
    this.transactionTime.set(
      now.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
    );
    this.transactionId.set(crypto.randomUUID());
    this.showReceipt.set(true);
  }

  protected closeLimitModal(): void {
    this.showLimitModal.set(false);
  }

  protected dismissReceipt(): void {
    this.showReceipt.set(false);
  }
}
