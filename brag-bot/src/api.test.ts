import { describe, it, expect, vi, beforeEach } from 'vitest';
import express from 'express';
import { createServer } from 'http';

// Mock do Genkit flow
const mockBragGeneratorFlow = vi.fn();

vi.mock('./genkit', () => ({
  bragGeneratorFlow: mockBragGeneratorFlow,
}));

const app = express();
app.use(express.json());

app.post('/api/brag', async (req, res) => {
  try {
    const { definition } = req.body;

    if (!definition || typeof definition !== 'string') {
      return res.status(400).json({ error: 'Definition is required' });
    }

    const result = await mockBragGeneratorFlow({ definition });

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

describe('API Integration Tests - /api/brag', () => {
  let server: any;
  let baseUrl: string;

  beforeAll(() => {
    return new Promise<void>((resolve) => {
      server = app.listen(0, () => {
        const port = (server.address() as any).port;
        baseUrl = `http://localhost:${port}`;
        resolve();
      });
    });
  });

  afterAll(() => {
    return new Promise<void>((resolve) => {
      server.close(() => resolve());
    });
  });

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('Happy Path', () => {
    it('should return 200 and mapped Brag for Portuguese input', async () => {
      const mockResult = {
        id: 'test-id-123',
        title: 'Implementação de cache Redis',
        context: 'A API apresentava alta latência',
        actionTaken: 'Implementou cache com Redis',
        businessImpact: 'Redução de 80% na latência',
        metrics: ['80% de redução na latência'],
        technologiesUsed: ['Redis', 'Node.js'],
      };

      mockBragGeneratorFlow.mockResolvedValue(mockResult);

      const response = await fetch(`${baseUrl}/api/brag`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ definition: 'Implementei um sistema de cache com Redis' }),
      });

      expect(response.status).toBe(200);
      const data = await response.json();

      expect(data.id).toBe('test-id-123');
      expect(data.titulo).toBe('Implementação de cache Redis');
      expect(data.contexto).toBe('A API apresentava alta latência');
      expect(data.impacto).toContain('Implementou cache com Redis');
      expect(data.impacto).toContain('Redução de 80% na latência');
      expect(data.metricas).toBe('80% de redução na latência');
      expect(data.tecnologias).toEqual(['Redis', 'Node.js']);

      expect(mockBragGeneratorFlow).toHaveBeenCalledWith({
        definition: 'Implementei um sistema de cache com Redis',
      });
    });

    it('should return 200 and mapped Brag for English input', async () => {
      const mockResult = {
        id: 'test-id-456',
        title: 'Redis caching implementation',
        context: 'API had high latency',
        actionTaken: 'Implemented Redis cache',
        businessImpact: '80% latency reduction',
        metrics: ['80% latency reduction'],
        technologiesUsed: ['Redis', 'Express'],
      };

      mockBragGeneratorFlow.mockResolvedValue(mockResult);

      const response = await fetch(`${baseUrl}/api/brag`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ definition: 'Implemented Redis caching layer' }),
      });

      expect(response.status).toBe(200);
      const data = await response.json();

      expect(data.id).toBe('test-id-456');
      expect(data.titulo).toBe('Redis caching implementation');
      expect(data.tecnologias).toEqual(['Redis', 'Express']);
    });

    it('should return 200 and mapped Brag for Spanish input', async () => {
      const mockResult = {
        id: 'test-id-789',
        title: 'Implementación de monitoreo',
        context: 'La empresa tenía dificultades',
        actionTaken: 'Implementó Prometheus y Grafana',
        businessImpact: '70% reducción en detección',
        metrics: ['70% reducción'],
        technologiesUsed: ['Prometheus', 'Grafana'],
      };

      mockBragGeneratorFlow.mockResolvedValue(mockResult);

      const response = await fetch(`${baseUrl}/api/brag`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ definition: 'Implementé un sistema de monitoreo con Prometheus' }),
      });

      expect(response.status).toBe(200);
      const data = await response.json();

      expect(data.id).toBe('test-id-789');
      expect(data.titulo).toBe('Implementación de monitoreo');
    });
  });

  describe('Error Cases', () => {
    it('should return 400 for missing definition', async () => {
      const response = await fetch(`${baseUrl}/api/brag`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({}),
      });

      expect(response.status).toBe(400);
      const data = await response.json();
      expect(data.error).toBe('Definition is required');
      expect(mockBragGeneratorFlow).not.toHaveBeenCalled();
    });

    it('should return 400 for empty string definition', async () => {
      const response = await fetch(`${baseUrl}/api/brag`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ definition: '' }),
      });

      expect(response.status).toBe(400);
      expect(mockBragGeneratorFlow).not.toHaveBeenCalled();
    });

    it('should return 400 for non-string definition', async () => {
      const response = await fetch(`${baseUrl}/api/brag`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ definition: 123 }),
      });

      expect(response.status).toBe(400);
      expect(mockBragGeneratorFlow).not.toHaveBeenCalled();
    });

    it('should return 400 for null definition', async () => {
      const response = await fetch(`${baseUrl}/api/brag`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ definition: null }),
      });

      expect(response.status).toBe(400);
      expect(mockBragGeneratorFlow).not.toHaveBeenCalled();
    });

    it('should return 400 for undefined definition', async () => {
      const response = await fetch(`${baseUrl}/api/brag`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ definition: undefined }),
      });

      expect(response.status).toBe(400);
      expect(mockBragGeneratorFlow).not.toHaveBeenCalled();
    });

    it('should return 500 when Genkit flow throws error', async () => {
      mockBragGeneratorFlow.mockRejectedValue(new Error('OpenAI API error'));

      const response = await fetch(`${baseUrl}/api/brag`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ definition: 'Test input' }),
      });

      expect(response.status).toBe(500);
      const data = await response.json();
      expect(data.error).toBe('Falha ao gerar Brag Document.');
    });

    it('should return 500 when Genkit flow returns null', async () => {
      mockBragGeneratorFlow.mockResolvedValue(null);

      const response = await fetch(`${baseUrl}/api/brag`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ definition: 'Test input' }),
      });

      expect(response.status).toBe(500);
    });
  });

  describe('Response Mapping', () => {
    it('should correctly map metrics array to string', async () => {
      const mockResult = {
        id: 'test-id',
        title: 'Test',
        context: 'Test',
        actionTaken: 'Test',
        businessImpact: 'Test',
        metrics: ['metric1', 'metric2', 'metric3'],
        technologiesUsed: ['tech1'],
      };

      mockBragGeneratorFlow.mockResolvedValue(mockResult);

      const response = await fetch(`${baseUrl}/api/brag`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ definition: 'Test' }),
      });

      const data = await response.json();
      expect(data.metricas).toBe('metric1. metric2. metric3');
    });

    it('should handle empty metrics array', async () => {
      const mockResult = {
        id: 'test-id',
        title: 'Test',
        context: 'Test',
        actionTaken: 'Test',
        businessImpact: 'Test',
        metrics: [],
        technologiesUsed: ['tech1'],
      };

      mockBragGeneratorFlow.mockResolvedValue(mockResult);

      const response = await fetch(`${baseUrl}/api/brag`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ definition: 'Test' }),
      });

      const data = await response.json();
      expect(data.metricas).toBe('');
    });

    it('should combine actionTaken and businessImpact in impacto field', async () => {
      const mockResult = {
        id: 'test-id',
        title: 'Test',
        context: 'Test',
        actionTaken: 'Implemented cache',
        businessImpact: 'Reduced latency by 80%',
        metrics: ['80% reduction'],
        technologiesUsed: ['Redis'],
      };

      mockBragGeneratorFlow.mockResolvedValue(mockResult);

      const response = await fetch(`${baseUrl}/api/brag`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ definition: 'Test' }),
      });

      const data = await response.json();
      expect(data.impacto).toBe('Implemented cache\n\nReduced latency by 80%');
    });
  });
});
