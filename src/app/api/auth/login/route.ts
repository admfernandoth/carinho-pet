import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import bcrypt from 'bcryptjs'
import { loginSchema, validateData, getClientIP } from '@/lib/security'
import { loginRateLimiter, checkRateLimit } from '@/lib/rate-limit'
import { logLoginAttempt, logRateLimitExceeded } from '@/lib/audit'

// Credenciais do admin (em produção, use variáveis de ambiente)
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'admfernandoth@gmail.com'
const ADMIN_PASSWORD_HASH = process.env.ADMIN_PASSWORD_HASH || bcrypt.hashSync('amorpatas2024', 10)

export async function POST(request: NextRequest) {
  const ip = getClientIP(request)

  try {
    // Verificar rate limit (5 tentativas por minuto por IP)
    const rateLimitResult = checkRateLimit(loginRateLimiter, 5, ip)
    if (!rateLimitResult.allowed) {
      await logRateLimitExceeded(request, '/api/auth/login')
      return NextResponse.json(
        { error: 'Muitas tentativas de login. Aguarde um momento.' },
        {
          status: 429,
          headers: rateLimitResult.headers,
        }
      )
    }

    // Validar dados de entrada com Zod
    const body = await request.json()
    const validation = validateData(loginSchema, body)

    if (!validation.success) {
      return NextResponse.json(
        { error: validation.errors?.join(', ') || 'Dados inválidos' },
        { status: 400 }
      )
    }

    const { email, password } = validation.data!

    // Verificar email
    if (email !== ADMIN_EMAIL) {
      await logLoginAttempt(request, email, false)
      return NextResponse.json(
        { error: 'Credenciais inválidas' },
        { status: 401 }
      )
    }

    // Verificar senha
    const isValidPassword = await bcrypt.compare(password, ADMIN_PASSWORD_HASH)
    if (!isValidPassword) {
      await logLoginAttempt(request, email, false)
      return NextResponse.json(
        { error: 'Credenciais inválidas' },
        { status: 401 }
      )
    }

    // Login bem-sucedido - registrar auditoria
    await logLoginAttempt(request, email, true)

    // Criar token de sessão simples
    const sessionToken = Buffer.from(`${email}:${Date.now()}`).toString('base64')

    // Definir cookie de sessão
    const cookieStore = await cookies()
    cookieStore.set('admin_session', sessionToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7, // 7 dias
      path: '/',
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Erro no login:', error)
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
}
