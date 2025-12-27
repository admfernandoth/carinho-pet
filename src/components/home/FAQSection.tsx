'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'

const faqs = [
  {
    pergunta: "Quais tipos de serviços pet posso encontrar no Amor Patas?",
    resposta: "No Amor Patas você encontra pet shops, clínicas veterinárias, hospitais veterinários, hotéis pet, serviços de banho e tosa, adestradores de cães, cuidadores de pets, passeadores (dog walkers) e pet sitters. Todos os estabelecimentos e profissionais são da região de Três Lagoas-MS e cidades num raio de 100km."
  },
  {
    pergunta: "O Amor Patas é gratuito para usar?",
    resposta: "Sim, o Amor Patas é 100% gratuito para tutores de pets. Você pode pesquisar, ver contatos e avaliar empresas e profissionais sem nenhum custo. Nosso objetivo é facilitar a vida de quem ama animais conectando você aos melhores serviços da região."
  },
  {
    pergunta: "Quais cidades são atendidas pelo Amor Patas?",
    resposta: "Atendemos Três Lagoas-MS (centro) e todas as cidades num raio de aproximadamente 100km, incluindo: Andradina-SP (41km), Castilho-SP (31km), Ilha Solteira-SP (68km), Brasilândia-MS (70km), Selvíria-MS (~80km) e Mirandópolis-SP (86km)."
  },
  {
    pergunta: "Como posso avaliar um pet shop ou veterinário?",
    resposta: "Basta acessar a página do estabelecimento ou profissional e clicar no botão 'Deixar Avaliação'. Você informa seu nome, seleciona uma nota de 1 a 5 estrelas e pode deixar um comentário sobre sua experiência. Todas as avaliações passam por moderação antes de serem publicadas."
  },
  {
    pergunta: "Como cadastrar minha empresa ou serviço pet no Amor Patas?",
    resposta: "Se você tem um pet shop, clínica veterinária ou oferece serviços pet na região de Três Lagoas, entre em contato conosco pelo WhatsApp (66) 99669-1709 ou email admfernandoth@gmail.com. Analisaremos seu cadastro e incluiremos seu negócio no diretório."
  },
  {
    pergunta: "Onde encontrar veterinário 24 horas em Três Lagoas?",
    resposta: "Em Três Lagoas-MS há hospitais veterinários com atendimento de emergência. Consulte nossa lista de hospitais veterinários na seção de empresas, filtrando por 'Hospital Veterinário'. Recomendamos sempre ligar antes para confirmar a disponibilidade de atendimento emergencial."
  }
]

// Schema FAQPage para SEO
const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": faqs.map(faq => ({
    "@type": "Question",
    "name": faq.pergunta,
    "acceptedAnswer": {
      "@type": "Answer",
      "text": faq.resposta
    }
  }))
}

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <section className="py-16 bg-gray-50">
      {/* Schema FAQ */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-4">
            Perguntas Frequentes
          </h2>
          <p className="text-gray-600 text-center mb-10">
            Tire suas dúvidas sobre o Amor Patas e serviços pet na região
          </p>

          <div className="space-y-3">
            {faqs.map((faq, index) => (
              <Card
                key={index}
                className={`overflow-hidden transition-all ${openIndex === index ? 'ring-2 ring-primary/20' : ''}`}
              >
                <button
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  className="w-full text-left p-5 flex items-center justify-between gap-4 hover:bg-gray-50 transition-colors"
                >
                  <h3 className="font-medium text-gray-900 pr-4">
                    {faq.pergunta}
                  </h3>
                  <ChevronDown
                    className={`w-5 h-5 text-gray-500 flex-shrink-0 transition-transform ${openIndex === index ? 'rotate-180' : ''}`}
                  />
                </button>
                {openIndex === index && (
                  <CardContent className="pt-0 pb-5 px-5">
                    <p className="text-gray-600 leading-relaxed">
                      {faq.resposta}
                    </p>
                  </CardContent>
                )}
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
