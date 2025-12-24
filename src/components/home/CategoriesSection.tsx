import Link from 'next/link'
import {
  Stethoscope,
  Store,
  Dog,
  Scissors,
  Home,
  GraduationCap
} from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'

const categories = [
  {
    title: 'Pet Shops',
    description: 'Rações, acessórios e produtos',
    icon: Store,
    href: '/empresas?tipo=PETSHOP',
    color: 'bg-purple-500',
    count: '10+',
  },
  {
    title: 'Clínicas Veterinárias',
    description: 'Consultas e tratamentos',
    icon: Stethoscope,
    href: '/empresas?tipo=CLINICA_VETERINARIA',
    color: 'bg-blue-500',
    count: '8+',
  },
  {
    title: 'Hospitais 24h',
    description: 'Emergências e internações',
    icon: Home,
    href: '/empresas?tipo=HOSPITAL_VETERINARIO',
    color: 'bg-red-500',
    count: '3+',
  },
  {
    title: 'Banho e Tosa',
    description: 'Higiene e embelezamento',
    icon: Scissors,
    href: '/empresas?tipo=PETSHOP',
    color: 'bg-pink-500',
    count: '6+',
  },
  {
    title: 'Adestradores',
    description: 'Treinamento e comportamento',
    icon: GraduationCap,
    href: '/prestadores?tipo=ADESTRADOR',
    color: 'bg-cyan-500',
    count: '2+',
  },
  {
    title: 'Cuidadores',
    description: 'Passeios e hospedagem',
    icon: Dog,
    href: '/prestadores?tipo=CUIDADOR',
    color: 'bg-green-500',
    count: '2+',
  },
]

export function CategoriesSection() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Explore por Categoria
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Encontre exatamente o que seu pet precisa entre nossas diversas categorias de serviços
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map((category) => (
            <Link key={category.title} href={category.href}>
              <Card className="h-full hover:shadow-lg hover:-translate-y-1 transition-all duration-200 cursor-pointer group">
                <CardContent className="p-6 text-center">
                  <div className={`w-14 h-14 ${category.color} rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform`}>
                    <category.icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-1">{category.title}</h3>
                  <p className="text-xs text-gray-500 mb-2">{category.description}</p>
                  <span className="text-xs font-medium text-primary">{category.count} locais</span>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
