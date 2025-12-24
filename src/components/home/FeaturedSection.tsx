import Link from 'next/link'
import { MapPin, Star, ArrowRight } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

const featuredEmpresas = [
  {
    nome: 'CRC Vet - Hospital Veterinário 24h',
    tipo: 'Hospital Veterinário',
    cidade: 'Três Lagoas-MS',
    descricao: 'Atendimento 24 horas, emergências, cirurgias e exames.',
    slug: 'crc-vet-hospital-veterinario-24h',
    badgeColor: 'vermelho' as const,
  },
  {
    nome: 'Diego Mazetti Clínica Veterinária',
    tipo: 'Clínica Veterinária',
    cidade: 'Três Lagoas-MS',
    descricao: 'Consultas, vacinações, cirurgias e internações.',
    slug: 'diego-mazetti-clinica-veterinaria',
    badgeColor: 'azul' as const,
  },
  {
    nome: 'Pet 3 Shower House',
    tipo: 'Clínica Veterinária',
    cidade: 'Três Lagoas-MS',
    descricao: 'Veterinário 24h, banho e tosa, hotel pet.',
    slug: 'pet-3-shower-house',
    badgeColor: 'azul' as const,
  },
  {
    nome: 'Mundo Pet',
    tipo: 'Pet Shop',
    cidade: 'Três Lagoas-MS',
    descricao: 'Rações premium, acessórios e medicamentos.',
    slug: 'mundo-pet-casa-de-racoes',
    badgeColor: 'roxo' as const,
  },
  {
    nome: 'Clínica Veterinária Petvida',
    tipo: 'Clínica Veterinária',
    cidade: 'Ilha Solteira-SP',
    descricao: 'Ultrassom, raio-x, fisioterapia e banho e tosa.',
    slug: 'clinica-veterinaria-petvida',
    badgeColor: 'azul' as const,
  },
  {
    nome: 'Andravet Pet Shop',
    tipo: 'Clínica Veterinária',
    cidade: 'Andradina-SP',
    descricao: 'Clínica completa com pet shop integrado.',
    slug: 'andravet-veterinaria-e-pet-shop',
    badgeColor: 'azul' as const,
  },
]

export function FeaturedSection() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Destaques da Região
            </h2>
            <p className="text-lg text-gray-600">
              Os estabelecimentos mais procurados em Três Lagoas e região
            </p>
          </div>
          <Link href="/empresas" className="hidden md:block">
            <Button variant="outline" className="gap-2">
              Ver todas <ArrowRight size={16} />
            </Button>
          </Link>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredEmpresas.map((empresa) => (
            <Link key={empresa.slug} href={`/empresas/${empresa.slug}`}>
              <Card className="h-full hover:shadow-lg hover:-translate-y-1 transition-all duration-200 cursor-pointer overflow-hidden group">
                <div className="h-40 bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                  <span className="text-6xl opacity-30">🐾</span>
                </div>
                <CardContent className="p-5">
                  <div className="flex items-start justify-between gap-2 mb-3">
                    <Badge variant={empresa.badgeColor}>{empresa.tipo}</Badge>
                    <div className="flex items-center text-amber-500">
                      <Star size={14} className="fill-current" />
                      <span className="text-xs ml-1 text-gray-600">Novo</span>
                    </div>
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-primary transition-colors line-clamp-1">
                    {empresa.nome}
                  </h3>
                  <p className="text-sm text-gray-500 mb-3 line-clamp-2">
                    {empresa.descricao}
                  </p>
                  <div className="flex items-center text-sm text-gray-400">
                    <MapPin size={14} className="mr-1" />
                    {empresa.cidade}
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        <div className="mt-8 text-center md:hidden">
          <Link href="/empresas">
            <Button variant="outline" className="gap-2">
              Ver todas as empresas <ArrowRight size={16} />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
