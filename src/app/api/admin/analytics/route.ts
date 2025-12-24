import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { isAuthenticated } from '@/lib/auth'
import { logUnauthorizedAccess } from '@/lib/audit'

export async function GET(request: NextRequest) {
  // Verificar autenticação
  if (!(await isAuthenticated())) {
    await logUnauthorizedAccess(request, '/api/admin/analytics')
    return NextResponse.json({ error: 'Não autorizado' }, { status: 401 })
  }

  const searchParams = request.nextUrl.searchParams
  const periodo = searchParams.get('periodo') || '30' // dias
  const tipo = searchParams.get('tipo') || 'todos' // empresas, prestadores, todos

  const dias = parseInt(periodo)
  const dataInicio = new Date()
  dataInicio.setDate(dataInicio.getDate() - dias)
  dataInicio.setHours(0, 0, 0, 0)

  try {
    // Buscar cliques por empresa
    const cliquesEmpresas = await prisma.cliqueContato.groupBy({
      by: ['empresaId', 'tipoContato'],
      where: {
        empresaId: { not: null },
        createdAt: { gte: dataInicio },
      },
      _count: { id: true },
    })

    // Buscar cliques por prestador
    const cliquesPrestadores = await prisma.cliqueContato.groupBy({
      by: ['prestadorId', 'tipoContato'],
      where: {
        prestadorId: { not: null },
        createdAt: { gte: dataInicio },
      },
      _count: { id: true },
    })

    // Buscar dados das empresas
    const empresas = await prisma.empresa.findMany({
      select: { id: true, nome: true, tipo: true },
    })

    // Buscar dados dos prestadores
    const prestadores = await prisma.prestador.findMany({
      select: { id: true, nome: true, tipo: true },
    })

    // Processar dados das empresas
    const empresasMap = new Map<string, {
      id: string
      nome: string
      tipo: string
      reveal: number
      telefone: number
      whatsapp: number
      email: number
      total: number
    }>()

    empresas.forEach(e => {
      empresasMap.set(e.id, {
        id: e.id,
        nome: e.nome,
        tipo: e.tipo,
        reveal: 0,
        telefone: 0,
        whatsapp: 0,
        email: 0,
        total: 0,
      })
    })

    cliquesEmpresas.forEach(c => {
      if (c.empresaId && empresasMap.has(c.empresaId)) {
        const empresa = empresasMap.get(c.empresaId)!
        const count = c._count.id
        if (c.tipoContato === 'reveal') empresa.reveal += count
        else if (c.tipoContato === 'telefone') empresa.telefone += count
        else if (c.tipoContato === 'whatsapp') empresa.whatsapp += count
        else if (c.tipoContato === 'email') empresa.email += count
        empresa.total += count
      }
    })

    // Processar dados dos prestadores
    const prestadoresMap = new Map<string, {
      id: string
      nome: string
      tipo: string
      reveal: number
      telefone: number
      whatsapp: number
      email: number
      total: number
    }>()

    prestadores.forEach(p => {
      prestadoresMap.set(p.id, {
        id: p.id,
        nome: p.nome,
        tipo: p.tipo,
        reveal: 0,
        telefone: 0,
        whatsapp: 0,
        email: 0,
        total: 0,
      })
    })

    cliquesPrestadores.forEach(c => {
      if (c.prestadorId && prestadoresMap.has(c.prestadorId)) {
        const prestador = prestadoresMap.get(c.prestadorId)!
        const count = c._count.id
        if (c.tipoContato === 'reveal') prestador.reveal += count
        else if (c.tipoContato === 'telefone') prestador.telefone += count
        else if (c.tipoContato === 'whatsapp') prestador.whatsapp += count
        else if (c.tipoContato === 'email') prestador.email += count
        prestador.total += count
      }
    })

    // Buscar cliques por dia para gráfico
    const cliquesPorDia = await prisma.cliqueContato.groupBy({
      by: ['createdAt'],
      where: {
        createdAt: { gte: dataInicio },
      },
      _count: { id: true },
    })

    // Agrupar por data (dia)
    const cliquesAgrupados = new Map<string, number>()
    cliquesPorDia.forEach(c => {
      const data = c.createdAt.toISOString().split('T')[0]
      cliquesAgrupados.set(data, (cliquesAgrupados.get(data) || 0) + c._count.id)
    })

    // Gerar array de datas do período
    const diasArray: { data: string; cliques: number }[] = []
    for (let i = dias - 1; i >= 0; i--) {
      const d = new Date()
      d.setDate(d.getDate() - i)
      const dataStr = d.toISOString().split('T')[0]
      diasArray.push({
        data: dataStr,
        cliques: cliquesAgrupados.get(dataStr) || 0,
      })
    }

    // Totais gerais
    const totalCliques = await prisma.cliqueContato.count({
      where: { createdAt: { gte: dataInicio } },
    })

    const totalReveal = await prisma.cliqueContato.count({
      where: { createdAt: { gte: dataInicio }, tipoContato: 'reveal' },
    })

    const totalWhatsapp = await prisma.cliqueContato.count({
      where: { createdAt: { gte: dataInicio }, tipoContato: 'whatsapp' },
    })

    const totalTelefone = await prisma.cliqueContato.count({
      where: { createdAt: { gte: dataInicio }, tipoContato: 'telefone' },
    })

    const totalEmail = await prisma.cliqueContato.count({
      where: { createdAt: { gte: dataInicio }, tipoContato: 'email' },
    })

    // Filtrar e ordenar resultados
    let empresasResult = Array.from(empresasMap.values())
      .filter(e => tipo === 'todos' || tipo === 'empresas')
      .sort((a, b) => b.total - a.total)

    let prestadoresResult = Array.from(prestadoresMap.values())
      .filter(p => tipo === 'todos' || tipo === 'prestadores')
      .sort((a, b) => b.total - a.total)

    return NextResponse.json({
      periodo: dias,
      dataInicio: dataInicio.toISOString(),
      totais: {
        cliques: totalCliques,
        reveal: totalReveal,
        whatsapp: totalWhatsapp,
        telefone: totalTelefone,
        email: totalEmail,
      },
      porDia: diasArray,
      empresas: empresasResult,
      prestadores: prestadoresResult,
    })
  } catch (error) {
    console.error('Erro ao buscar analytics:', error)
    return NextResponse.json({ error: 'Erro ao buscar analytics' }, { status: 500 })
  }
}
