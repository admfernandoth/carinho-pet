import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { MapPin, ArrowLeft, Star, Instagram } from 'lucide-react'
import { prisma } from '@/lib/db'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ContactRevealButton } from '@/components/providers/ContactRevealButton'
import { ReviewSection } from '@/components/providers/ReviewSection'
import { TIPO_PRESTADOR_LABELS, TIPO_PRESTADOR_COLORS } from '@/types'

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params
  const prestador = await prisma.prestador.findUnique({
    where: { slug },
  })

  if (!prestador) {
    return { title: 'Prestador não encontrado' }
  }

  return {
    title: `${prestador.nome} - Amor Patas`,
    description: prestador.descricao,
  }
}

export default async function PrestadorPage({ params }: PageProps) {
  const { slug } = await params

  const prestador = await prisma.prestador.findUnique({
    where: { slug, ativo: true },
    include: {
      avaliacoes: {
        where: { aprovada: true },
        orderBy: { createdAt: 'desc' },
      },
      _count: {
        select: { avaliacoes: true, cliquesContato: true },
      },
    },
  })

  if (!prestador) {
    notFound()
  }

  const mediaAvaliacoes = prestador.avaliacoes.length > 0
    ? prestador.avaliacoes.reduce((acc, av) => acc + av.nota, 0) / prestador.avaliacoes.length
    : 0

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-br from-primary/10 to-secondary/10 border-b">
        <div className="container mx-auto px-4 py-8">
          <Link href="/prestadores" className="inline-flex items-center text-sm text-gray-600 hover:text-primary mb-6">
            <ArrowLeft size={16} className="mr-2" />
            Voltar para prestadores
          </Link>

          <div className="flex flex-col md:flex-row gap-6">
            {/* Foto */}
            <div className="w-32 h-32 md:w-40 md:h-40 relative rounded-2xl overflow-hidden shadow-lg flex-shrink-0">
              <Image
                src={prestador.foto || '/images/bruno-adestrador.jpg'}
                alt={prestador.nome}
                fill
                className="object-cover"
              />
            </div>

            {/* Info */}
            <div className="flex-1">
              <div className="flex items-start gap-3 mb-3">
                <Badge className={`${TIPO_PRESTADOR_COLORS[prestador.tipo as keyof typeof TIPO_PRESTADOR_COLORS]} text-white`}>
                  {TIPO_PRESTADOR_LABELS[prestador.tipo as keyof typeof TIPO_PRESTADOR_LABELS]}
                </Badge>
                {prestador.destaque && (
                  <Badge variant="outline" className="border-amber-500 text-amber-600">
                    Destaque
                  </Badge>
                )}
              </div>

              <h1 className="text-3xl font-bold text-gray-900 mb-2">{prestador.nome}</h1>

              <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-4">
                <span className="flex items-center">
                  <MapPin size={16} className="mr-1" />
                  {prestador.cidade}
                </span>
                {mediaAvaliacoes > 0 && (
                  <span className="flex items-center text-amber-500">
                    <Star size={16} className="mr-1 fill-current" />
                    {mediaAvaliacoes.toFixed(1)} ({prestador._count.avaliacoes} avaliações)
                  </span>
                )}
              </div>

              <p className="text-gray-600">{prestador.descricao}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Localização */}
            {(prestador.endereco || prestador.bairro) && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Localização</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    {prestador.endereco}
                    {prestador.bairro && ` - ${prestador.bairro}`}
                    <br />
                    {prestador.cidade}
                  </p>
                </CardContent>
              </Card>
            )}

            {/* Instagram */}
            {prestador.instagram && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Redes Sociais</CardTitle>
                </CardHeader>
                <CardContent>
                  <a
                    href={`https://instagram.com/${prestador.instagram.replace('@', '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button variant="outline" size="sm" className="gap-2">
                      <Instagram size={16} />
                      {prestador.instagram}
                    </Button>
                  </a>
                </CardContent>
              </Card>
            )}

            {/* Avaliações */}
            <ReviewSection
              avaliacoes={prestador.avaliacoes}
              prestadorId={prestador.id}
              mediaAvaliacoes={mediaAvaliacoes}
            />
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Card className="sticky top-20">
              <CardHeader>
                <CardTitle className="text-lg">Contato</CardTitle>
              </CardHeader>
              <CardContent>
                <ContactRevealButton
                  telefone={prestador.telefone}
                  whatsapp={prestador.whatsapp}
                  email={prestador.email}
                  prestadorId={prestador.id}
                />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
