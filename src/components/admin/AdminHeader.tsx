'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { LogOut, LayoutDashboard, Building2, Users, Star, BarChart3 } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function AdminHeader() {
  const router = useRouter()

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' })
    router.push('/admin/login')
    router.refresh()
  }

  return (
    <header className="bg-white border-b shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-8">
            <Link href="/admin" className="flex items-center gap-2">
              <Image
                src="/images/logo_amorpatas.png"
                alt="Amor Patas"
                width={120}
                height={40}
                className="h-8 w-auto"
              />
              <span className="text-sm font-medium text-gray-500">Admin</span>
            </Link>

            <nav className="hidden md:flex items-center gap-1">
              <Link href="/admin">
                <Button variant="ghost" size="sm" className="gap-2">
                  <LayoutDashboard size={16} />
                  Dashboard
                </Button>
              </Link>
              <Link href="/admin/empresas/novo">
                <Button variant="ghost" size="sm" className="gap-2">
                  <Building2 size={16} />
                  Nova Empresa
                </Button>
              </Link>
              <Link href="/admin/prestadores/novo">
                <Button variant="ghost" size="sm" className="gap-2">
                  <Users size={16} />
                  Novo Prestador
                </Button>
              </Link>
              <Link href="/admin/avaliacoes">
                <Button variant="ghost" size="sm" className="gap-2">
                  <Star size={16} />
                  Avaliações
                </Button>
              </Link>
              <Link href="/admin/analytics">
                <Button variant="ghost" size="sm" className="gap-2">
                  <BarChart3 size={16} />
                  Analytics
                </Button>
              </Link>
            </nav>
          </div>

          <div className="flex items-center gap-4">
            <Link href="/" className="text-sm text-gray-500 hover:text-primary">
              Ver site
            </Link>
            <Button variant="outline" size="sm" onClick={handleLogout} className="gap-2">
              <LogOut size={16} />
              Sair
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}
