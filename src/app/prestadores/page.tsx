import Link from 'next/link'
import Image from 'next/image'
import { MapPin, Star, User } from 'lucide-react'
import { prisma } from '@/lib/db'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { TIPO_PRESTADOR_LABELS, TIPO_PRESTADOR_COLORS } from '@/types'

interface PageProps {
  searchParams: Promise<{ tipo?: string; cidade?: string }>
}

export default async function PrestadoresPage({ searchParams }: PageProps) {
  const params = await searchParams
  const { tipo, cidade } = params

  const prestadores = await prisma.prestador.findMany({
    where: {
      ativo: true,
      ...(tipo && { tipo }),
      ...(cidade && { cidade: { contains: cidade } }),
    },
    include: {
      _count: {
        select: { avaliacoes: true, cliquesContato: true },
      },
    },
    orderBy: [{ destaque: 'desc' }, { nome: 'asc' }],
  })

  const cidades = await prisma.prestador.findMany({
    where: { ativo: true },
    select: { cidade: true },
    distinct: ['cidade'],
  })

  const tipos = Object.entries(TIPO_PRESTADOR_LABELS)

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Prestadores de Serviço</h1>
          <p className="text-gray-600">
            Adestradores, cuidadores, passeadores e mais profissionais para seu pet
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filtros */}
          <aside className="lg:w-64 flex-shrink-0">
            <div className="bg-white rounded-xl p-6 shadow-sm sticky top-20">
              <h2 className="font-semibold text-gray-900 mb-4">Filtros</h2>

              {/* Tipo */}
              <div className="mb-6">
                <h3 className="text-sm font-medium text-gray-700 mb-3">Especialidade</h3>
                <div className="space-y-2">
                  <Link
                    href="/prestadores"
                    className={`block text-sm px-3 py-2 rounded-lg transition-colors ${
                      !tipo ? 'bg-primary/10 text-primary font-medium' : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    Todos
                  </Link>
                  {tipos.map(([value, label]) => (
                    <Link
                      key={value}
                      href={`/prestadores?tipo=${value}`}
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
              {cidades.length > 0 && (
                <div>
                  <h3 className="text-sm font-medium text-gray-700 mb-3">Cidade</h3>
                  <div className="space-y-2">
                    <Link
                      href={tipo ? `/prestadores?tipo=${tipo}` : '/prestadores'}
                      className={`block text-sm px-3 py-2 rounded-lg transition-colors ${
                        !cidade ? 'bg-primary/10 text-primary font-medium' : 'text-gray-600 hover:bg-gray-100'
                      }`}
                    >
                      Todas
                    </Link>
                    {cidades.map(({ cidade: c }) => (
                      <Link
                        key={c}
                        href={`/prestadores?${tipo ? `tipo=${tipo}&` : ''}cidade=${encodeURIComponent(c)}`}
                        className={`block text-sm px-3 py-2 rounded-lg transition-colors ${
                          cidade === c ? 'bg-primary/10 text-primary font-medium' : 'text-gray-600 hover:bg-gray-100'
                        }`}
                      >
                        {c}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </aside>

          {/* Lista */}
          <div className="flex-1">
            <div className="mb-4 text-sm text-gray-500">
              {prestadores.length} prestador{prestadores.length !== 1 ? 'es' : ''} encontrado{prestadores.length !== 1 ? 's' : ''}
            </div>

            {prestadores.length === 0 ? (
              <div className="bg-white rounded-xl p-12 text-center">
                <User className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">Nenhum prestador encontrado</h3>
                <p className="text-gray-500">Tente ajustar os filtros</p>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 gap-6">
                {prestadores.map((prestador) => (
                  <Link key={prestador.id} href={`/prestadores/${prestador.slug}`}>
                    <Card className="h-full hover:shadow-lg hover:-translate-y-1 transition-all duration-200 cursor-pointer overflow-hidden group">
                      <div className="relative h-48">
                        <Image
                          src={prestador.foto || '/images/bruno-adestrador.jpg'}
                          alt={prestador.nome}
                          fill
                          className="object-cover"
                        />
                        {prestador.destaque && (
                          <span className="absolute top-3 right-3 bg-amber-500 text-white text-xs px-2 py-1 rounded-full">
                            Destaque
                          </span>
                        )}
                      </div>
                      <CardContent className="p-5">
                        <div className="flex items-start justify-between gap-2 mb-3">
                          <Badge className={`${TIPO_PRESTADOR_COLORS[prestador.tipo as keyof typeof TIPO_PRESTADOR_COLORS]} text-white`}>
                            {TIPO_PRESTADOR_LABELS[prestador.tipo as keyof typeof TIPO_PRESTADOR_LABELS]}
                          </Badge>
                          {prestador._count.avaliacoes > 0 && (
                            <div className="flex items-center text-amber-500">
                              <Star size={14} className="fill-current" />
                              <span className="text-xs ml-1 text-gray-600">{prestador._count.avaliacoes}</span>
                            </div>
                          )}
                        </div>
                        <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-primary transition-colors">
                          {prestador.nome}
                        </h3>
                        <p className="text-sm text-gray-500 mb-3 line-clamp-2">
                          {prestador.descricao}
                        </p>
                        <div className="flex items-center text-sm text-gray-400">
                          <MapPin size={14} className="mr-1" />
                          {prestador.cidade}
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
