import { MetadataRoute } from 'next'
import { prisma } from '@/lib/db'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://carinhopet.com.br'

  // Buscar empresas ativas
  const empresas = await prisma.empresa.findMany({
    where: { ativo: true },
    select: { slug: true, updatedAt: true },
  })

  // Buscar prestadores ativos
  const prestadores = await prisma.prestador.findMany({
    where: { ativo: true },
    select: { slug: true, updatedAt: true },
  })

  // Páginas estáticas
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/empresas`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/prestadores`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/sobre`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
  ]

  // Páginas de empresas
  const empresasPages: MetadataRoute.Sitemap = empresas.map((empresa) => ({
    url: `${baseUrl}/empresas/${empresa.slug}`,
    lastModified: empresa.updatedAt,
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }))

  // Páginas de prestadores
  const prestadoresPages: MetadataRoute.Sitemap = prestadores.map((prestador) => ({
    url: `${baseUrl}/prestadores/${prestador.slug}`,
    lastModified: prestador.updatedAt,
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }))

  return [...staticPages, ...empresasPages, ...prestadoresPages]
}
