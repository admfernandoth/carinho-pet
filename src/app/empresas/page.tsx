import Link from 'next/link'
import { Metadata } from 'next'
import { MapPin, Star, Building2 } from 'lucide-react'
import { prisma } from '@/lib/db'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { TIPO_EMPRESA_LABELS, TIPO_EMPRESA_COLORS } from '@/types'

export const metadata: Metadata = {
  title: "Quais são os melhores pet shops e clínicas veterinárias em Três Lagoas?",
  description: "Lista completa de pet shops, clínicas veterinárias, hospitais e hotéis pet em Três Lagoas-MS e região. Encontre endereço, telefone, WhatsApp e avaliações de clientes.",
  keywords: ["pet shop três lagoas", "clínica veterinária três lagoas", "hospital veterinário", "hotel pet", "banho e tosa"],
  openGraph: {
    title: "Pet Shops e Clínicas Veterinárias em Três Lagoas | Amor Patas",
    description: "Encontre os melhores pet shops e clínicas veterinárias em Três Lagoas-MS. Lista completa com contatos e avaliações.",
  },
}

interface PageProps {
  searchParams: Promise<{ tipo?: string; cidade?: string; busca?: string }>
}

export default async function EmpresasPage({ searchParams }: PageProps) {
  const params = await searchParams
  const { tipo, cidade, busca } = params

  const empresas = await prisma.empresa.findMany({
    where: {
      ativo: true,
      ...(tipo && { tipo }),
      ...(cidade && { cidade: { contains: cidade } }),
      ...(busca && {
        OR: [
          { nome: { contains: busca } },
          { descricao: { contains: busca } },
          { cidade: { contains: busca } },
        ],
      }),
    },
    include: {
      _count: {
        select: { avaliacoes: true, cliquesContato: true },
      },
    },
    orderBy: [{ destaque: 'desc' }, { nome: 'asc' }],
  })

  const cidades = await prisma.empresa.findMany({
    where: { ativo: true },
    select: { cidade: true },
    distinct: ['cidade'],
  })

  const tipos = Object.entries(TIPO_EMPRESA_LABELS)

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Empresas</h1>
          <p className="text-gray-600">
            Encontre pet shops, clínicas veterinárias e mais em Três Lagoas e região
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filtros */}
          <aside className="lg:w-64 flex-shrink-0">
            <div className="bg-white rounded-xl p-6 shadow-sm sticky top-20">
              <h2 className="font-semibold text-gray-900 mb-4">Filtros</h2>

              {/* Busca */}
              <form className="mb-6">
                <Input
                  type="search"
                  name="busca"
                  placeholder="Buscar..."
                  defaultValue={busca}
                  className="w-full"
                />
              </form>

              {/* Tipo */}
              <div className="mb-6">
                <h3 className="text-sm font-medium text-gray-700 mb-3">Tipo</h3>
                <div className="space-y-2">
                  <Link
                    href="/empresas"
                    className={`block text-sm px-3 py-2 rounded-lg transition-colors ${
                      !tipo ? 'bg-primary/10 text-primary font-medium' : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    Todos
                  </Link>
                  {tipos.map(([value, label]) => (
                    <Link
                      key={value}
                      href={`/empresas?tipo=${value}`}
                      className={`block text-sm px-3 py-2 rounded-lg transition-colors ${
                        tipo === value ? 'bg-primary/10 text-primary font-medium' : 'text-gray-600 hover:bg-gray-100'
                      }`}
                    >
                      {label}
                    </Link>
                  ))}
                </div>
              </div>

              {/* Cidade */}
              <div>
                <h3 className="text-sm font-medium text-gray-700 mb-3">Cidade</h3>
                <div className="space-y-2">
                  <Link
                    href={tipo ? `/empresas?tipo=${tipo}` : '/empresas'}
                    className={`block text-sm px-3 py-2 rounded-lg transition-colors ${
                      !cidade ? 'bg-primary/10 text-primary font-medium' : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    Todas
                  </Link>
                  {cidades.map(({ cidade: c }) => (
                    <Link
                      key={c}
                      href={`/empresas?${tipo ? `tipo=${tipo}&` : ''}cidade=${encodeURIComponent(c)}`}
                      className={`block text-sm px-3 py-2 rounded-lg transition-colors ${
                        cidade === c ? 'bg-primary/10 text-primary font-medium' : 'text-gray-600 hover:bg-gray-100'
                      }`}
                    >
                      {c}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </aside>

          {/* Lista */}
          <div className="flex-1">
            <div className="mb-4 text-sm text-gray-500">
              {empresas.length} empresa{empresas.length !== 1 ? 's' : ''} encontrada{empresas.length !== 1 ? 's' : ''}
            </div>

            {empresas.length === 0 ? (
              <div className="bg-white rounded-xl p-12 text-center">
                <Building2 className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">Nenhuma empresa encontrada</h3>
                <p className="text-gray-500">Tente ajustar os filtros ou fazer uma nova busca</p>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 gap-6">
                {empresas.map((empresa) => (
                  <Link key={empresa.id} href={`/empresas/${empresa.slug}`}>
                    <Card className="h-full hover:shadow-lg hover:-translate-y-1 transition-all duration-200 cursor-pointer overflow-hidden group">
                      <div className="h-32 bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center relative">
                        {empresa.destaque && (
                          <span className="absolute top-3 right-3 bg-amber-500 text-white text-xs px-2 py-1 rounded-full">
                            Destaque
                          </span>
                        )}
                        <span className="text-5xl opacity-30">🏪</span>
                      </div>
                      <CardContent className="p-5">
                        <div className="flex items-start justify-between gap-2 mb-3">
                          <Badge className={`${TIPO_EMPRESA_COLORS[empresa.tipo as keyof typeof TIPO_EMPRESA_COLORS]} text-white`}>
                            {TIPO_EMPRESA_LABELS[empresa.tipo as keyof typeof TIPO_EMPRESA_LABELS]}
                          </Badge>
                          {empresa._count.avaliacoes > 0 && (
                            <div className="flex items-center text-amber-500">
                              <Star size={14} className="fill-current" />
                              <span className="text-xs ml-1 text-gray-600">{empresa._count.avaliacoes}</span>
                            </div>
                          )}
                        </div>
                        <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-primary transition-colors line-clamp-1">
                          {empresa.nome}
                        </h3>
                        <p className="text-sm text-gray-500 mb-3 line-clamp-2">
                          {empresa.descricao}
                        </p>
                        <div className="flex items-center text-sm text-gray-400">
                          <MapPin size={14} className="mr-1" />
                          {empresa.cidade}
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
