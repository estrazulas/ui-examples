import 'dotenv/config';
import { genkit, z } from 'genkit';
import { openAI } from '@genkit-ai/compat-oai/openai';

const ai = genkit({ plugins: [openAI()] });

function detectLanguage(text: string): 'pt' | 'en' {
  const ptMarkers = /\b(para|uma|que|com|foi|pelo|pela|dos|das|não|mais|como|ser|ter|este|esta|isso|também|implementei|reduzi|criei|desenvolvi)\b/i;
  const enMarkers = /\b(the|and|for|that|with|from|have|been|was|were|this|also|into|their|would|could|implemented|reduced|created|developed|built)\b/i;

  const ptScore = (text.match(ptMarkers) || []).length;
  const enScore = (text.match(enMarkers) || []).length;

  return enScore > ptScore ? 'en' : 'pt';
}

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
    const lang = detectLanguage(input.definition);
    const langLabel = lang === 'en' ? 'inglês' : 'português';

    const prompt = `DETECÇÃO DE IDIOMA: O input abaixo está em ${langLabel}.
TODO o output (title, context, actionTaken, businessImpact, metrics) DEVE ser escrito EXCLUSIVAMENTE no MESMO idioma do input.
Se o input está em inglês, responda 100% em inglês. Se está em português, responda 100% em português.
NUNCA misture idiomas. Esta é a regra mais importante.

Atue como um "Senior Career Consultant" focado em Planos de Desenvolvimento Individual (IDP) para Engenheiros de Software.

Objetivo: Transformar o rascunho informal do usuário em um "Brag Document" executivo.

Regras:
1. Usar tom profissional, objetivo e focado em impacto, sem adjetivos emocionais.
2. Se não existirem métricas exatas, infira a natureza da métrica baseada na ação tomada.
3. Siga ESTRITAMENTE o formato do schema JSON fornecido. Retorne APENAS um objeto com as chaves: title, context, actionTaken, businessImpact, metrics, technologiesUsed.
4. Os campos "metrics" e "technologiesUsed" DEVEM ser arrays de strings, não objetos ou strings únicas.

${lang === 'en' ? `Exemplo de output esperado (input em inglês):
{
  "title": "Implemented Redis caching layer reducing API latency by 80%",
  "context": "The API suffered from high latency and timeouts during traffic spikes.",
  "actionTaken": "Designed and deployed a Redis-based caching strategy for frequently accessed endpoints.",
  "businessImpact": "80% latency reduction eliminated timeouts during peak hours and improved user experience.",
  "metrics": ["80% reduction in API latency", "Zero timeouts during peak traffic"],
  "technologiesUsed": ["Redis", "Node.js", "Express"]
}` : `Exemplo de output esperado (input em português):
{
  "title": "Implementação de cache Redis reduzindo latência da API em 80%",
  "context": "A API apresentava alta latência e timeouts durante picos de acesso.",
  "actionTaken": "Projetou e implementou estratégia de cache com Redis para endpoints mais acessados.",
  "businessImpact": "Redução de 80% na latência eliminou timeouts em horários de pico e melhorou a experiência do usuário.",
  "metrics": ["80% de redução na latência da API", "Zero timeouts durante tráfego de pico"],
  "technologiesUsed": ["Redis", "Node.js", "Express"]
}`}

Rascunho do usuário:
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
