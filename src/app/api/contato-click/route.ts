import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { empresaId, prestadorId, tipoContato } = body

    const ip = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown'
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
