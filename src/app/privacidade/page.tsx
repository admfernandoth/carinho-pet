import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Política de Privacidade | Amor Patas',
  description: 'Política de Privacidade do Amor Patas. Saiba como coletamos, usamos e protegemos seus dados pessoais.',
}

export default function PrivacidadePage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="bg-white rounded-2xl shadow-sm p-8 md:p-12">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            Política de Privacidade
          </h1>
          <p className="text-gray-500 mb-8">Última atualização: 24 de dezembro de 2024</p>

          <div className="prose prose-gray max-w-none">
            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">1. Introdução</h2>
              <p className="text-gray-600 mb-4">
                O <strong>Amor Patas</strong> (&quot;nós&quot;, &quot;nosso&quot; ou &quot;plataforma&quot;) é um diretório online
                de serviços pet para a região de Três Lagoas-MS e cidades vizinhas. Esta Política de Privacidade
                descreve como coletamos, usamos, armazenamos e protegemos suas informações pessoais em conformidade
                com a Lei Geral de Proteção de Dados (LGPD - Lei nº 13.709/2018).
              </p>
              <p className="text-gray-600">
                Ao utilizar nossos serviços, você concorda com as práticas descritas nesta política.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">2. Controlador dos Dados</h2>
              <p className="text-gray-600 mb-2">
                <strong>Razão Social:</strong> Amor Patas<br />
                <strong>Email de contato:</strong> admfernandoth@gmail.com<br />
                <strong>Localização:</strong> Três Lagoas, Mato Grosso do Sul, Brasil
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">3. Dados que Coletamos</h2>

              <h3 className="text-lg font-medium text-gray-800 mt-4 mb-2">3.1 Dados de Navegação</h3>
              <ul className="list-disc pl-6 text-gray-600 space-y-1">
                <li>Endereço IP</li>
                <li>Tipo de navegador e dispositivo</li>
                <li>Páginas visitadas e tempo de permanência</li>
                <li>Data e hora de acesso</li>
              </ul>

              <h3 className="text-lg font-medium text-gray-800 mt-4 mb-2">3.2 Dados de Avaliações</h3>
              <p className="text-gray-600 mb-2">Quando você envia uma avaliação, coletamos:</p>
              <ul className="list-disc pl-6 text-gray-600 space-y-1">
                <li>Nome informado</li>
                <li>Nota (1 a 5 estrelas)</li>
                <li>Comentário (opcional)</li>
                <li>IP e data/hora do envio</li>
              </ul>

              <h3 className="text-lg font-medium text-gray-800 mt-4 mb-2">3.3 Dados de Empresas e Prestadores</h3>
              <p className="text-gray-600">
                As informações de empresas e prestadores listados foram obtidas de <strong>fontes públicas</strong>
                (Google Meu Negócio, sites oficiais, redes sociais) ou fornecidas diretamente pelos estabelecimentos.
              </p>

              <h3 className="text-lg font-medium text-gray-800 mt-4 mb-2">3.4 Cookies</h3>
              <p className="text-gray-600">
                Utilizamos cookies para melhorar sua experiência, incluindo cookies de sessão e preferências.
                Você pode gerenciar suas preferências de cookies nas configurações do navegador.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">4. Finalidades do Tratamento</h2>
              <p className="text-gray-600 mb-2">Utilizamos seus dados para:</p>
              <ul className="list-disc pl-6 text-gray-600 space-y-1">
                <li>Fornecer e melhorar nossos serviços de diretório</li>
                <li>Exibir avaliações de estabelecimentos</li>
                <li>Gerar estatísticas de uso (analytics)</li>
                <li>Prevenir fraudes e abusos (rate limiting)</li>
                <li>Cumprir obrigações legais</li>
                <li>Exibir anúncios relevantes (Google AdSense)</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">5. Base Legal (LGPD Art. 7º)</h2>
              <table className="w-full text-sm text-gray-600 border-collapse">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-2 font-medium">Tratamento</th>
                    <th className="text-left py-2 font-medium">Base Legal</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b">
                    <td className="py-2">Dados de navegação</td>
                    <td className="py-2">Legítimo interesse</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2">Avaliações</td>
                    <td className="py-2">Consentimento</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2">Dados de empresas (públicos)</td>
                    <td className="py-2">Dados manifestamente públicos (Art. 7º, §4º)</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2">Cookies essenciais</td>
                    <td className="py-2">Legítimo interesse</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2">Cookies de analytics/publicidade</td>
                    <td className="py-2">Consentimento</td>
                  </tr>
                </tbody>
              </table>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">6. Compartilhamento de Dados</h2>
              <p className="text-gray-600 mb-2">Podemos compartilhar dados com:</p>
              <ul className="list-disc pl-6 text-gray-600 space-y-1">
                <li><strong>Vercel:</strong> Hospedagem da plataforma</li>
                <li><strong>Google:</strong> Analytics e AdSense</li>
                <li><strong>Autoridades:</strong> Quando exigido por lei ou ordem judicial</li>
              </ul>
              <p className="text-gray-600 mt-2">
                Não vendemos seus dados pessoais a terceiros.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">7. Retenção de Dados</h2>
              <ul className="list-disc pl-6 text-gray-600 space-y-1">
                <li><strong>Logs de acesso:</strong> 6 meses (conforme Marco Civil da Internet)</li>
                <li><strong>Avaliações:</strong> Enquanto o estabelecimento estiver ativo ou até solicitação de remoção</li>
                <li><strong>Dados de empresas:</strong> Até solicitação de remoção pelo responsável</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">8. Seus Direitos (LGPD Art. 18)</h2>
              <p className="text-gray-600 mb-2">Você tem direito a:</p>
              <ul className="list-disc pl-6 text-gray-600 space-y-1">
                <li>Confirmar a existência de tratamento de seus dados</li>
                <li>Acessar seus dados pessoais</li>
                <li>Corrigir dados incompletos ou desatualizados</li>
                <li>Solicitar anonimização, bloqueio ou eliminação</li>
                <li>Revogar consentimento a qualquer momento</li>
                <li>Solicitar portabilidade dos dados</li>
              </ul>
              <p className="text-gray-600 mt-4">
                Para exercer seus direitos, entre em contato pelo email: <strong>admfernandoth@gmail.com</strong>
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">9. Segurança</h2>
              <p className="text-gray-600">
                Implementamos medidas técnicas e organizacionais para proteger seus dados, incluindo:
              </p>
              <ul className="list-disc pl-6 text-gray-600 space-y-1 mt-2">
                <li>Criptografia em trânsito (HTTPS/TLS)</li>
                <li>Controle de acesso ao painel administrativo</li>
                <li>Rate limiting para prevenir abusos</li>
                <li>Sanitização de dados de entrada</li>
                <li>Logs de auditoria</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">10. Estabelecimentos Listados</h2>
              <p className="text-gray-600 mb-4">
                Se você é responsável por um estabelecimento listado em nossa plataforma e deseja:
              </p>
              <ul className="list-disc pl-6 text-gray-600 space-y-1">
                <li><strong>Atualizar informações:</strong> Entre em contato conosco</li>
                <li><strong>Remover seu cadastro:</strong> Envie solicitação por email</li>
                <li><strong>Reivindicar seu cadastro:</strong> Comprove ser o responsável</li>
              </ul>
              <p className="text-gray-600 mt-2">
                Atenderemos sua solicitação em até 15 dias úteis.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">11. Alterações nesta Política</h2>
              <p className="text-gray-600">
                Podemos atualizar esta política periodicamente. Alterações significativas serão comunicadas
                na plataforma. Recomendamos revisar esta página regularmente.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">12. Contato</h2>
              <p className="text-gray-600">
                Para dúvidas, solicitações ou reclamações relacionadas à privacidade:
              </p>
              <p className="text-gray-600 mt-2">
                <strong>Email:</strong> admfernandoth@gmail.com<br />
                <strong>Assunto:</strong> [LGPD] Sua solicitação
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}
