'use client'

import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { Search } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export function HeroSection() {
  const [searchTerm, setSearchTerm] = useState('')
  const router = useRouter()

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchTerm.trim()) {
      router.push(`/empresas?busca=${encodeURIComponent(searchTerm)}`)
    }
  }

  return (
    <section className="relative min-h-[600px] flex items-center">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/fundo.png"
          alt="Cachorro e gato felizes - Encontre os melhores serviços pet em Três Lagoas e região"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent" />
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-2xl text-white">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight">
            Encontre o melhor{' '}
            <span className="text-[#7BC142]">cuidado</span>{' '}
            para seu pet
          </h1>
          <p className="text-lg md:text-xl text-gray-200 mb-8">
            Descubra os melhores profissionais e empresas para cuidar do seu animal de estimação em Três Lagoas e região.
          </p>

          {/* Search Form */}
          <form onSubmit={handleSearch} className="flex gap-2 max-w-xl">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <Input
                type="text"
                placeholder="Buscar pet shop, veterinário, adestrador..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-12 h-14 text-base bg-white/95 border-0 text-gray-800"
              />
            </div>
            <Button type="submit" variant="gradient" size="xl">
              Buscar
            </Button>
          </form>

          {/* Quick Stats */}
          <div className="flex gap-8 mt-8 pt-8 border-t border-white/20">
            <div>
              <p className="text-3xl font-bold text-[#7BC142]">25+</p>
              <p className="text-sm text-gray-300">Empresas</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-[#2D9CCA]">7</p>
              <p className="text-sm text-gray-300">Cidades</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-white">100km</p>
              <p className="text-sm text-gray-300">de cobertura</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
