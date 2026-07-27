import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export interface Brag {
  id: string;
  titulo: string;
  contexto: string;
  impacto: string;
  metricas: string;
  tecnologias: string[];
}

@Injectable({ providedIn: 'root' })
export class BragService {
  private http = inject(HttpClient);

  brags = signal<Brag[]>([]);
  loading = signal<boolean>(false);

  generateBrag(definition: string): void {
    this.loading.set(true);

    this.http.post<Brag>('/api/brag', { definition }).subscribe({
      next: (result) => {
        this.brags.update((current) => [...current, result]);
        this.loading.set(false);
      },
      error: (err) => {
        console.error('Erro ao gerar brag:', err);
        this.loading.set(false);
      },
    });
  }

  getBrag(id: string): Brag | undefined {
    return this.brags().find((b) => b.id === id);
  }
}
