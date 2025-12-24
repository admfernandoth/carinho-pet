'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { Check, X, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface AvaliacaoActionsProps {
  id: string
  aprovada?: boolean
}

export function AvaliacaoActions({ id, aprovada }: AvaliacaoActionsProps) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const handleAction = async (action: 'aprovar' | 'rejeitar' | 'excluir') => {
    setLoading(true)
    try {
      const response = await fetch(`/api/avaliacoes/${id}`, {
        method: action === 'excluir' ? 'DELETE' : 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: action !== 'excluir' ? JSON.stringify({ aprovada: action === 'aprovar' }) : undefined,
      })

      if (response.ok) {
        router.refresh()
      } else {
        alert('Erro ao processar ação')
      }
    } catch (error) {
      console.error(error)
      alert('Erro ao processar ação')
    } finally {
      setLoading(false)
    }
  }

  if (aprovada) {
    return (
      <div className="flex gap-2">
        <Button
          size="sm"
          variant="outline"
          className="text-red-600 hover:bg-red-50"
          onClick={() => handleAction('excluir')}
          disabled={loading}
        >
          <Trash2 size={14} className="mr-1" />
          Excluir
        </Button>
      </div>
    )
  }

  return (
    <div className="flex gap-2">
      <Button
        size="sm"
        className="bg-green-600 hover:bg-green-700"
        onClick={() => handleAction('aprovar')}
        disabled={loading}
      >
        <Check size={14} className="mr-1" />
        Aprovar
      </Button>
      <Button
        size="sm"
        variant="outline"
        className="text-red-600 hover:bg-red-50"
        onClick={() => handleAction('rejeitar')}
        disabled={loading}
      >
        <X size={14} className="mr-1" />
        Rejeitar
      </Button>
    </div>
  )
}
