import { redirect } from 'next/navigation'
import Link from 'next/link'
import { Building2, Users, MousePointer, Star, ArrowRight } from 'lucide-react'
import { prisma } from '@/lib/db'
import { isAuthenticated } from '@/lib/auth'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

export const dynamic = 'force-dynamic'

export default async function AdminPage() {
  const authenticated = await isAuthenticated()
  if (!authenticated) {
    redirect('/admin/login')
  }
  const [
    totalEmpresas,
    totalPrestadores,
    totalCliques,
    totalAvaliacoes,
    avaliacoesPendentes,
    ultimosCliques,
  ] = await Promise.all([
    prisma.empresa.count(),
    prisma.prestador.count(),
    prisma.cliqueContato.count(),
    prisma.avaliacao.count(),
    prisma.avaliacao.count({ where: { aprovada: false } }),
    prisma.cliqueContato.findMany({
      take: 10,
      orderBy: { createdAt: 'desc' },
      include: {
        empresa: { select: { nome: true } },
        prestador: { select: { nome: true } },
      },
    }),
  ])

  const stats = [
    {
      title: 'Empresas',
      value: totalEmpresas,
      icon: Building2,
      color: 'bg-blue-500',
      href: '/admin/empresas',
    },
    {
      title: 'Prestadores',
      value: totalPrestadores,
      icon: Users,
      color: 'bg-green-500',
      href: '/admin/prestadores',
    },
    {
      title: 'Cliques em Contatos',
      value: totalCliques,
      icon: MousePointer,
      color: 'bg-purple-500',
      href: '/admin/estatisticas',
    },
    {
      title: 'Avaliações',
      value: totalAvaliacoes,
      icon: Star,
      color: 'bg-amber-500',
      href: '/admin/avaliacoes',
      badge: avaliacoesPendentes > 0 ? `${avaliacoesPendentes} pendentes` : undefined,
    },
  ]

  return (
    <div>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Painel Administrativo</h1>
        <p className="text-gray-600 mb-8">Gerencie empresas, prestadores e visualize estatísticas</p>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat) => (
            <Link key={stat.title} href={stat.href}>
              <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-500 mb-1">{stat.title}</p>
                      <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                      {stat.badge && (
                        <span className="text-xs text-amber-600 font-medium">{stat.badge}</span>
                      )}
                    </div>
                    <div className={`w-12 h-12 ${stat.color} rounded-lg flex items-center justify-center`}>
                      <stat.icon className="w-6 h-6 text-white" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Últimos Cliques */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Últimos Cliques em Contatos</CardTitle>
              <Link href="/admin/estatisticas">
                <Button variant="ghost" size="sm" className="gap-1">
                  Ver todos <ArrowRight size={14} />
                </Button>
              </Link>
            </CardHeader>
            <CardContent>
              {ultimosCliques.length === 0 ? (
                <p className="text-gray-500 text-center py-8">Nenhum clique registrado ainda</p>
              ) : (
                <div className="space-y-3">
                  {ultimosCliques.map((clique) => (
                    <div key={clique.id} className="flex items-center justify-between py-2 border-b last:border-0">
                      <div>
                        <p className="font-medium text-gray-900 text-sm">
                          {clique.empresa?.nome || clique.prestador?.nome || 'Desconhecido'}
                        </p>
                        <p className="text-xs text-gray-500">
                          {clique.tipoContato} • {new Date(clique.createdAt).toLocaleDateString('pt-BR')}
                        </p>
                      </div>
                      <span className="text-xs px-2 py-1 bg-gray-100 rounded-full capitalize">
                        {clique.tipoContato}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Ações Rápidas */}
          <Card>
            <CardHeader>
              <CardTitle>Ações Rápidas</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Link href="/admin/empresas/novo" className="block">
                <Button variant="outline" className="w-full justify-start gap-2">
                  <Building2 size={18} />
                  Cadastrar nova empresa
                </Button>
              </Link>
              <Link href="/admin/prestadores/novo" className="block">
                <Button variant="outline" className="w-full justify-start gap-2">
                  <Users size={18} />
                  Cadastrar novo prestador
                </Button>
              </Link>
              <Link href="/admin/avaliacoes" className="block">
                <Button variant="outline" className="w-full justify-start gap-2">
                  <Star size={18} />
                  Moderar avaliações
                  {avaliacoesPendentes > 0 && (
                    <span className="ml-auto bg-amber-500 text-white text-xs px-2 py-0.5 rounded-full">
                      {avaliacoesPendentes}
                    </span>
                  )}
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
