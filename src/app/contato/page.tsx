import { Metadata } from 'next'
import { Mail, Phone, MapPin, MessageSquare, Shield, Building2 } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Contato | Amor Patas',
  description: 'Entre em contato com o Amor Patas. Tire dúvidas, faça sugestões, solicite remoção de dados ou reivindique seu cadastro.',
}

const contactOptions = [
  {
    icon: MessageSquare,
    title: 'Dúvidas Gerais',
    description: 'Perguntas sobre a plataforma, como funciona, sugestões de melhorias.',
    email: 'admfernandoth@gmail.com',
    subject: '[Dúvida] ',
  },
  {
    icon: Shield,
    title: 'Privacidade e LGPD',
    description: 'Solicitações de acesso, correção ou exclusão de dados pessoais conforme a LGPD.',
    email: 'admfernandoth@gmail.com',
    subject: '[LGPD] ',
  },
  {
    icon: Building2,
    title: 'Estabelecimentos',
    description: 'Atualização de informações, remoção de cadastro ou reivindicação de perfil.',
    email: 'admfernandoth@gmail.com',
    subject: '[Estabelecimento] ',
  },
]

export default function ContatoPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="bg-white rounded-2xl shadow-sm p-8 md:p-12">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            Fale Conosco
          </h1>
          <p className="text-gray-500 mb-8">
            Estamos aqui para ajudar. Escolha o assunto mais adequado para sua mensagem.
          </p>

          {/* Opções de Contato */}
          <div className="grid gap-6 mb-12">
            {contactOptions.map((option) => (
              <div
                key={option.title}
                className="border border-gray-200 rounded-xl p-6 hover:border-primary/50 hover:shadow-md transition-all"
              >
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-primary/10 rounded-full">
                    <option.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">
                      {option.title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-3">
                      {option.description}
                    </p>
                    <a
                      href={`mailto:${option.email}?subject=${encodeURIComponent(option.subject)}`}
                      className="inline-flex items-center gap-2 text-primary hover:text-primary/80 font-medium text-sm transition-colors"
                    >
                      <Mail size={16} />
                      Enviar email
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Informações Diretas */}
          <div className="border-t border-gray-200 pt-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">
              Informações de Contato
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-gray-100 rounded-lg">
                  <Mail size={20} className="text-gray-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">Email</p>
                  <a
                    href="mailto:admfernandoth@gmail.com"
                    className="text-sm text-gray-600 hover:text-primary transition-colors"
                  >
                    admfernandoth@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2 bg-gray-100 rounded-lg">
                  <Phone size={20} className="text-gray-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">Telefone</p>
                  <a
                    href="tel:+5566996691709"
                    className="text-sm text-gray-600 hover:text-primary transition-colors"
                  >
                    (66) 99669-1709
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2 bg-gray-100 rounded-lg">
                  <MapPin size={20} className="text-gray-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">Localização</p>
                  <p className="text-sm text-gray-600">
                    Três Lagoas-MS e região
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Seção LGPD */}
          <div className="mt-8 bg-blue-50 border border-blue-200 rounded-xl p-6">
            <div className="flex items-start gap-3">
              <Shield className="w-6 h-6 text-blue-600 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-semibold text-blue-900 mb-2">
                  Seus Direitos (LGPD)
                </h3>
                <p className="text-sm text-blue-800 mb-3">
                  Conforme a Lei Geral de Proteção de Dados (Lei nº 13.709/2018), você tem direito a:
                </p>
                <ul className="text-sm text-blue-800 space-y-1">
                  <li>• Confirmar se tratamos seus dados pessoais</li>
                  <li>• Acessar seus dados pessoais</li>
                  <li>• Solicitar correção de dados incompletos ou desatualizados</li>
                  <li>• Solicitar exclusão ou anonimização de dados</li>
                  <li>• Revogar consentimento a qualquer momento</li>
                </ul>
                <p className="text-sm text-blue-800 mt-3">
                  Para exercer esses direitos, envie um email para{' '}
                  <a
                    href="mailto:admfernandoth@gmail.com?subject=[LGPD] Solicitação de Titular"
                    className="font-medium underline hover:text-blue-600"
                  >
                    admfernandoth@gmail.com
                  </a>{' '}
                  com o assunto &quot;[LGPD] Solicitação de Titular&quot;. Responderemos em até 15 dias úteis.
                </p>
              </div>
            </div>
          </div>

          {/* Prazo de Resposta */}
          <div className="mt-8 text-center">
            <p className="text-sm text-gray-500">
              Prazo de resposta: até <strong>15 dias úteis</strong> para solicitações gerais
              <br />
              e conforme prazos legais para solicitações LGPD.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
