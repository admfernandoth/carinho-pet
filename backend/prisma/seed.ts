import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const anaUser = await prisma.user.create({
    data: { email: 'ana@example.com', name: 'Ana Beatriz S.', role: 'CAREGIVER' },
  });
  const brunoUser = await prisma.user.create({
    data: { email: 'bruno@example.com', name: 'Bruno Oliveira', role: 'CAREGIVER' },
  });
  const carlaUser = await prisma.user.create({
    data: { email: 'carla@example.com', name: 'Carla Mendes', role: 'CAREGIVER' },
  });

  await prisma.caregiver.create({
    data: {
      userId: anaUser.id,
      specialty: 'Cuidadora de Cães e Gatos',
      location: 'Lapa',
      rating: 5,
      description:
        'Ofereço um ambiente familiar e seguro na minha casa. Tenho um quintal grande e totalmente cercado para os cães brincarem e uma sala de estar aconchegante.',
      photos: ['/imagens/ana-local-interno.jpg', '/imagens/ana-local-externo.jpg'],
    },
  });

  await prisma.caregiver.create({
    data: {
      userId: brunoUser.id,
      specialty: 'Adestrador Profissional',
      location: 'Centro',
      rating: 5,
      description:
        'Utilizo reforço positivo para ensinar comandos e melhorar o comportamento do seu cão. Aulas na minha área de treino equipada ou na casa do tutor.',
      photos: ['/imagens/bruno-local-treino.jpg', '/imagens/bruno-local-interno.jpg'],
    },
  });

  await prisma.caregiver.create({
    data: {
      userId: carlaUser.id,
      specialty: 'Especialista em Gatos',
      location: 'Jardim Alvorada',
      rating: 5,
      description:
        'Casa 100% gatificada, com arranhadores, prateleiras e brinquedos. Ambiente calmo e estimulante, livre de cães.',
      photos: ['/imagens/carla-local-gatos-1.jpg', '/imagens/carla-local-gatos-2.jpg'],
    },
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });