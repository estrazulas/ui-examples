import {
  AngularNodeAppEngine,
  createNodeRequestHandler,
  isMainModule,
  writeResponseToNodeResponse,
} from '@angular/ssr/node';
import express from 'express';
import { join } from 'node:path';
import './genkit';
import { bragGeneratorFlow } from './genkit';

const browserDistFolder = join(import.meta.dirname, '../browser');

const app = express();
app.use(express.json());
const angularApp = new AngularNodeAppEngine();

/**
 * Micro-BFF: proxy seguro para o bragGeneratorFlow do Genkit.
 */
app.post('/api/brag', async (req, res) => {
  try {
    const { definition } = req.body;
    const result = await bragGeneratorFlow({ definition }) as Awaited<ReturnType<typeof bragGeneratorFlow>> & { id: string };

    const mapped = {
      id: result.id,
      titulo: result.title,
      contexto: result.context,
      impacto: `${result.actionTaken}\n\n${result.businessImpact}`,
      metricas: result.metrics.join('. '),
      tecnologias: result.technologiesUsed,
    };

    res.json(mapped);
  } catch (err) {
    console.error('Erro ao gerar brag:', err);
    res.status(500).json({ error: 'Falha ao gerar Brag Document.' });
  }
});

/**
 * Serve static files from /browser
 */
app.use(
  express.static(browserDistFolder, {
    maxAge: '1y',
    index: false,
    redirect: false,
  }),
);

/**
 * Handle all other requests by rendering the Angular application.
 */
app.use((req, res, next) => {
  angularApp
    .handle(req)
    .then((response) => (response ? writeResponseToNodeResponse(response, res) : next()))
    .catch(next);
});

/**
 * Start the server if this module is the main entry point, or it is ran via PM2.
 * The server listens on the port defined by the `PORT` environment variable, or defaults to 4000.
 */
if (isMainModule(import.meta.url) || process.env['pm_id']) {
  const port = process.env['PORT'] || 4000;
  app.listen(port, (error) => {
    if (error) {
      throw error;
    }

    console.log(`Node Express server listening on http://localhost:${port}`);
  });
}

/**
 * Request handler used by the Angular CLI (for dev-server and during build) or Firebase Cloud Functions.
 */
export const reqHandler = createNodeRequestHandler(app);
