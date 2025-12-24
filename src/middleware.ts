import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Headers de segurança
const securityHeaders = {
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': 'DENY',
  'X-XSS-Protection': '1; mode=block',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Permissions-Policy': 'camera=(), microphone=(), geolocation=()',
}

// Rotas que requerem autenticação
const protectedRoutes = ['/admin', '/admin/analytics', '/admin/avaliacoes', '/admin/empresas', '/admin/prestadores']

// Rotas públicas do admin (login)
const publicAdminRoutes = ['/admin/login']

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Criar resposta
  let response: NextResponse

  // Verificar autenticação para rotas protegidas
  const isProtectedRoute = protectedRoutes.some(
    (route) => pathname === route || pathname.startsWith(route + '/')
  )
  const isPublicAdminRoute = publicAdminRoutes.includes(pathname)
  const sessionCookie = request.cookies.get('admin_session')

  if (isProtectedRoute && !isPublicAdminRoute && !sessionCookie) {
    // Redirecionar para login se não autenticado
    const loginUrl = new URL('/admin/login', request.url)
    loginUrl.searchParams.set('redirect', pathname)
    response = NextResponse.redirect(loginUrl)
  } else if (isPublicAdminRoute && sessionCookie) {
    // Redirecionar para dashboard se já autenticado
    response = NextResponse.redirect(new URL('/admin', request.url))
  } else {
    response = NextResponse.next()
  }

  // Aplicar headers de segurança
  Object.entries(securityHeaders).forEach(([key, value]) => {
    response.headers.set(key, value)
  })

  // CSP mais permissivo para desenvolvimento
  const csp = process.env.NODE_ENV === 'production'
    ? "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://pagead2.googlesyndication.com; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' data:; connect-src 'self' https://pagead2.googlesyndication.com;"
    : "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' data:; connect-src 'self';"

  response.headers.set('Content-Security-Policy', csp)

  return response
}

// Configurar quais rotas o middleware deve processar
export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     * - api routes (handled separately)
     */
    '/((?!_next/static|_next/image|favicon.ico|images|api).*)',
  ],
}
