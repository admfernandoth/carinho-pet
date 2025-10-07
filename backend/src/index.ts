import Fastify from 'fastify';
import cors from '@fastify/cors';
import helmet from '@fastify/helmet';
import jwt from '@fastify/jwt';
import { PrismaClient } from '@prisma/client';
import { z } from 'zod';

const app = Fastify({ logger: true });
const prisma = new PrismaClient();

await app.register(cors, { origin: true });
await app.register(helmet);
await app.register(jwt, { secret: process.env.JWT_SECRET || 'replace-with-env-secret' });

app.get('/health', async () => ({ status: 'ok' }));

app.get('/professionals', async (request) => {
  const schema = z.object({ q: z.string().optional() });
  const query = schema.parse((request as any).query);
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
  }));
});

app.get('/professionals/:id', async (request) => {
  const params = z.object({ id: z.string() }).parse((request as any).params);
  const c = await prisma.caregiver.findUnique({ where: { id: params.id }, include: { user: true } });
  if (!c) return { error: 'Not found' };
  return {
    id: c.id,
    name: c.user.name,
    role: c.specialty,
    rating: c.rating,
    location: c.location,
    photos: c.photos,
    about: c.description,
  };
});

app.listen({ port: 3001 }).then(() => {
  console.log('API running on http://localhost:3001');
});