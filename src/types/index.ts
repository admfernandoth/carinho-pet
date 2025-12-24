export type TipoPrestador =
  | 'CUIDADOR'
  | 'ADESTRADOR'
  | 'PASSEADOR'
  | 'VETERINARIO'
  | 'TOSADOR'
  | 'BANHISTA'
  | 'HOTELZINHO'
  | 'OUTRO'

export type TipoEmpresa =
  | 'PETSHOP'
  | 'CLINICA_VETERINARIA'
  | 'HOSPITAL_VETERINARIO'
  | 'HOTEL_PET'
  | 'CRECHE_PET'
  | 'LOJA_RACAO'
  | 'OUTRO'

export interface Prestador {
  id: string
  nome: string
  slug: string
  tipo: TipoPrestador
  descricao: string
  foto: string
  fotos: string[]
  telefone: string
  whatsapp?: string
  email?: string
  instagram?: string
  cidade: string
  bairro?: string
  endereco?: string
  destaque: boolean
  ativo: boolean
  createdAt: Date
  updatedAt: Date
  avaliacoes?: Avaliacao[]
  _count?: {
    avaliacoes: number
    cliquesContato: number
  }
  mediaAvaliacoes?: number
}

export interface Empresa {
  id: string
  nome: string
  slug: string
  tipo: TipoEmpresa
  descricao: string
  logo: string
  fotos: string[]
  telefone: string
  whatsapp?: string
  email?: string
  website?: string
  instagram?: string
  cidade: string
  bairro?: string
  endereco: string
  horarioFunc?: string
  destaque: boolean
  ativo: boolean
  createdAt: Date
  updatedAt: Date
  avaliacoes?: Avaliacao[]
  _count?: {
    avaliacoes: number
    cliquesContato: number
  }
  mediaAvaliacoes?: number
}

export interface Avaliacao {
  id: string
  nota: number
  comentario?: string | null
  nomeAutor: string
  emailAutor?: string | null
  aprovada: boolean
  prestadorId?: string | null
  empresaId?: string | null
  createdAt: Date
}

export interface CliqueContato {
  id: string
  tipoContato: string
  prestadorId?: string
  empresaId?: string
  ip?: string
  userAgent?: string
  createdAt: Date
}

export const TIPO_PRESTADOR_LABELS: Record<TipoPrestador, string> = {
  CUIDADOR: 'Cuidador(a)',
  ADESTRADOR: 'Adestrador(a)',
  PASSEADOR: 'Passeador(a)',
  VETERINARIO: 'Veterinário(a)',
  TOSADOR: 'Tosador(a)',
  BANHISTA: 'Banhista',
  HOTELZINHO: 'Hotelzinho',
  OUTRO: 'Outro',
}

export const TIPO_EMPRESA_LABELS: Record<TipoEmpresa, string> = {
  PETSHOP: 'Pet Shop',
  CLINICA_VETERINARIA: 'Clínica Veterinária',
  HOSPITAL_VETERINARIO: 'Hospital Veterinário',
  HOTEL_PET: 'Hotel Pet',
  CRECHE_PET: 'Creche Pet',
  LOJA_RACAO: 'Loja de Ração',
  OUTRO: 'Outro',
}

export const TIPO_PRESTADOR_COLORS: Record<TipoPrestador, string> = {
  CUIDADOR: 'bg-green-500',
  ADESTRADOR: 'bg-blue-500',
  PASSEADOR: 'bg-purple-500',
  VETERINARIO: 'bg-red-500',
  TOSADOR: 'bg-pink-500',
  BANHISTA: 'bg-cyan-500',
  HOTELZINHO: 'bg-orange-500',
  OUTRO: 'bg-gray-500',
}

export const TIPO_EMPRESA_COLORS: Record<TipoEmpresa, string> = {
  PETSHOP: 'bg-purple-500',
  CLINICA_VETERINARIA: 'bg-blue-500',
  HOSPITAL_VETERINARIO: 'bg-red-500',
  HOTEL_PET: 'bg-orange-500',
  CRECHE_PET: 'bg-pink-500',
  LOJA_RACAO: 'bg-yellow-500',
  OUTRO: 'bg-gray-500',
}
