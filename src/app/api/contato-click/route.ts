import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { contatoClickSchema, validateData, getClientIP } from '@/lib/security'
import { apiRateLimiter, checkRateLimit } from '@/lib/rate-limit'

export async function POST(request: NextRequest) {
  const ip = getClientIP(request)

  try {
    // Rate limit básico para evitar spam (100 requisições por minuto por IP)
    const rateLimitResult = checkRateLimit(apiRateLimiter, 100, ip)
    if (!rateLimitResult.allowed) {
      return NextResponse.json(
        { error: 'Muitas requisições' },
        { status: 429, headers: rateLimitResult.headers }
      )
    }

    const body = await request.json()

    // Validar dados com Zod
    const validation = validateData(contatoClickSchema, body)
    if (!validation.success) {
      return NextResponse.json(
        { error: 'Dados inválidos' },
        { status: 400 }
      )
    }

    const { empresaId, prestadorId, tipoContato } = validation.data!
    const userAgent = request.headers.get('user-agent') || 'unknown'

    await prisma.cliqueContato.create({
      data: {
        tipoContato,
        empresaId: empresaId || null,
        prestadorId: prestadorId || null,
        ip,
        userAgent,
      },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Erro ao registrar clique:', error)
    return NextResponse.json({ error: 'Erro ao registrar clique' }, { status: 500 })
  }
}
