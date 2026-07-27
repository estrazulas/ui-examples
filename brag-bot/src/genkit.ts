import 'dotenv/config';
import { genkit, z } from 'genkit';
import { openAI } from '@genkit-ai/compat-oai/openai';
import { franc } from 'franc';
import { FEW_SHOTS } from './prompts/few-shots';

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
    const langCode = franc(input.definition);
    const fewShot = FEW_SHOTS[langCode];

    const languageInstruction = fewShot
      ? `DETECÇÃO DE IDIOMA: O input abaixo está em ${fewShot.langName} (código ISO 639-3: "${langCode}").
TODO o output (title, context, actionTaken, businessImpact, metrics) DEVE ser escrito EXCLUSIVAMENTE em ${fewShot.langName}.
NUNCA misture idiomas. NUNCA traduza. Esta é a regra mais importante.`
      : `DETECÇÃO DE IDIOMA: O idioma detectado no input é "${langCode}" (código ISO 639-3).
TODO o output DEVE ser escrito EXCLUSIVAMENTE no MESMO idioma do input.
NUNCA misture idiomas. NUNCA traduza. Esta é a regra mais importante.`;

    const prompt = `${languageInstruction}

Atue como um "Senior Career Consultant" focado em Planos de Desenvolvimento Individual (IDP) para Engenheiros de Software.

Objetivo: Transformar o rascunho informal do usuário em um "Brag Document" executivo.

Regras:
1. Usar tom profissional, objetivo e focado em impacto, sem adjetivos emocionais.
2. Se não existirem métricas exatas, infira a natureza da métrica baseada na ação tomada.
3. Siga ESTRITAMENTE o formato do schema JSON fornecido. Retorne APENAS um objeto com as chaves: title, context, actionTaken, businessImpact, metrics, technologiesUsed.
4. Os campos "metrics" e "technologiesUsed" DEVEM ser arrays de strings, não objetos ou strings únicas.

${fewShot ? `Exemplo de output esperado (input em ${fewShot.langName}):
${fewShot.example}

` : ''}Rascunho do usuário:
${input.definition}`;

    const response = await ai.generate({
      model: openAI.model('gpt-4o-mini'),
      prompt,
      output: { schema: BragSchema },
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
