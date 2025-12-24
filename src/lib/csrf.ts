import { cookies } from 'next/headers'
import { randomBytes, createHash } from 'crypto'

const CSRF_COOKIE_NAME = 'csrf_token'
const CSRF_HEADER_NAME = 'x-csrf-token'
const TOKEN_EXPIRY = 60 * 60 * 1000 // 1 hora

interface CSRFToken {
  token: string
  expires: number
}

// Gerar token CSRF
export function generateCSRFToken(): string {
  return randomBytes(32).toString('hex')
}

// Hash do token para comparação segura
export function hashToken(token: string): string {
  return createHash('sha256').update(token).digest('hex')
}

// Definir cookie CSRF
export async function setCSRFCookie(): Promise<string> {
  const token = generateCSRFToken()
  const cookieStore = await cookies()

  cookieStore.set(CSRF_COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: TOKEN_EXPIRY / 1000,
    path: '/',
  })

  return token
}

// Verificar token CSRF
export async function verifyCSRFToken(request: Request): Promise<boolean> {
  try {
    const cookieStore = await cookies()
    const cookieToken = cookieStore.get(CSRF_COOKIE_NAME)?.value

    if (!cookieToken) {
      return false
    }

    // Token pode vir do header ou do body
    const headerToken = request.headers.get(CSRF_HEADER_NAME)

    if (headerToken) {
      return headerToken === cookieToken
    }

    // Tentar extrair do body se for JSON
    const contentType = request.headers.get('content-type')
    if (contentType?.includes('application/json')) {
      const body = await request.clone().json()
      if (body._csrf) {
        return body._csrf === cookieToken
      }
    }

    return false
  } catch {
    return false
  }
}

// Middleware helper para APIs que precisam de CSRF
export async function requireCSRF(request: Request): Promise<{ valid: boolean; error?: string }> {
  const isValid = await verifyCSRFToken(request)

  if (!isValid) {
    return {
      valid: false,
      error: 'Token CSRF inválido ou expirado',
    }
  }

  return { valid: true }
}

// API route para obter novo token CSRF
export async function getCSRFTokenResponse(): Promise<Response> {
  const token = await setCSRFCookie()

  return new Response(JSON.stringify({ csrfToken: token }), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
    },
  })
}
