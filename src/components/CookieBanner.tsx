'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { X, Cookie } from 'lucide-react'
import { Button } from '@/components/ui/button'

const COOKIE_CONSENT_KEY = 'amorpatas_cookie_consent'

type ConsentType = 'all' | 'essential' | null

export function CookieBanner() {
  const [showBanner, setShowBanner] = useState(false)
  const [showDetails, setShowDetails] = useState(false)

  useEffect(() => {
    // Verificar se já existe consentimento
    const consent = localStorage.getItem(COOKIE_CONSENT_KEY)
    if (!consent) {
      // Pequeno delay para não aparecer imediatamente
      const timer = setTimeout(() => setShowBanner(true), 1000)
      return () => clearTimeout(timer)
    }
  }, [])

  const handleAcceptAll = () => {
    saveConsent('all')
  }

  const handleAcceptEssential = () => {
    saveConsent('essential')
  }

  const saveConsent = (type: ConsentType) => {
    const consent = {
      type,
      timestamp: new Date().toISOString(),
      version: '1.0',
    }
    localStorage.setItem(COOKIE_CONSENT_KEY, JSON.stringify(consent))
    setShowBanner(false)

    // Disparar evento para outros scripts (ex: Google Analytics)
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('cookieConsentUpdated', { detail: consent }))
    }
  }

  if (!showBanner) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6">
      <div className="container mx-auto max-w-4xl">
        <div className="bg-white rounded-2xl shadow-2xl border border-gray-200 p-6 md:p-8">
          {/* Header */}
          <div className="flex items-start justify-between gap-4 mb-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-full">
                <Cookie className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">
                Sua privacidade importa
              </h3>
            </div>
            <button
              onClick={handleAcceptEssential}
              className="text-gray-400 hover:text-gray-600 transition-colors"
              aria-label="Fechar"
            >
              <X size={24} />
            </button>
          </div>

          {/* Content */}
          <p className="text-gray-600 mb-4">
            Utilizamos cookies para melhorar sua experiência, analisar o tráfego do site e exibir anúncios
            personalizados. Ao clicar em &quot;Aceitar todos&quot;, você concorda com o uso de cookies conforme
            nossa{' '}
            <Link href="/privacidade" className="text-primary hover:underline">
              Política de Privacidade
            </Link>
            .
          </p>

          {/* Details (expandable) */}
          {showDetails && (
            <div className="bg-gray-50 rounded-lg p-4 mb-4 text-sm">
              <h4 className="font-medium text-gray-900 mb-2">Tipos de cookies utilizados:</h4>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-0.5">✓</span>
                  <div>
                    <strong>Essenciais:</strong> Necessários para o funcionamento do site (sessão, preferências).
                    Sempre ativos.
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-500 mt-0.5">○</span>
                  <div>
                    <strong>Analytics:</strong> Nos ajudam a entender como você usa o site (Google Analytics).
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-500 mt-0.5">○</span>
                  <div>
                    <strong>Publicidade:</strong> Usados para exibir anúncios relevantes (Google AdSense).
                  </div>
                </li>
              </ul>
            </div>
          )}

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
            <button
              onClick={() => setShowDetails(!showDetails)}
              className="text-sm text-gray-500 hover:text-gray-700 underline"
            >
              {showDetails ? 'Ocultar detalhes' : 'Ver detalhes'}
            </button>

            <div className="flex gap-3 w-full sm:w-auto">
              <Button
                variant="outline"
                onClick={handleAcceptEssential}
                className="flex-1 sm:flex-none"
              >
                Apenas essenciais
              </Button>
              <Button
                variant="gradient"
                onClick={handleAcceptAll}
                className="flex-1 sm:flex-none"
              >
                Aceitar todos
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
