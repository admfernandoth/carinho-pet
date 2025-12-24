'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import {
  Eye,
  Phone,
  MessageCircle,
  Mail,
  TrendingUp,
  Building2,
  User,
  Calendar,
  BarChart3,
  Loader2,
  Search
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { AuthGuard } from '@/components/admin/AuthGuard'

interface AnalyticsData {
  periodo: number
  dataInicio: string
  totais: {
    cliques: number
    reveal: number
    whatsapp: number
    telefone: number
    email: number
  }
  porDia: { data: string; cliques: number }[]
  empresas: {
    id: string
    nome: string
    tipo: string
    reveal: number
    telefone: number
    whatsapp: number
    email: number
    total: number
  }[]
  prestadores: {
    id: string
    nome: string
    tipo: string
    reveal: number
    telefone: number
    whatsapp: number
    email: number
    total: number
  }[]
}

function AnalyticsContent() {
  const [data, setData] = useState<AnalyticsData | null>(null)
  const [loading, setLoading] = useState(true)
  const [periodo, setPeriodo] = useState('30')
  const [filtroTipo, setFiltroTipo] = useState('todos')
  const [busca, setBusca] = useState('')

  useEffect(() => {
    fetchAnalytics()
  }, [periodo, filtroTipo])

  const fetchAnalytics = async () => {
    setLoading(true)
    try {
      const res = await fetch(`/api/admin/analytics?periodo=${periodo}&tipo=${filtroTipo}`)
      const json = await res.json()
      setData(json)
    } catch (error) {
      console.error('Erro ao carregar analytics:', error)
    } finally {
      setLoading(false)
    }
  }

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr + 'T00:00:00')
    return date.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' })
  }

  const formatTipo = (tipo: string) => {
    const tipos: Record<string, string> = {
      'CLINICA': 'Clínica',
      'PETSHOP': 'Pet Shop',
      'VETERINARIO': 'Veterinário',
      'HOTEL_PET': 'Hotel Pet',
      'BANHO_TOSA': 'Banho e Tosa',
      'ADESTRADOR': 'Adestrador',
      'PASSEADOR': 'Passeador',
      'CUIDADOR': 'Cuidador',
    }
    return tipos[tipo] || tipo
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    )
  }

  if (!data) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">Erro ao carregar dados</p>
      </div>
    )
  }

  const maxCliques = Math.max(...data.porDia.map(d => d.cliques), 1)

  // Filtrar por busca
  const empresasFiltradas = data.empresas.filter(e =>
    e.nome.toLowerCase().includes(busca.toLowerCase()) ||
    formatTipo(e.tipo).toLowerCase().includes(busca.toLowerCase())
  )

  const prestadoresFiltrados = data.prestadores.filter(p =>
    p.nome.toLowerCase().includes(busca.toLowerCase()) ||
    formatTipo(p.tipo).toLowerCase().includes(busca.toLowerCase())
  )

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <BarChart3 className="w-7 h-7 text-primary" />
            Analytics de Contatos
          </h1>
          <p className="text-gray-600 mt-1">
            Visualize os cliques em "Ver Contato" por período
          </p>
        </div>
      </div>

      {/* Filtros */}
      <div className="bg-white p-4 rounded-lg shadow-sm border flex flex-wrap gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            <Calendar className="w-4 h-4 inline mr-1" />
            Período
          </label>
          <select
            value={periodo}
            onChange={(e) => setPeriodo(e.target.value)}
            className="border rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-primary focus:border-primary"
          >
            <option value="7">Últimos 7 dias</option>
            <option value="15">Últimos 15 dias</option>
            <option value="30">Últimos 30 dias</option>
            <option value="60">Últimos 60 dias</option>
            <option value="90">Últimos 90 dias</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Tipo
          </label>
          <select
            value={filtroTipo}
            onChange={(e) => setFiltroTipo(e.target.value)}
            className="border rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-primary focus:border-primary"
          >
            <option value="todos">Todos</option>
            <option value="empresas">Apenas Empresas</option>
            <option value="prestadores">Apenas Prestadores</option>
          </select>
        </div>
        <div className="flex-1 min-w-[200px]">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            <Search className="w-4 h-4 inline mr-1" />
            Buscar
          </label>
          <input
            type="text"
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            placeholder="Nome da empresa ou prestador..."
            className="w-full border rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-primary focus:border-primary"
          />
        </div>
      </div>

      {/* Cards de Totais */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <div className="bg-white p-4 rounded-lg shadow-sm border">
          <div className="flex items-center gap-2 text-gray-600 mb-2">
            <TrendingUp className="w-5 h-5" />
            <span className="text-sm font-medium">Total</span>
          </div>
          <p className="text-3xl font-bold text-gray-900">{data.totais.cliques}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border">
          <div className="flex items-center gap-2 text-purple-600 mb-2">
            <Eye className="w-5 h-5" />
            <span className="text-sm font-medium">Ver Contato</span>
          </div>
          <p className="text-3xl font-bold text-purple-700">{data.totais.reveal}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border">
          <div className="flex items-center gap-2 text-green-600 mb-2">
            <MessageCircle className="w-5 h-5" />
            <span className="text-sm font-medium">WhatsApp</span>
          </div>
          <p className="text-3xl font-bold text-green-700">{data.totais.whatsapp}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border">
          <div className="flex items-center gap-2 text-blue-600 mb-2">
            <Phone className="w-5 h-5" />
            <span className="text-sm font-medium">Telefone</span>
          </div>
          <p className="text-3xl font-bold text-blue-700">{data.totais.telefone}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border">
          <div className="flex items-center gap-2 text-orange-600 mb-2">
            <Mail className="w-5 h-5" />
            <span className="text-sm font-medium">E-mail</span>
          </div>
          <p className="text-3xl font-bold text-orange-700">{data.totais.email}</p>
        </div>
      </div>

      {/* Gráfico de Barras Simples */}
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Cliques por Dia</h2>
        <div className="flex items-end gap-1 h-40 overflow-x-auto pb-2">
          {data.porDia.map((dia, i) => (
            <div key={i} className="flex flex-col items-center min-w-[30px]">
              <div
                className="w-6 bg-primary rounded-t transition-all hover:bg-primary/80"
                style={{
                  height: `${Math.max((dia.cliques / maxCliques) * 120, dia.cliques > 0 ? 8 : 0)}px`
                }}
                title={`${dia.cliques} cliques`}
              />
              <span className="text-[10px] text-gray-500 mt-1 rotate-45 origin-left whitespace-nowrap">
                {formatDate(dia.data)}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Tabela de Empresas */}
      {(filtroTipo === 'todos' || filtroTipo === 'empresas') && (
        <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
          <div className="p-4 border-b bg-gray-50">
            <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
              <Building2 className="w-5 h-5 text-primary" />
              Empresas ({empresasFiltradas.length}{busca && ` de ${data.empresas.length}`})
            </h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 text-left">
                <tr>
                  <th className="px-4 py-3 text-sm font-medium text-gray-600">Empresa</th>
                  <th className="px-4 py-3 text-sm font-medium text-gray-600">Tipo</th>
                  <th className="px-4 py-3 text-sm font-medium text-gray-600 text-center">
                    <Eye className="w-4 h-4 inline" /> Ver
                  </th>
                  <th className="px-4 py-3 text-sm font-medium text-gray-600 text-center">
                    <MessageCircle className="w-4 h-4 inline text-green-600" /> Whats
                  </th>
                  <th className="px-4 py-3 text-sm font-medium text-gray-600 text-center">
                    <Phone className="w-4 h-4 inline text-blue-600" /> Tel
                  </th>
                  <th className="px-4 py-3 text-sm font-medium text-gray-600 text-center">
                    <Mail className="w-4 h-4 inline text-orange-600" /> Email
                  </th>
                  <th className="px-4 py-3 text-sm font-medium text-gray-600 text-center font-bold">Total</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {empresasFiltradas.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="px-4 py-8 text-center text-gray-500">
                      {busca ? 'Nenhuma empresa encontrada com essa busca' : 'Nenhum clique registrado no período'}
                    </td>
                  </tr>
                ) : (
                  empresasFiltradas.map((empresa) => (
                    <tr key={empresa.id} className="hover:bg-gray-50">
                      <td className="px-4 py-3 font-medium text-gray-900">{empresa.nome}</td>
                      <td className="px-4 py-3 text-sm text-gray-600">{formatTipo(empresa.tipo)}</td>
                      <td className="px-4 py-3 text-center">
                        <span className={`inline-flex items-center justify-center min-w-[28px] px-2 py-1 rounded-full text-sm ${empresa.reveal > 0 ? 'bg-purple-100 text-purple-700' : 'text-gray-400'}`}>
                          {empresa.reveal}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-center">
                        <span className={`inline-flex items-center justify-center min-w-[28px] px-2 py-1 rounded-full text-sm ${empresa.whatsapp > 0 ? 'bg-green-100 text-green-700' : 'text-gray-400'}`}>
                          {empresa.whatsapp}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-center">
                        <span className={`inline-flex items-center justify-center min-w-[28px] px-2 py-1 rounded-full text-sm ${empresa.telefone > 0 ? 'bg-blue-100 text-blue-700' : 'text-gray-400'}`}>
                          {empresa.telefone}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-center">
                        <span className={`inline-flex items-center justify-center min-w-[28px] px-2 py-1 rounded-full text-sm ${empresa.email > 0 ? 'bg-orange-100 text-orange-700' : 'text-gray-400'}`}>
                          {empresa.email}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-center">
                        <span className={`inline-flex items-center justify-center min-w-[28px] px-2 py-1 rounded-full text-sm font-bold ${empresa.total > 0 ? 'bg-primary/10 text-primary' : 'text-gray-400'}`}>
                          {empresa.total}
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tabela de Prestadores */}
      {(filtroTipo === 'todos' || filtroTipo === 'prestadores') && (
        <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
          <div className="p-4 border-b bg-gray-50">
            <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
              <User className="w-5 h-5 text-primary" />
              Prestadores ({prestadoresFiltrados.length}{busca && ` de ${data.prestadores.length}`})
            </h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 text-left">
                <tr>
                  <th className="px-4 py-3 text-sm font-medium text-gray-600">Prestador</th>
                  <th className="px-4 py-3 text-sm font-medium text-gray-600">Tipo</th>
                  <th className="px-4 py-3 text-sm font-medium text-gray-600 text-center">
                    <Eye className="w-4 h-4 inline" /> Ver
                  </th>
                  <th className="px-4 py-3 text-sm font-medium text-gray-600 text-center">
                    <MessageCircle className="w-4 h-4 inline text-green-600" /> Whats
                  </th>
                  <th className="px-4 py-3 text-sm font-medium text-gray-600 text-center">
                    <Phone className="w-4 h-4 inline text-blue-600" /> Tel
                  </th>
                  <th className="px-4 py-3 text-sm font-medium text-gray-600 text-center">
                    <Mail className="w-4 h-4 inline text-orange-600" /> Email
                  </th>
                  <th className="px-4 py-3 text-sm font-medium text-gray-600 text-center font-bold">Total</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {prestadoresFiltrados.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="px-4 py-8 text-center text-gray-500">
                      {busca ? 'Nenhum prestador encontrado com essa busca' : 'Nenhum prestador cadastrado ou sem cliques no período'}
                    </td>
                  </tr>
                ) : (
                  prestadoresFiltrados.map((prestador) => (
                    <tr key={prestador.id} className="hover:bg-gray-50">
                      <td className="px-4 py-3 font-medium text-gray-900">{prestador.nome}</td>
                      <td className="px-4 py-3 text-sm text-gray-600">{formatTipo(prestador.tipo)}</td>
                      <td className="px-4 py-3 text-center">
                        <span className={`inline-flex items-center justify-center min-w-[28px] px-2 py-1 rounded-full text-sm ${prestador.reveal > 0 ? 'bg-purple-100 text-purple-700' : 'text-gray-400'}`}>
                          {prestador.reveal}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-center">
                        <span className={`inline-flex items-center justify-center min-w-[28px] px-2 py-1 rounded-full text-sm ${prestador.whatsapp > 0 ? 'bg-green-100 text-green-700' : 'text-gray-400'}`}>
                          {prestador.whatsapp}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-center">
                        <span className={`inline-flex items-center justify-center min-w-[28px] px-2 py-1 rounded-full text-sm ${prestador.telefone > 0 ? 'bg-blue-100 text-blue-700' : 'text-gray-400'}`}>
                          {prestador.telefone}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-center">
                        <span className={`inline-flex items-center justify-center min-w-[28px] px-2 py-1 rounded-full text-sm ${prestador.email > 0 ? 'bg-orange-100 text-orange-700' : 'text-gray-400'}`}>
                          {prestador.email}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-center">
                        <span className={`inline-flex items-center justify-center min-w-[28px] px-2 py-1 rounded-full text-sm font-bold ${prestador.total > 0 ? 'bg-primary/10 text-primary' : 'text-gray-400'}`}>
                          {prestador.total}
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  )
}

export default function AnalyticsPage() {
  return (
    <AuthGuard>
      <AnalyticsContent />
    </AuthGuard>
  )
}
