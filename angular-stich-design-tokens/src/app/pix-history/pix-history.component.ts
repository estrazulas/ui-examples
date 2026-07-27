import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface Transaction {
  id: string;
  title: string;
  amount: number;
  type: 'received' | 'sent';
  date: string;
}

@Component({
  selector: 'app-pix-history',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pix-history.component.html',
  styleUrl: './pix-history.component.css'
})
export class PixHistoryComponent {
  transactions = signal<Transaction[]>([
    { id: '1', title: 'João Silva', amount: 150.00, type: 'received', date: 'Hoje, 10:30' },
    { id: '2', title: 'Maria Oliveira', amount: 45.50, type: 'sent', date: 'Ontem, 15:45' },
    { id: '3', title: 'Mercadinho da Esquina', amount: 12.00, type: 'sent', date: '18/07, 09:20' }
  ]);
}
