import Image from 'next/image'
import { Metadata } from 'next'
import { Heart, MapPin, Users, Building2 } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'

export const metadata: Metadata = {
  title: "Quem somos? Conheça o Amor Patas - Diretório de Serviços Pet",
  description: "O Amor Patas é o maior diretório gratuito de serviços pet em Três Lagoas-MS e região. Conectamos tutores de animais aos melhores profissionais e empresas num raio de 100km.",
  openGraph: {
    title: "Sobre o Amor Patas | Diretório de Serviços Pet",
    description: "Conheça nossa missão: facilitar a vida dos tutores de pets oferecendo um diretório completo, confiável e gratuito.",
  },
}

export default function SobrePage() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative py-20 bg-gradient-to-br from-primary/10 to-secondary/10">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Quem <span className="text-primary">Somos</span>
              </h1>
              <p className="text-lg text-gray-600 mb-6">
                O Amor Patas nasceu com um propósito simples: conectar tutores de animais aos melhores
                profissionais e empresas do ramo pet na região de Três Lagoas e cidades vizinhas.
              </p>
              <p className="text-lg text-gray-600">
                Acreditamos que todo pet merece o melhor cuidado, e que encontrar o profissional
                certo não deveria ser difícil. Por isso, criamos um diretório completo e gratuito
                para ajudar você a encontrar exatamente o que seu animal de estimação precisa.
              </p>
            </div>
            <div className="relative h-80 lg:h-96 rounded-2xl overflow-hidden shadow-xl">
              <Image
                src="/images/quem_somos.png"
                alt="Equipe Amor Patas - Conectando tutores de pets aos melhores profissionais da região de Três Lagoas"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Números */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <Card className="text-center">
              <CardContent className="pt-6">
                <Building2 className="w-10 h-10 text-primary mx-auto mb-3" />
                <p className="text-3xl font-bold text-gray-900">25+</p>
                <p className="text-gray-500">Empresas cadastradas</p>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="pt-6">
                <Users className="w-10 h-10 text-secondary mx-auto mb-3" />
                <p className="text-3xl font-bold text-gray-900">2+</p>
                <p className="text-gray-500">Prestadores de serviço</p>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="pt-6">
                <MapPin className="w-10 h-10 text-primary mx-auto mb-3" />
                <p className="text-3xl font-bold text-gray-900">7</p>
                <p className="text-gray-500">Cidades atendidas</p>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="pt-6">
                <Heart className="w-10 h-10 text-red-500 mx-auto mb-3" />
                <p className="text-3xl font-bold text-gray-900">100km</p>
                <p className="text-gray-500">Raio de cobertura</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Região */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-4">
            Nossa Região de Atuação
          </h2>
          <p className="text-lg text-gray-600 text-center mb-12 max-w-2xl mx-auto">
            Cobrimos Três Lagoas-MS e todas as cidades num raio de aproximadamente 100km
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {[
              { cidade: 'Três Lagoas-MS', distancia: 'Centro', destaque: true },
              { cidade: 'Andradina-SP', distancia: '41km' },
              { cidade: 'Castilho-SP', distancia: '31km' },
              { cidade: 'Ilha Solteira-SP', distancia: '68km' },
              { cidade: 'Brasilândia-MS', distancia: '70km' },
              { cidade: 'Selvíria-MS', distancia: '~80km' },
              { cidade: 'Mirandópolis-SP', distancia: '86km' },
            ].map((local) => (
              <Card key={local.cidade} className={local.destaque ? 'border-primary bg-primary/5' : ''}>
                <CardContent className="p-4">
                  <p className="font-semibold text-gray-900">{local.cidade}</p>
                  <p className="text-sm text-gray-500">{local.distancia}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Missão */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 max-w-3xl text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Nossa Missão</h2>
          <p className="text-lg text-gray-600 mb-8">
            Facilitar a vida dos tutores de pets, oferecendo um diretório completo,
            confiável e gratuito de serviços pet na região de Três Lagoas.
            Queremos que você encontre o melhor cuidado para seu animal de estimação
            de forma rápida e segura.
          </p>
          <div className="flex items-center justify-center gap-2 text-primary">
            <Heart className="fill-current" />
            <span className="font-semibold">Feito com amor para amantes de pets</span>
            <Heart className="fill-current" />
          </div>
        </div>
      </section>
    </div>
  )
}
