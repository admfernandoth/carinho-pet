import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { avaliacaoSchema, validateData, getClientIP, sanitizeString } from '@/lib/security'
import { apiRateLimiter, checkRateLimit } from '@/lib/rate-limit'
import { logRateLimitExceeded } from '@/lib/audit'

export async function POST(request: NextRequest) {
  const ip = getClientIP(request)

  try {
    // Verificar rate limit (10 avaliações por minuto por IP)
    const rateLimitResult = checkRateLimit(apiRateLimiter, 10, ip)
    if (!rateLimitResult.allowed) {
      await logRateLimitExceeded(request, '/api/avaliacoes')
      return NextResponse.json(
        { error: 'Muitas requisições. Aguarde um momento.' },
        { status: 429, headers: rateLimitResult.headers }
      )
    }

    const body = await request.json()

    // Validar dados com Zod
    const validation = validateData(avaliacaoSchema, body)
    if (!validation.success) {
      return NextResponse.json(
        { error: validation.errors?.join(', ') || 'Dados inválidos' },
        { status: 400 }
      )
    }

    const { nota, nomeAutor, comentario, empresaId, prestadorId } = validation.data!

    await prisma.avaliacao.create({
      data: {
        nota,
        nomeAutor: sanitizeString(nomeAutor),
        comentario: comentario ? sanitizeString(comentario) : null,
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
