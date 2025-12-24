'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Save } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { TIPO_EMPRESA_LABELS } from '@/types'
import { generateSlug } from '@/lib/utils'
import { AuthGuard } from '@/components/admin/AuthGuard'

function NovaEmpresaForm() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    nome: '',
    tipo: 'PETSHOP',
    descricao: '',
    telefone: '',
    whatsapp: '',
    email: '',
    website: '',
    instagram: '',
    cidade: 'Três Lagoas-MS',
    bairro: '',
    endereco: '',
    horarioFunc: '',
    destaque: false,
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const slug = generateSlug(formData.nome)
      const response = await fetch('/api/empresas', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, slug, logo: '/images/placeholder.jpg', fotos: '[]' }),
      })

      if (response.ok) {
        router.push('/admin')
        router.refresh()
      } else {
        alert('Erro ao cadastrar empresa')
      }
    } catch (error) {
      console.error(error)
      alert('Erro ao cadastrar empresa')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <Link href="/admin" className="inline-flex items-center text-sm text-gray-600 hover:text-primary mb-6">
          <ArrowLeft size={16} className="mr-2" />
          Voltar para o painel
        </Link>

        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle>Cadastrar Nova Empresa</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Nome *</label>
                  <Input
                    required
                    value={formData.nome}
                    onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                    placeholder="Nome da empresa"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Tipo *</label>
                  <select
                    required
                    value={formData.tipo}
                    onChange={(e) => setFormData({ ...formData, tipo: e.target.value })}
                    className="w-full h-10 px-3 rounded-lg border border-input bg-background"
                  >
                    {Object.entries(TIPO_EMPRESA_LABELS).map(([value, label]) => (
                      <option key={value} value={value}>{label}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Descrição *</label>
                <textarea
                  required
                  value={formData.descricao}
                  onChange={(e) => setFormData({ ...formData, descricao: e.target.value })}
                  placeholder="Descrição dos serviços..."
                  className="w-full px-3 py-2 rounded-lg border border-input bg-background min-h-[100px]"
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Telefone *</label>
                  <Input
                    required
                    value={formData.telefone}
                    onChange={(e) => setFormData({ ...formData, telefone: e.target.value })}
                    placeholder="(67) 99999-9999"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">WhatsApp</label>
                  <Input
                    value={formData.whatsapp}
                    onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                    placeholder="(67) 99999-9999"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Email</label>
                  <Input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="email@exemplo.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Website</label>
                  <Input
                    value={formData.website}
                    onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                    placeholder="https://www.exemplo.com"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Instagram</label>
                  <Input
                    value={formData.instagram}
                    onChange={(e) => setFormData({ ...formData, instagram: e.target.value })}
                    placeholder="@usuario"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Horário de Funcionamento</label>
                  <Input
                    value={formData.horarioFunc}
                    onChange={(e) => setFormData({ ...formData, horarioFunc: e.target.value })}
                    placeholder="Seg-Sex 08:00-18:00"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Cidade *</label>
                  <select
                    required
                    value={formData.cidade}
                    onChange={(e) => setFormData({ ...formData, cidade: e.target.value })}
                    className="w-full h-10 px-3 rounded-lg border border-input bg-background"
                  >
                    <option value="Três Lagoas-MS">Três Lagoas-MS</option>
                    <option value="Andradina-SP">Andradina-SP</option>
                    <option value="Castilho-SP">Castilho-SP</option>
                    <option value="Ilha Solteira-SP">Ilha Solteira-SP</option>
                    <option value="Brasilândia-MS">Brasilândia-MS</option>
                    <option value="Selvíria-MS">Selvíria-MS</option>
                    <option value="Mirandópolis-SP">Mirandópolis-SP</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Bairro</label>
                  <Input
                    value={formData.bairro}
                    onChange={(e) => setFormData({ ...formData, bairro: e.target.value })}
                    placeholder="Centro"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Endereço *</label>
                <Input
                  required
                  value={formData.endereco}
                  onChange={(e) => setFormData({ ...formData, endereco: e.target.value })}
                  placeholder="Rua, número, complemento"
                />
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="destaque"
                  checked={formData.destaque}
                  onChange={(e) => setFormData({ ...formData, destaque: e.target.checked })}
                  className="w-4 h-4"
                />
                <label htmlFor="destaque" className="text-sm">Marcar como destaque na home</label>
              </div>

              <div className="flex gap-4 pt-4">
                <Button type="submit" disabled={loading} className="gap-2">
                  <Save size={16} />
                  {loading ? 'Salvando...' : 'Cadastrar Empresa'}
                </Button>
                <Link href="/admin">
                  <Button type="button" variant="outline">Cancelar</Button>
                </Link>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default function NovaEmpresaPage() {
  return (
    <AuthGuard>
      <NovaEmpresaForm />
    </AuthGuard>
  )
}
