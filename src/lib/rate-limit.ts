import { LRUCache } from 'lru-cache'

interface RateLimitOptions {
  interval: number // em milissegundos
  uniqueTokenPerInterval: number // número máximo de usuários únicos por intervalo
}

interface RateLimitResult {
  success: boolean
  limit: number
  remaining: number
  reset: number
}

// Cache LRU para armazenar tentativas por IP
const rateLimitCache = new LRUCache<string, number[]>({
  max: 500, // máximo de 500 IPs únicos
  ttl: 60 * 1000, // TTL de 1 minuto
})

export function rateLimit(options: RateLimitOptions) {
  const { interval, uniqueTokenPerInterval } = options

  return {
    check: (limit: number, token: string): RateLimitResult => {
      const now = Date.now()
      const windowStart = now - interval

      // Obter timestamps existentes para este token
      const tokenTimestamps = rateLimitCache.get(token) || []

      // Filtrar timestamps dentro da janela atual
      const validTimestamps = tokenTimestamps.filter((timestamp) => timestamp > windowStart)

      // Adicionar timestamp atual
      validTimestamps.push(now)

      // Atualizar cache
      rateLimitCache.set(token, validTimestamps)

      const currentCount = validTimestamps.length
      const isRateLimited = currentCount > limit

      return {
        success: !isRateLimited,
        limit,
        remaining: Math.max(0, limit - currentCount),
        reset: Math.ceil((windowStart + interval) / 1000),
      }
    },
  }
}

// Rate limiter pré-configurado para login (5 tentativas por minuto)
export const loginRateLimiter = rateLimit({
  interval: 60 * 1000, // 1 minuto
  uniqueTokenPerInterval: 500,
})

// Rate limiter para APIs gerais (100 requisições por minuto)
export const apiRateLimiter = rateLimit({
  interval: 60 * 1000,
  uniqueTokenPerInterval: 500,
})

// Rate limiter para avaliações (10 por hora por IP)
export const reviewRateLimiter = rateLimit({
  interval: 60 * 60 * 1000, // 1 hora
  uniqueTokenPerInterval: 500,
})

// Função utilitária para aplicar rate limiting em rotas
export function checkRateLimit(
  limiter: ReturnType<typeof rateLimit>,
  limit: number,
  identifier: string
): { allowed: boolean; headers: Record<string, string> } {
  const result = limiter.check(limit, identifier)

  const headers: Record<string, string> = {
    'X-RateLimit-Limit': String(result.limit),
    'X-RateLimit-Remaining': String(result.remaining),
    'X-RateLimit-Reset': String(result.reset),
  }

  if (!result.success) {
    headers['Retry-After'] = String(Math.ceil((result.reset * 1000 - Date.now()) / 1000))
  }

  return {
    allowed: result.success,
    headers,
  }
}
