import { Search, Star, Phone } from 'lucide-react'

const steps = [
  {
    icon: Search,
    title: 'Busque',
    description: 'Encontre pet shops, clínicas e profissionais próximos a você',
  },
  {
    icon: Star,
    title: 'Compare',
    description: 'Veja avaliações, fotos e informações detalhadas de cada estabelecimento',
  },
  {
    icon: Phone,
    title: 'Contate',
    description: 'Entre em contato diretamente pelo telefone ou WhatsApp',
  },
]

export function HowItWorks() {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Como Funciona
          </h2>
          <p className="text-lg text-gray-600">
            Simples, rápido e gratuito
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {steps.map((step, index) => (
            <div key={step.title} className="text-center relative">
              {/* Connector line */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-10 left-[60%] w-[80%] h-0.5 bg-gray-200" />
              )}

              <div className="relative">
                <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <step.icon className="w-10 h-10 text-primary" />
                </div>
                <span className="absolute -top-2 -right-2 w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center font-bold text-sm">
                  {index + 1}
                </span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{step.title}</h3>
              <p className="text-gray-600">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
