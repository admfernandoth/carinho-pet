import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'
import { logUnauthorizedAccess } from './audit'

const SESSION_MAX_AGE = 7 * 24 * 60 * 60 * 1000 // 7 dias em ms

export async function isAuthenticated(): Promise<boolean> {
  const cookieStore = await cookies()
  const session = cookieStore.get('admin_session')

  if (!session?.value) {
    return false
  }

  // Validar formato e expiração do token
  try {
    const decoded = Buffer.from(session.value, 'base64').toString()
    const [email, timestamp] = decoded.split(':')

    if (!email || !timestamp) {
      return false
    }

    // Verificar se a sessão expirou
    const sessionTime = parseInt(timestamp, 10)
    if (isNaN(sessionTime) || Date.now() - sessionTime > SESSION_MAX_AGE) {
      return false
    }

    return true
  } catch {
    return false
  }
}

export async function getSession() {
  const cookieStore = await cookies()
  const session = cookieStore.get('admin_session')

  if (!session?.value) {
    return null
  }

  try {
    const decoded = Buffer.from(session.value, 'base64').toString()
    const [email, timestamp] = decoded.split(':')

    if (!email || !timestamp) {
      return null
    }

    // Verificar se a sessão expirou
    const sessionTime = parseInt(timestamp, 10)
    if (isNaN(sessionTime) || Date.now() - sessionTime > SESSION_MAX_AGE) {
      return null
    }

    return { email, createdAt: new Date(sessionTime) }
  } catch {
    return null
  }
}

// Wrapper para rotas de API que requerem autenticação
export async function withAuth(
  request: NextRequest,
  handler: () => Promise<NextResponse>
): Promise<NextResponse> {
  const authenticated = await isAuthenticated()

  if (!authenticated) {
    await logUnauthorizedAccess(request, request.nextUrl.pathname)
    return NextResponse.json(
      { error: 'Não autorizado' },
      { status: 401 }
    )
  }

  return handler()
}

// Limpar sessão (logout)
export async function clearSession(): Promise<void> {
  const cookieStore = await cookies()
  cookieStore.delete('admin_session')
}
