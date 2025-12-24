'use client'

import { useEffect } from 'react'

interface GoogleAdsProps {
  slot: string
  format?: 'auto' | 'fluid' | 'rectangle' | 'vertical' | 'horizontal'
  responsive?: boolean
  className?: string
}

declare global {
  interface Window {
    adsbygoogle: unknown[]
  }
}

export function GoogleAds({ slot, format = 'auto', responsive = true, className = '' }: GoogleAdsProps) {
  useEffect(() => {
    try {
      if (typeof window !== 'undefined' && window.adsbygoogle) {
        window.adsbygoogle.push({})
      }
    } catch (error) {
      console.error('Erro ao carregar anúncio:', error)
    }
  }, [])

  // Em desenvolvimento, mostra um placeholder
  if (process.env.NODE_ENV === 'development') {
    return (
      <div className={`bg-gray-200 border-2 border-dashed border-gray-400 rounded-lg flex items-center justify-center text-gray-500 text-sm ${className}`}>
        <div className="text-center p-4">
          <p className="font-medium">Google AdSense</p>
          <p className="text-xs">Slot: {slot}</p>
          <p className="text-xs mt-1">(Anúncio aparecerá em produção)</p>
        </div>
      </div>
    )
  }

  return (
    <ins
      className={`adsbygoogle ${className}`}
      style={{ display: 'block' }}
      data-ad-client={process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID}
      data-ad-slot={slot}
      data-ad-format={format}
      data-full-width-responsive={responsive ? 'true' : 'false'}
    />
  )
}

// Componente para banner horizontal (entre seções)
export function GoogleAdsBanner({ className = '' }: { className?: string }) {
  return (
    <GoogleAds
      slot={process.env.NEXT_PUBLIC_ADSENSE_SLOT_BANNER || 'banner-slot'}
      format="horizontal"
      className={`min-h-[90px] w-full ${className}`}
    />
  )
}

// Componente para sidebar (lateral)
export function GoogleAdsSidebar({ className = '' }: { className?: string }) {
  return (
    <GoogleAds
      slot={process.env.NEXT_PUBLIC_ADSENSE_SLOT_SIDEBAR || 'sidebar-slot'}
      format="vertical"
      className={`min-h-[250px] ${className}`}
    />
  )
}

// Componente para in-feed (entre cards)
export function GoogleAdsInFeed({ className = '' }: { className?: string }) {
  return (
    <GoogleAds
      slot={process.env.NEXT_PUBLIC_ADSENSE_SLOT_INFEED || 'infeed-slot'}
      format="fluid"
      className={`min-h-[100px] ${className}`}
    />
  )
}
