import { notFound } from 'next/navigation'
import Link from 'next/link'
import { MapPin, Clock, Globe, Instagram, ArrowLeft, Star } from 'lucide-react'
import { prisma } from '@/lib/db'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ContactRevealButton } from '@/components/providers/ContactRevealButton'
import { ReviewSection } from '@/components/providers/ReviewSection'
import { TIPO_EMPRESA_LABELS, TIPO_EMPRESA_COLORS } from '@/types'

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params
  const empresa = await prisma.empresa.findUnique({
    where: { slug },
  })

  if (!empresa) {
    return { title: 'Empresa não encontrada' }
  }

  return {
    title: `${empresa.nome} - Amor Patas`,
    description: empresa.descricao,
  }
}

export default async function EmpresaPage({ params }: PageProps) {
  const { slug } = await params

  const empresa = await prisma.empresa.findUnique({
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

  if (!empresa) {
    notFound()
  }

  const mediaAvaliacoes = empresa.avaliacoes.length > 0
    ? empresa.avaliacoes.reduce((acc, av) => acc + av.nota, 0) / empresa.avaliacoes.length
    : 0

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-br from-primary/10 to-secondary/10 border-b">
        <div className="container mx-auto px-4 py-8">
          <Link href="/empresas" className="inline-flex items-center text-sm text-gray-600 hover:text-primary mb-6">
            <ArrowLeft size={16} className="mr-2" />
            Voltar para empresas
          </Link>

          <div className="flex flex-col md:flex-row gap-6">
            {/* Logo/Icon */}
            <div className="w-32 h-32 bg-white rounded-2xl shadow-sm flex items-center justify-center flex-shrink-0">
              <span className="text-6xl">🏪</span>
            </div>

            {/* Info */}
            <div className="flex-1">
              <div className="flex items-start gap-3 mb-3">
                <Badge className={`${TIPO_EMPRESA_COLORS[empresa.tipo as keyof typeof TIPO_EMPRESA_COLORS]} text-white`}>
                  {TIPO_EMPRESA_LABELS[empresa.tipo as keyof typeof TIPO_EMPRESA_LABELS]}
                </Badge>
                {empresa.destaque && (
                  <Badge variant="outline" className="border-amber-500 text-amber-600">
                    Destaque
                  </Badge>
                )}
              </div>

              <h1 className="text-3xl font-bold text-gray-900 mb-2">{empresa.nome}</h1>

              <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-4">
                <span className="flex items-center">
                  <MapPin size={16} className="mr-1" />
                  {empresa.cidade}
                </span>
                {empresa.horarioFunc && (
                  <span className="flex items-center">
                    <Clock size={16} className="mr-1" />
                    {empresa.horarioFunc}
                  </span>
                )}
                {mediaAvaliacoes > 0 && (
                  <span className="flex items-center text-amber-500">
                    <Star size={16} className="mr-1 fill-current" />
                    {mediaAvaliacoes.toFixed(1)} ({empresa._count.avaliacoes} avaliações)
                  </span>
                )}
              </div>

              <p className="text-gray-600">{empresa.descricao}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Endereço */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Localização</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  {empresa.endereco}
                  {empresa.bairro && ` - ${empresa.bairro}`}
                  <br />
                  {empresa.cidade}
                </p>
              </CardContent>
            </Card>

            {/* Links */}
            {(empresa.website || empresa.instagram) && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Links</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-wrap gap-3">
                  {empresa.website && (
                    <a
                      href={empresa.website.startsWith('http') ? empresa.website : `https://${empresa.website}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Button variant="outline" size="sm" className="gap-2">
                        <Globe size={16} />
                        Website
                      </Button>
                    </a>
                  )}
                  {empresa.instagram && (
                    <a
                      href={`https://instagram.com/${empresa.instagram.replace('@', '')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Button variant="outline" size="sm" className="gap-2">
                        <Instagram size={16} />
                        {empresa.instagram}
                      </Button>
                    </a>
                  )}
                </CardContent>
              </Card>
            )}

            {/* Avaliações */}
            <ReviewSection
              avaliacoes={empresa.avaliacoes}
              empresaId={empresa.id}
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
                  telefone={empresa.telefone}
                  whatsapp={empresa.whatsapp}
                  email={empresa.email}
                  empresaId={empresa.id}
                />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
