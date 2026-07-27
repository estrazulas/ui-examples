import 'dotenv/config';
import { genkit, z } from 'genkit';
import { openAI } from '@genkit-ai/compat-oai/openai';

const ai = genkit({ plugins: [openAI()] });

export const helloFlow = ai.defineFlow(
  {
    name: 'helloFlow',
    inputSchema: z.string(),
    outputSchema: z.string(),
  },
  async (input: string) => {
    const { text } = await ai.generate({
      model: openAI.model('gpt-5.5'),
      prompt: input,
    });
    return text;
  }
);

export { ai };
