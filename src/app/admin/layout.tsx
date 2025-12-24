import { redirect } from 'next/navigation'
import { isAuthenticated } from '@/lib/auth'
import { AdminHeader } from '@/components/admin/AdminHeader'

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const authenticated = await isAuthenticated()

  // Não redirecionar se estiver na página de login
  const isLoginPage = false // Será verificado no middleware ou na própria página

  if (!authenticated && !isLoginPage) {
    // O redirecionamento será feito no componente de página
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {authenticated && <AdminHeader />}
      {children}
    </div>
  )
}
