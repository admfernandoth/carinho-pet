import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { nota, nomeAutor, comentario, empresaId, prestadorId } = body

    if (!nota || !nomeAutor) {
      return NextResponse.json({ error: 'Dados incompletos' }, { status: 400 })
    }

    await prisma.avaliacao.create({
      data: {
        nota,
        nomeAutor,
        comentario: comentario || null,
        empresaId: empresaId || null,
        prestadorId: prestadorId || null,
        aprovada: false,
      },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Erro ao criar avaliação:', error)
    return NextResponse.json({ error: 'Erro ao criar avaliação' }, { status: 500 })
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const empresaId = searchParams.get('empresaId')
    const prestadorId = searchParams.get('prestadorId')

    const avaliacoes = await prisma.avaliacao.findMany({
      where: {
        aprovada: true,
        ...(empresaId && { empresaId }),
        ...(prestadorId && { prestadorId }),
      },
      orderBy: { createdAt: 'desc' },
    })

    return NextResponse.json(avaliacoes)
  } catch (error) {
    console.error('Erro ao buscar avaliações:', error)
    return NextResponse.json({ error: 'Erro ao buscar avaliações' }, { status: 500 })
  }
}
