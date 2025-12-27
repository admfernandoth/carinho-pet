import Link from 'next/link'
import { Heart, Phone, Mail, MapPin } from 'lucide-react'

export function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Descrição */}
          <div className="md:col-span-1">
            <h3 className="font-semibold text-white mb-4">Amor Patas</h3>
            <p className="text-sm text-gray-400">
              Encontre os melhores profissionais e empresas para cuidar do seu pet com todo o carinho que ele merece.
            </p>
          </div>

          {/* Links rápidos */}
          <div>
            <h3 className="font-semibold text-white mb-4">Links Rápidos</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="hover:text-white transition-colors">
                  Início
                </Link>
              </li>
              <li>
                <Link href="/empresas" className="hover:text-white transition-colors">
                  Empresas
                </Link>
              </li>
              <li>
                <Link href="/prestadores" className="hover:text-white transition-colors">
                  Prestadores
                </Link>
              </li>
              <li>
                <Link href="/sobre" className="hover:text-white transition-colors">
                  Sobre Nós
                </Link>
              </li>
              <li>
                <Link href="/contato" className="hover:text-white transition-colors">
                  Contato
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-semibold text-white mb-4">Legal</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/termos" className="hover:text-white transition-colors">
                  Termos de Uso
                </Link>
              </li>
              <li>
                <Link href="/privacidade" className="hover:text-white transition-colors">
                  Política de Privacidade
                </Link>
              </li>
            </ul>
          </div>

          {/* Categorias */}
          <div>
            <h3 className="font-semibold text-white mb-4">Categorias</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/empresas?tipo=PETSHOP" className="hover:text-white transition-colors">
                  Pet Shops
                </Link>
              </li>
              <li>
                <Link href="/empresas?tipo=CLINICA_VETERINARIA" className="hover:text-white transition-colors">
                  Clínicas Veterinárias
                </Link>
              </li>
              <li>
                <Link href="/prestadores?tipo=ADESTRADOR" className="hover:text-white transition-colors">
                  Adestradores
                </Link>
              </li>
              <li>
                <Link href="/prestadores?tipo=CUIDADOR" className="hover:text-white transition-colors">
                  Cuidadores
                </Link>
              </li>
            </ul>
          </div>

          {/* Contato */}
          <div>
            <h3 className="font-semibold text-white mb-4">Contato</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-2">
                <Phone size={14} className="text-primary" />
                <a href="tel:+5566996691709" className="hover:text-white transition-colors">
                  (66) 99669-1709
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail size={14} className="text-primary" />
                <a href="mailto:admfernandoth@gmail.com" className="hover:text-white transition-colors">
                  admfernandoth@gmail.com
                </a>
              </li>
              <li className="flex items-start gap-2">
                <MapPin size={14} className="text-primary mt-0.5" />
                <span className="text-gray-400">
                  Três Lagoas-MS<br />
                  <span className="text-xs">e região (raio de 100km)</span>
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-gray-400">
            © {new Date().getFullYear()} Amor Patas. Todos os direitos reservados.
          </p>
          <p className="text-sm text-gray-400 flex items-center gap-1">
            Feito com <Heart size={14} className="text-red-500 fill-red-500" /> para os amantes de pets
          </p>
        </div>
      </div>
    </footer>
  )
}
