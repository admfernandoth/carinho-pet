import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { isAuthenticated } from '@/lib/auth'
import { logUnauthorizedAccess, logAudit, AuditActions } from '@/lib/audit'
import { z } from 'zod'

const patchAvaliacaoSchema = z.object({
  aprovada: z.boolean(),
})

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  // Verificar autenticação
  if (!(await isAuthenticated())) {
    await logUnauthorizedAccess(request, '/api/avaliacoes/[id]')
    return NextResponse.json({ error: 'Não autorizado' }, { status: 401 })
  }

  try {
    const { id } = await params
    const body = await request.json()

    // Validar input
    const validation = patchAvaliacaoSchema.safeParse(body)
    if (!validation.success) {
      return NextResponse.json({ error: 'Dados inválidos' }, { status: 400 })
    }

    const avaliacao = await prisma.avaliacao.update({
      where: { id },
      data: { aprovada: validation.data.aprovada },
    })

    // Log de auditoria
    await logAudit({
      action: validation.data.aprovada ? AuditActions.AVALIACAO_APPROVED : AuditActions.AVALIACAO_REJECTED,
      path: '/api/avaliacoes/' + id,
      ip: request.headers.get('x-forwarded-for') || 'unknown',
      details: { avaliacaoId: id },
      success: true,
    })

    return NextResponse.json(avaliacao)
  } catch (error) {
    console.error('Erro ao atualizar avaliação:', error)
    return NextResponse.json(
      { error: 'Erro ao atualizar avaliação' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  // Verificar autenticação
  if (!(await isAuthenticated())) {
    await logUnauthorizedAccess(request, '/api/avaliacoes/[id]')
    return NextResponse.json({ error: 'Não autorizado' }, { status: 401 })
  }

  try {
    const { id } = await params

    await prisma.avaliacao.delete({
      where: { id },
    })

    // Log de auditoria
    await logAudit({
      action: 'AVALIACAO_DELETED',
      path: '/api/avaliacoes/' + id,
      ip: request.headers.get('x-forwarded-for') || 'unknown',
      details: { avaliacaoId: id },
      success: true,
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Erro ao excluir avaliação:', error)
    return NextResponse.json(
      { error: 'Erro ao excluir avaliação' },
      { status: 500 }
    )
  }
}
