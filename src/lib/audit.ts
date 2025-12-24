import { prisma } from './db'
import { getClientIP } from './security'

export interface AuditLogEntry {
  userId?: string
  action: string
  path: string
  ip: string
  userAgent?: string
  details?: Record<string, unknown>
  success: boolean
}

// Ações de auditoria predefinidas
export const AuditActions = {
  LOGIN_SUCCESS: 'LOGIN_SUCCESS',
  LOGIN_FAILED: 'LOGIN_FAILED',
  LOGOUT: 'LOGOUT',
  EMPRESA_CREATED: 'EMPRESA_CREATED',
  EMPRESA_UPDATED: 'EMPRESA_UPDATED',
  EMPRESA_DELETED: 'EMPRESA_DELETED',
  PRESTADOR_CREATED: 'PRESTADOR_CREATED',
  PRESTADOR_UPDATED: 'PRESTADOR_UPDATED',
  PRESTADOR_DELETED: 'PRESTADOR_DELETED',
  AVALIACAO_CREATED: 'AVALIACAO_CREATED',
  AVALIACAO_APPROVED: 'AVALIACAO_APPROVED',
  AVALIACAO_REJECTED: 'AVALIACAO_REJECTED',
  RATE_LIMIT_EXCEEDED: 'RATE_LIMIT_EXCEEDED',
  CSRF_VALIDATION_FAILED: 'CSRF_VALIDATION_FAILED',
  UNAUTHORIZED_ACCESS: 'UNAUTHORIZED_ACCESS',
} as const

export type AuditAction = (typeof AuditActions)[keyof typeof AuditActions]

// Log em memória para quando não houver banco disponível
const inMemoryLogs: AuditLogEntry[] = []
const MAX_MEMORY_LOGS = 1000

// Registrar log de auditoria
export async function logAudit(entry: AuditLogEntry): Promise<void> {
  const logEntry = {
    ...entry,
    timestamp: new Date().toISOString(),
  }

  // Log no console em desenvolvimento
  if (process.env.NODE_ENV === 'development') {
    console.log('[AUDIT]', JSON.stringify(logEntry, null, 2))
  }

  // Armazenar em memória como fallback
  inMemoryLogs.push(entry)
  if (inMemoryLogs.length > MAX_MEMORY_LOGS) {
    inMemoryLogs.shift() // Remove o mais antigo
  }

  // Opcional: salvar no banco de dados se tiver tabela de auditoria
  // Por enquanto, apenas log em memória e console
}

// Registrar tentativa de login
export async function logLoginAttempt(
  request: Request,
  email: string,
  success: boolean
): Promise<void> {
  const ip = getClientIP(request)
  const userAgent = request.headers.get('user-agent') || undefined

  await logAudit({
    action: success ? AuditActions.LOGIN_SUCCESS : AuditActions.LOGIN_FAILED,
    path: '/api/auth/login',
    ip,
    userAgent,
    details: { email: email.substring(0, 3) + '***' }, // Ofuscar email
    success,
  })
}

// Registrar acesso não autorizado
export async function logUnauthorizedAccess(request: Request, path: string): Promise<void> {
  const ip = getClientIP(request)
  const userAgent = request.headers.get('user-agent') || undefined

  await logAudit({
    action: AuditActions.UNAUTHORIZED_ACCESS,
    path,
    ip,
    userAgent,
    success: false,
  })
}

// Registrar rate limit excedido
export async function logRateLimitExceeded(request: Request, path: string): Promise<void> {
  const ip = getClientIP(request)

  await logAudit({
    action: AuditActions.RATE_LIMIT_EXCEEDED,
    path,
    ip,
    success: false,
  })
}

// Obter logs recentes (para admin)
export function getRecentLogs(limit: number = 100): AuditLogEntry[] {
  return inMemoryLogs.slice(-limit).reverse()
}

// Limpar logs antigos
export function clearOldLogs(olderThanHours: number = 24): number {
  const cutoff = Date.now() - olderThanHours * 60 * 60 * 1000
  const initialLength = inMemoryLogs.length

  // Filtrar logs mais recentes que o cutoff
  const recentLogs = inMemoryLogs.filter((log) => {
    // Como não temos timestamp no tipo, mantemos todos por enquanto
    return true
  })

  inMemoryLogs.length = 0
  inMemoryLogs.push(...recentLogs)

  return initialLength - inMemoryLogs.length
}
