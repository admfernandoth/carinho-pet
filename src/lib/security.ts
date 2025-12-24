import { z } from 'zod'

// Schemas de validação com Zod
export const loginSchema = z.object({
  email: z.string().email('Email inválido').min(1, 'Email é obrigatório'),
  password: z.string().min(6, 'Senha deve ter pelo menos 6 caracteres'),
})

export const avaliacaoSchema = z.object({
  nota: z.number().int().min(1).max(5),
  nomeAutor: z.string().min(2, 'Nome deve ter pelo menos 2 caracteres').max(100),
  comentario: z.string().max(1000).nullable().optional(),
  empresaId: z.string().optional().nullable(),
  prestadorId: z.string().optional().nullable(),
})

export const empresaSchema = z.object({
  nome: z.string().min(2).max(200),
  tipo: z.string().min(1),
  descricao: z.string().min(10).max(2000),
  telefone: z.string().min(8).max(20),
  whatsapp: z.string().max(20).optional().nullable(),
  email: z.string().email().optional().nullable(),
  instagram: z.string().max(100).optional().nullable(),
  website: z.string().url().optional().nullable(),
  cidade: z.string().min(2).max(100),
  bairro: z.string().max(100).optional().nullable(),
  endereco: z.string().min(5).max(300),
  horarioFunc: z.string().max(200).optional().nullable(),
  destaque: z.boolean().default(false),
})

export const prestadorSchema = z.object({
  nome: z.string().min(2).max(200),
  tipo: z.string().min(1),
  descricao: z.string().min(10).max(2000),
  telefone: z.string().min(8).max(20),
  whatsapp: z.string().max(20).optional().nullable(),
  email: z.string().email().optional().nullable(),
  instagram: z.string().max(100).optional().nullable(),
  cidade: z.string().min(2).max(100),
  bairro: z.string().max(100).optional().nullable(),
  endereco: z.string().max(300).optional().nullable(),
  destaque: z.boolean().default(false),
})

export const contatoClickSchema = z.object({
  tipoContato: z.enum(['reveal', 'whatsapp', 'telefone', 'email', 'instagram', 'website']),
  empresaId: z.string().optional().nullable(),
  prestadorId: z.string().optional().nullable(),
}).refine(
  (data) => data.empresaId || data.prestadorId,
  { message: 'É necessário informar empresaId ou prestadorId' }
)

// Tipos inferidos dos schemas
export type LoginInput = z.infer<typeof loginSchema>
export type AvaliacaoInput = z.infer<typeof avaliacaoSchema>
export type EmpresaInput = z.infer<typeof empresaSchema>
export type PrestadorInput = z.infer<typeof prestadorSchema>
export type ContatoClickInput = z.infer<typeof contatoClickSchema>

// Função utilitária para validar dados
export function validateData<T>(schema: z.ZodSchema<T>, data: unknown): { success: true; data: T } | { success: false; errors: string[] } {
  const result = schema.safeParse(data)

  if (result.success) {
    return { success: true, data: result.data }
  }

  const errors = result.error.issues.map((err) => `${err.path.join('.')}: ${err.message}`)
  return { success: false, errors }
}

// Sanitização básica de strings (prevenir XSS)
export function sanitizeString(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
}

// Validação de IP
export function isValidIP(ip: string): boolean {
  const ipv4Regex = /^(\d{1,3}\.){3}\d{1,3}$/
  const ipv6Regex = /^([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}$/
  return ipv4Regex.test(ip) || ipv6Regex.test(ip)
}

// Extrair IP da requisição
export function getClientIP(request: Request): string {
  const forwardedFor = request.headers.get('x-forwarded-for')
  if (forwardedFor) {
    const ips = forwardedFor.split(',').map(ip => ip.trim())
    return ips[0] || 'unknown'
  }

  const realIP = request.headers.get('x-real-ip')
  if (realIP) {
    return realIP
  }

  return 'unknown'
}
