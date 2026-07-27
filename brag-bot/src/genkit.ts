import 'dotenv/config';
import { genkit, z } from 'genkit';
import { openAI } from '@genkit-ai/compat-oai/openai';

const ai = genkit({ plugins: [openAI()] });

const BragInputSchema = z.object({
  definition: z.string().describe('Rascunho informal do usuário sobre sua realização no trabalho.'),
});

const BragSchema = z.object({
  title: z.string().describe('Ação principal + Resultado de alto nível.'),
  context: z.string().describe('Situação/Problema original. O que estava quebrado, lento, etc.'),
  actionTaken: z.string().describe('Ação técnica ou estratégica passo a passo tomada para resolver o problema.'),
  businessImpact: z.string().describe('Qual o impacto de negócio. Tempo ganho, redução de falhas, etc.'),
  metrics: z.array(z.string()).describe('Apenas dados estritamente quantificáveis. Ex: "50% reduction".'),
  technologiesUsed: z.array(z.string()).describe('Ferramentas, linguagens e plataformas mencionadas ou inferidas.'),
});

export const bragGeneratorFlow = ai.defineFlow(
  {
    name: 'bragGeneratorFlow',
    inputSchema: BragInputSchema,
    outputSchema: BragSchema,
  },
  async (input) => {
    const prompt = `Atue como um "Senior Career Consultant" focado em Planos de Desenvolvimento Individual (IDP) para Engenheiros de Software.

Objetivo: Transformar o rascunho informal do usuário em um "Brag Document" executivo.

Regras:
1. Usar tom profissional, objetivo e focado em impacto, sem adjetivos emocionais.
2. Se não existirem métricas exatas, infira a natureza da métrica baseada na ação tomada.
3. Siga ESTRITAMENTE o formato do schema JSON fornecido. Retorne APENAS um objeto com as chaves: title, context, actionTaken, businessImpact, metrics, technologiesUsed.
4. Respeite a linguagem original do input (se mandou em português, responda em português).
5. Os campos "metrics" e "technologiesUsed" DEVEM ser arrays de strings, não objetos ou strings únicas. Exemplo: "metrics": ["Redução de 90% no tempo de resposta", "Eliminação de 90% dos erros"], "technologiesUsed": ["Redis", "JWT"].

Rascunho do usuário:
${input.definition}`;

    const response = await ai.generate({
      model: openAI.model('gpt-4o-mini'),
      prompt,
      output: BragSchema,
      config: { temperature: 0.8 },
    });

    if (!response.output) {
      throw new Error('Falha ao gerar o Brag Document. Tente novamente.');
    }

    return {
      ...response.output,
      id: crypto.randomUUID(),
    };
  }
);

export { ai };
