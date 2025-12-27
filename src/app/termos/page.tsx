import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Termos de Uso | Amor Patas',
  description: 'Termos de Uso do Amor Patas. Conheça as regras e condições para utilização da plataforma.',
}

export default function TermosPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="bg-white rounded-2xl shadow-sm p-8 md:p-12">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            Termos de Uso
          </h1>
          <p className="text-gray-500 mb-8">Última atualização: 24 de dezembro de 2024</p>

          <div className="prose prose-gray max-w-none">
            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">1. Aceitação dos Termos</h2>
              <p className="text-gray-600 mb-4">
                Ao acessar e usar o <strong>Amor Patas</strong> (&quot;plataforma&quot;, &quot;site&quot; ou &quot;serviço&quot;), você concorda
                em cumprir e estar vinculado a estes Termos de Uso. Se você não concordar com qualquer parte
                destes termos, não deve utilizar nossos serviços.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">2. Descrição do Serviço</h2>
              <p className="text-gray-600 mb-4">
                O Amor Patas é um <strong>diretório online gratuito</strong> de serviços pet que conecta
                tutores de animais a empresas e prestadores de serviços na região de Três Lagoas-MS
                e cidades vizinhas (raio de aproximadamente 100km).
              </p>
              <p className="text-gray-600">
                A plataforma oferece:
              </p>
              <ul className="list-disc pl-6 text-gray-600 space-y-1 mt-2">
                <li>Listagem de pet shops, clínicas veterinárias, hotéis pet e outros estabelecimentos</li>
                <li>Informações de contato dos estabelecimentos</li>
                <li>Sistema de avaliações por usuários</li>
                <li>Busca e filtros por categoria, cidade e nome</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">3. Isenção de Responsabilidade</h2>

              <h3 className="text-lg font-medium text-gray-800 mt-4 mb-2">3.1 Sobre os Estabelecimentos Listados</h3>
              <p className="text-gray-600 mb-4">
                O Amor Patas atua <strong>apenas como um diretório de informações</strong>. Não somos responsáveis por:
              </p>
              <ul className="list-disc pl-6 text-gray-600 space-y-1">
                <li>Qualidade dos serviços prestados pelos estabelecimentos</li>
                <li>Veracidade das informações fornecidas pelos estabelecimentos</li>
                <li>Preços, promoções ou condições comerciais</li>
                <li>Disponibilidade de atendimento</li>
                <li>Danos causados por serviços contratados através do diretório</li>
              </ul>

              <h3 className="text-lg font-medium text-gray-800 mt-4 mb-2">3.2 Sobre as Informações</h3>
              <p className="text-gray-600 mb-4">
                As informações dos estabelecimentos são obtidas de fontes públicas (Google, sites oficiais,
                redes sociais) ou fornecidas pelos próprios estabelecimentos. Recomendamos sempre confirmar
                as informações diretamente com o estabelecimento antes de visitá-lo.
              </p>

              <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mt-4">
                <p className="text-amber-800 text-sm">
                  <strong>Importante:</strong> O Amor Patas não realiza intermediação comercial, agendamentos
                  ou pagamentos. Toda negociação é feita diretamente entre o usuário e o estabelecimento.
                </p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">4. Avaliações de Usuários</h2>

              <h3 className="text-lg font-medium text-gray-800 mt-4 mb-2">4.1 Regras para Avaliações</h3>
              <p className="text-gray-600 mb-2">Ao enviar uma avaliação, você concorda que:</p>
              <ul className="list-disc pl-6 text-gray-600 space-y-1">
                <li>Utilizou ou conhece o serviço avaliado</li>
                <li>O conteúdo é verdadeiro e baseado em sua experiência</li>
                <li>Não contém linguagem ofensiva, discriminatória ou ilegal</li>
                <li>Não é spam, propaganda ou conteúdo promocional</li>
                <li>Não viola direitos de terceiros</li>
              </ul>

              <h3 className="text-lg font-medium text-gray-800 mt-4 mb-2">4.2 Moderação</h3>
              <p className="text-gray-600 mb-4">
                Todas as avaliações passam por moderação antes de serem publicadas. Reservamo-nos o direito
                de recusar, editar ou remover avaliações que violem estas regras, a nosso exclusivo critério.
              </p>

              <h3 className="text-lg font-medium text-gray-800 mt-4 mb-2">4.3 Responsabilidade</h3>
              <p className="text-gray-600">
                As avaliações são de <strong>responsabilidade exclusiva de seus autores</strong> e não representam
                a opinião do Amor Patas. Conforme o Marco Civil da Internet (Lei 12.965/2014), o provedor
                de aplicações não é responsável por conteúdo gerado por terceiros, exceto se não cumprir
                ordem judicial de remoção.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">5. Estabelecimentos Listados</h2>

              <h3 className="text-lg font-medium text-gray-800 mt-4 mb-2">5.1 Fonte das Informações</h3>
              <p className="text-gray-600 mb-4">
                As informações dos estabelecimentos são obtidas de fontes públicas ou fornecidas pelos
                próprios estabelecimentos. Se você é responsável por um estabelecimento listado, pode:
              </p>
              <ul className="list-disc pl-6 text-gray-600 space-y-1">
                <li>Solicitar atualização das informações</li>
                <li>Solicitar remoção do cadastro</li>
                <li>Reivindicar a gestão do perfil</li>
              </ul>

              <h3 className="text-lg font-medium text-gray-800 mt-4 mb-2">5.2 Solicitações</h3>
              <p className="text-gray-600">
                Solicitações devem ser enviadas para <strong>admfernandoth@gmail.com</strong> com comprovação
                de vínculo com o estabelecimento. Atenderemos em até 15 dias úteis.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">6. Propriedade Intelectual</h2>
              <p className="text-gray-600 mb-4">
                Todo o conteúdo original da plataforma (layout, código, textos, logotipo) é de propriedade
                do Amor Patas e está protegido por leis de propriedade intelectual.
              </p>
              <p className="text-gray-600">
                Os nomes, marcas e logotipos dos estabelecimentos listados pertencem a seus respectivos
                proprietários e são utilizados apenas para fins informativos.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">7. Uso Proibido</h2>
              <p className="text-gray-600 mb-2">É proibido:</p>
              <ul className="list-disc pl-6 text-gray-600 space-y-1">
                <li>Utilizar a plataforma para fins ilegais</li>
                <li>Coletar dados de forma automatizada (scraping) sem autorização</li>
                <li>Tentar acessar áreas restritas do sistema</li>
                <li>Publicar conteúdo falso, difamatório ou que viole direitos de terceiros</li>
                <li>Sobrecarregar nossos servidores com requisições excessivas</li>
                <li>Utilizar os dados dos estabelecimentos para spam ou marketing não solicitado</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">8. Limitação de Responsabilidade</h2>
              <p className="text-gray-600 mb-4">
                Na máxima extensão permitida por lei, o Amor Patas não será responsável por:
              </p>
              <ul className="list-disc pl-6 text-gray-600 space-y-1">
                <li>Danos diretos ou indiretos decorrentes do uso da plataforma</li>
                <li>Indisponibilidade temporária do serviço</li>
                <li>Erros ou imprecisões nas informações listadas</li>
                <li>Ações de terceiros (estabelecimentos ou usuários)</li>
                <li>Perda de dados ou lucros cessantes</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">9. Denúncias e Remoção de Conteúdo</h2>
              <p className="text-gray-600 mb-4">
                Se você identificar conteúdo que viole estes termos ou direitos de terceiros:
              </p>
              <ol className="list-decimal pl-6 text-gray-600 space-y-1">
                <li>Envie email para <strong>admfernandoth@gmail.com</strong></li>
                <li>Identifique o conteúdo específico (URL ou descrição)</li>
                <li>Explique a violação</li>
                <li>Forneça seus dados de contato</li>
              </ol>
              <p className="text-gray-600 mt-4">
                Analisaremos sua denúncia e tomaremos as providências cabíveis.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">10. Alterações nos Termos</h2>
              <p className="text-gray-600">
                Podemos modificar estes Termos de Uso a qualquer momento. Alterações significativas serão
                comunicadas na plataforma. O uso continuado após as alterações constitui aceitação dos novos termos.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">11. Legislação Aplicável</h2>
              <p className="text-gray-600">
                Estes Termos são regidos pelas leis da República Federativa do Brasil. Fica eleito o foro
                da Comarca de Três Lagoas-MS para dirimir quaisquer controvérsias, com renúncia a qualquer outro.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">12. Contato</h2>
              <p className="text-gray-600">
                Para dúvidas sobre estes Termos de Uso:
              </p>
              <p className="text-gray-600 mt-2">
                <strong>Email:</strong> admfernandoth@gmail.com<br />
                <strong>Assunto:</strong> [Termos] Sua dúvida
              </p>
            </section>

            <section className="mt-12 pt-8 border-t">
              <p className="text-gray-500 text-sm text-center">
                Ao utilizar o Amor Patas, você declara ter lido e concordado com estes Termos de Uso
                e com nossa <a href="/privacidade" className="text-primary hover:underline">Política de Privacidade</a>.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}
