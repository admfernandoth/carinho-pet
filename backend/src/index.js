import Fastify from 'fastify';
import cors from '@fastify/cors';
import helmet from '@fastify/helmet';
import jwt from '@fastify/jwt';
import { PrismaClient } from '@prisma/client';
import { z } from 'zod';

const app = Fastify({ logger: true });
let prisma;
try {
  prisma = new PrismaClient();
} catch (e) {
  app.log.warn('PrismaClient não pôde ser inicializado, usando dados mock.');
}

await app.register(cors, { origin: true });
await app.register(helmet);
await app.register(jwt, { secret: process.env.JWT_SECRET || 'replace-with-env-secret' });

const mockCaregivers = [
  {
    id: 'mock-ana',
    name: 'Ana Beatriz S.',
    role: 'Cuidadora de Cães e Gatos',
    rating: 5,
    location: 'Lapa',
    photos: ['/imagens/ana-local-interno.jpg', '/imagens/ana-local-externo.jpg'],
    about:
      'Ofereço um ambiente familiar e seguro na minha casa. Tenho um quintal grande e totalmente cercado para os cães brincarem e uma sala de estar aconchegante.',
    review: 'Ana foi incrível com o Max! Recomendo demais!'
  },
  {
    id: 'mock-bruno',
    name: 'Bruno Oliveira',
    role: 'Adestrador Profissional',
    rating: 5,
    location: 'Centro',
    photos: ['/imagens/bruno-local-treino.jpg', '/imagens/bruno-local-interno.jpg'],
    about:
      'Utilizo reforço positivo para ensinar comandos e melhorar o comportamento do seu cão. Aulas na minha área de treino equipada ou na casa do tutor.',
    review: 'Transformou nosso filhote! Profissional nota 10.'
  },
  {
    id: 'mock-carla',
    name: 'Carla Mendes',
    role: 'Especialista em Gatos',
    rating: 5,
    location: 'Jardim Alvorada',
    photos: ['/imagens/carla-local-gatos-1.jpg', '/imagens/carla-local-gatos-2.jpg'],
    about:
      'Casa 100% gatificada, com arranhadores, prateleiras e brinquedos. Ambiente calmo e estimulante, livre de cães.',
    review: 'Meus gatos amaram, serviço impecável.'
  },
];

app.get('/health', async () => ({ status: 'ok' }));

app.get('/professionals', async (request) => {
  const schema = z.object({ q: z.string().optional() });
  const query = schema.parse((request).query);

  // Tenta buscar no banco, caso falhe, retorna mock
  if (prisma) {
    try {
      const caregivers = await prisma.caregiver.findMany({
        where: query.q
          ? {
              OR: [
                { specialty: { contains: query.q, mode: 'insensitive' } },
                { description: { contains: query.q, mode: 'insensitive' } },
                { location: { contains: query.q, mode: 'insensitive' } },
              ],
            }
          : undefined,
        include: { user: true },
        orderBy: { rating: 'desc' },
      });
      return caregivers.map((c) => ({
        id: c.id,
        name: c.user.name,
        role: c.specialty,
        rating: c.rating,
        location: c.location,
        photos: c.photos,
        about: c.description,
        review: 'Ótima experiência, muito atencioso(a)!',
      }));
    } catch (e) {
      app.log.warn('Falha ao consultar banco, retornando mock. Motivo: ' + e?.message);
    }
  }

  const list = mockCaregivers.filter((c) => {
    if (!query.q) return true;
    const q = query.q.toLowerCase();
    return (
      c.role.toLowerCase().includes(q) ||
      c.about.toLowerCase().includes(q) ||
      c.location.toLowerCase().includes(q) ||
      c.name.toLowerCase().includes(q)
    );
  });
  return list;
});

app.get('/professionals/:id', async (request) => {
  const params = z.object({ id: z.string() }).parse((request).params);
  if (prisma) {
    try {
      const c = await prisma.caregiver.findUnique({ where: { id: params.id }, include: { user: true } });
      if (c) {
        return {
          id: c.id,
          name: c.user.name,
          role: c.specialty,
          rating: c.rating,
          location: c.location,
          photos: c.photos,
          about: c.description,
        };
      }
    } catch (e) {
      app.log.warn('Falha ao consultar banco, tentando mock. Motivo: ' + e?.message);
    }
  }
  return mockCaregivers.find((c) => c.id === params.id) || { error: 'Not found' };
});

app.listen({ port: 3001 }).then(() => {
  console.log('API running on http://localhost:3001');
});