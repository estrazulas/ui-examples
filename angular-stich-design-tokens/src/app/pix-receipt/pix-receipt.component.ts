import { ChangeDetectionStrategy, Component, computed, input, output, signal } from '@angular/core';

@Component({
  selector: 'app-pix-receipt',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './pix-receipt.component.html',
  styleUrl: './pix-receipt.component.css',
})
export class PixReceiptComponent {
  readonly amount = input.required<number>();
  readonly recipientName = input.required<string>();
  readonly bankName = input.required<string>();
  readonly transactionDate = input.required<string>();
  readonly transactionTime = input.required<string>();
  readonly transactionId = input.required<string>();

  readonly dismiss = output<void>();
  readonly share = output<void>();
  readonly downloadPdf = output<void>();

  protected readonly formattedAmount = computed(() => {
    return this.amount().toFixed(2).replace('.', ',');
  });

  protected readonly cardTransform = signal(
    'perspective(1000px) rotateX(0deg) rotateY(0deg)',
  );
  protected readonly cardTransition = signal('none');

  protected onCardMouseMove(event: MouseEvent): void {
    const card = event.currentTarget as HTMLElement;
    const rect = card.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = (y - centerY) / 40;
    const rotateY = (centerX - x) / 40;
    this.cardTransform.set(
      `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
    );
  }

  protected onCardMouseLeave(): void {
    this.cardTransform.set('perspective(1000px) rotateX(0deg) rotateY(0deg)');
    this.cardTransition.set('transform 0.6s cubic-bezier(0.23, 1, 0.32, 1)');
  }

  protected onCardMouseEnter(): void {
    this.cardTransition.set('none');
  }
}
