'use client'

import { useState } from 'react'
import { Phone, MessageCircle, Mail, Eye, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { formatPhone, getWhatsAppLink } from '@/lib/utils'

interface ContactRevealButtonProps {
  telefone: string
  whatsapp?: string | null
  email?: string | null
  empresaId?: string
  prestadorId?: string
}

export function ContactRevealButton({
  telefone,
  whatsapp,
  email,
  empresaId,
  prestadorId,
}: ContactRevealButtonProps) {
  const [isRevealed, setIsRevealed] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleReveal = async () => {
    if (isRevealed) return

    setIsLoading(true)

    try {
      await fetch('/api/contato-click', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          empresaId,
          prestadorId,
          tipoContato: 'reveal',
        }),
      })
    } catch (error) {
      console.error('Erro ao registrar clique:', error)
    }

    setIsLoading(false)
    setIsRevealed(true)
  }

  const handleContactClick = async (tipo: string) => {
    try {
      await fetch('/api/contato-click', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          empresaId,
          prestadorId,
          tipoContato: tipo,
        }),
      })
    } catch (error) {
      console.error('Erro ao registrar clique:', error)
    }
  }

  if (!isRevealed) {
    return (
      <Button
        onClick={handleReveal}
        variant="gradient"
        size="lg"
        className="w-full gap-2 animate-pulse hover:animate-none"
        disabled={isLoading}
      >
        {isLoading ? (
          <Loader2 className="animate-spin" size={20} />
        ) : (
          <Eye size={20} />
        )}
        {isLoading ? 'Carregando...' : 'Ver Contato'}
      </Button>
    )
  }

  return (
    <div className="space-y-3 animate-in fade-in slide-in-from-bottom-2 duration-300">
      {/* Telefone */}
      <a
        href={`tel:${telefone.replace(/\D/g, '')}`}
        onClick={() => handleContactClick('telefone')}
        className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors group"
      >
        <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center group-hover:bg-primary/20 transition-colors">
          <Phone className="w-5 h-5 text-primary" />
        </div>
        <div>
          <p className="text-xs text-gray-500">Telefone</p>
          <p className="font-medium text-gray-900">{formatPhone(telefone)}</p>
        </div>
      </a>

      {/* WhatsApp */}
      {whatsapp && (
        <a
          href={getWhatsAppLink(whatsapp, 'Olá! Encontrei vocês no Amor Patas e gostaria de mais informações.')}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => handleContactClick('whatsapp')}
          className="flex items-center gap-3 p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-colors group"
        >
          <div className="w-10 h-10 bg-green-500/20 rounded-full flex items-center justify-center group-hover:bg-green-500/30 transition-colors">
            <MessageCircle className="w-5 h-5 text-green-600" />
          </div>
          <div>
            <p className="text-xs text-gray-500">WhatsApp</p>
            <p className="font-medium text-gray-900">{formatPhone(whatsapp)}</p>
          </div>
        </a>
      )}

      {/* Email */}
      {email && (
        <a
          href={`mailto:${email}`}
          onClick={() => handleContactClick('email')}
          className="flex items-center gap-3 p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors group"
        >
          <div className="w-10 h-10 bg-blue-500/20 rounded-full flex items-center justify-center group-hover:bg-blue-500/30 transition-colors">
            <Mail className="w-5 h-5 text-blue-600" />
          </div>
          <div>
            <p className="text-xs text-gray-500">E-mail</p>
            <p className="font-medium text-gray-900 text-sm">{email}</p>
          </div>
        </a>
      )}
    </div>
  )
}
