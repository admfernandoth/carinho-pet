import { redirect } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Check, Star, Clock } from 'lucide-react'
import { prisma } from '@/lib/db'
import { isAuthenticated } from '@/lib/auth'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { AvaliacaoActions } from './AvaliacaoActions'

export const dynamic = 'force-dynamic'

export default async function AvaliacoesPage() {
  const authenticated = await isAuthenticated()
  if (!authenticated) {
    redirect('/admin/login')
  }
  const avaliacoes = await prisma.avaliacao.findMany({
    orderBy: [
      { aprovada: 'asc' },
      { createdAt: 'desc' },
    ],
    include: {
      empresa: { select: { nome: true, slug: true } },
      prestador: { select: { nome: true, slug: true } },
    },
  })

  const pendentes = avaliacoes.filter(a => !a.aprovada)
  const aprovadas = avaliacoes.filter(a => a.aprovada)

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <Link href="/admin" className="inline-flex items-center text-sm text-gray-600 hover:text-primary mb-6">
          <ArrowLeft size={16} className="mr-2" />
          Voltar para o painel
        </Link>

        <h1 className="text-3xl font-bold text-gray-900 mb-2">Moderação de Avaliações</h1>
        <p className="text-gray-600 mb-8">Aprove ou rejeite avaliações enviadas pelos usuários</p>

        {/* Pendentes */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="text-amber-500" size={20} />
              Avaliações Pendentes ({pendentes.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            {pendentes.length === 0 ? (
              <p className="text-gray-500 text-center py-8">Nenhuma avaliação pendente</p>
            ) : (
              <div className="space-y-4">
                {pendentes.map((avaliacao) => (
                  <div key={avaliacao.id} className="border rounded-lg p-4 bg-amber-50">
                    <div className="flex flex-wrap items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <Badge variant="outline" className="bg-amber-100 text-amber-700 border-amber-300">
                            Pendente
                          </Badge>
                          <div className="flex items-center text-amber-500">
                            {Array.from({ length: 5 }).map((_, i) => (
                              <Star
                                key={i}
                                size={14}
                                className={i < avaliacao.nota ? 'fill-current' : 'text-gray-300'}
                              />
                            ))}
                          </div>
                        </div>
                        <p className="font-medium text-gray-900">{avaliacao.nomeAutor}</p>
                        {avaliacao.comentario && (
                          <p className="text-gray-600 mt-1">{avaliacao.comentario}</p>
                        )}
                        <p className="text-sm text-gray-500 mt-2">
                          Para: {avaliacao.empresa?.nome || avaliacao.prestador?.nome || 'Desconhecido'}
                          {' • '}
                          {new Date(avaliacao.createdAt).toLocaleDateString('pt-BR')}
                        </p>
                      </div>
                      <AvaliacaoActions id={avaliacao.id} />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Aprovadas */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Check className="text-green-500" size={20} />
              Avaliações Aprovadas ({aprovadas.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            {aprovadas.length === 0 ? (
              <p className="text-gray-500 text-center py-8">Nenhuma avaliação aprovada ainda</p>
            ) : (
              <div className="space-y-4">
                {aprovadas.map((avaliacao) => (
                  <div key={avaliacao.id} className="border rounded-lg p-4">
                    <div className="flex flex-wrap items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <Badge variant="outline" className="bg-green-100 text-green-700 border-green-300">
                            Aprovada
                          </Badge>
                          <div className="flex items-center text-amber-500">
                            {Array.from({ length: 5 }).map((_, i) => (
                              <Star
                                key={i}
                                size={14}
                                className={i < avaliacao.nota ? 'fill-current' : 'text-gray-300'}
                              />
                            ))}
                          </div>
                        </div>
                        <p className="font-medium text-gray-900">{avaliacao.nomeAutor}</p>
                        {avaliacao.comentario && (
                          <p className="text-gray-600 mt-1">{avaliacao.comentario}</p>
                        )}
                        <p className="text-sm text-gray-500 mt-2">
                          Para: {avaliacao.empresa?.nome || avaliacao.prestador?.nome || 'Desconhecido'}
                          {' • '}
                          {new Date(avaliacao.createdAt).toLocaleDateString('pt-BR')}
                        </p>
                      </div>
                      <AvaliacaoActions id={avaliacao.id} aprovada />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
