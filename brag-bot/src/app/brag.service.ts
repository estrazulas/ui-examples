import { Injectable, signal } from '@angular/core';

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
  brags = signal<Brag[]>([]);
  loading = signal<boolean>(false);

  generateMockBrag(prompt: string): void {
    this.loading.set(true);

    setTimeout(() => {
      const newBrag: Brag = {
        id: crypto.randomUUID(),
        titulo: prompt.slice(0, 60) || 'Conquista gerada',
        contexto:
          'O projeto enfrentava desafios de escalabilidade e performance. A equipe precisava de uma solução que suportasse alto volume de requisições mantendo baixa latência.',
        impacto:
          'A implementação resultou em melhoria significativa na experiência do usuário final, reduzindo o tempo de resposta e aumentando a capacidade de processamento do sistema.',
        metricas:
          'Redução de 40% no tempo de resposta. Aumento de 3x na capacidade de requisições simultâneas. Diminuição de 60% nos custos de infraestrutura.',
        tecnologias: ['Angular', 'TypeScript', 'Node.js', 'PostgreSQL', 'Docker'],
      };

      this.brags.update((current) => [...current, newBrag]);
      this.loading.set(false);
    }, 1500);
  }

  getBrag(id: string): Brag | undefined {
    return this.brags().find((b) => b.id === id);
  }
}
