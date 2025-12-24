'use client'

import { useState } from 'react'
import { Star, User } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import type { Avaliacao } from '@/types'

interface ReviewSectionProps {
  avaliacoes: Avaliacao[]
  empresaId?: string
  prestadorId?: string
  mediaAvaliacoes: number
}

export function ReviewSection({
  avaliacoes,
  empresaId,
  prestadorId,
  mediaAvaliacoes,
}: ReviewSectionProps) {
  const [showForm, setShowForm] = useState(false)
  const [rating, setRating] = useState(0)
  const [hoverRating, setHoverRating] = useState(0)
  const [nome, setNome] = useState('')
  const [comentario, setComentario] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (rating === 0 || !nome.trim()) return

    setIsSubmitting(true)

    try {
      await fetch('/api/avaliacoes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nota: rating,
          nomeAutor: nome,
          comentario: comentario || null,
          empresaId,
          prestadorId,
        }),
      })
      setSubmitted(true)
      setShowForm(false)
    } catch (error) {
      console.error('Erro ao enviar avaliação:', error)
    }

    setIsSubmitting(false)
  }

  const renderStars = (value: number, interactive = false) => {
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            disabled={!interactive}
            onClick={() => interactive && setRating(star)}
            onMouseEnter={() => interactive && setHoverRating(star)}
            onMouseLeave={() => interactive && setHoverRating(0)}
            className={`${interactive ? 'cursor-pointer' : 'cursor-default'}`}
          >
            <Star
              size={interactive ? 28 : 16}
              className={`${
                star <= (interactive ? hoverRating || rating : value)
                  ? 'text-amber-400 fill-amber-400'
                  : 'text-gray-300'
              } transition-colors`}
            />
          </button>
        ))}
      </div>
    )
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle className="text-lg">Avaliações</CardTitle>
          {avaliacoes.length > 0 && (
            <p className="text-sm text-gray-500 mt-1">
              {mediaAvaliacoes.toFixed(1)} de 5 ({avaliacoes.length} avaliações)
            </p>
          )}
        </div>
        {!showForm && !submitted && (
          <Button variant="gradient" size="sm" onClick={() => setShowForm(true)} className="gap-2">
            <Star size={16} />
            Deixar Avaliação
          </Button>
        )}
      </CardHeader>
      <CardContent>
        {/* Formulário de Avaliação */}
        {showForm && (
          <form onSubmit={handleSubmit} className="mb-6 p-5 bg-gradient-to-br from-primary/5 to-secondary/5 rounded-xl border border-primary/20">
            <h4 className="font-semibold text-gray-900 mb-4 text-lg">Deixe sua avaliação</h4>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Qual sua nota? *</label>
              {renderStars(rating, true)}
              {rating > 0 && (
                <span className="text-sm text-primary mt-1 inline-block">
                  {rating === 1 && 'Ruim'}
                  {rating === 2 && 'Regular'}
                  {rating === 3 && 'Bom'}
                  {rating === 4 && 'Muito Bom'}
                  {rating === 5 && 'Excelente!'}
                </span>
              )}
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Seu nome *</label>
              <Input
                type="text"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                placeholder="Digite seu nome"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Conte sua experiência (opcional)</label>
              <textarea
                value={comentario}
                onChange={(e) => setComentario(e.target.value)}
                placeholder="Como foi seu atendimento? O que você mais gostou?"
                className="w-full min-h-[100px] px-4 py-3 border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-primary bg-white"
              />
            </div>

            <div className="flex gap-3">
              <Button type="submit" variant="gradient" disabled={isSubmitting || rating === 0 || !nome.trim()}>
                {isSubmitting ? 'Enviando...' : 'Enviar Avaliação'}
              </Button>
              <Button type="button" variant="outline" onClick={() => setShowForm(false)}>
                Cancelar
              </Button>
            </div>
            <p className="text-xs text-gray-500 mt-3">
              * Sua avaliação será publicada após aprovação da moderação.
            </p>
          </form>
        )}

        {submitted && (
          <div className="mb-6 p-4 bg-green-50 text-green-700 rounded-lg border border-green-200">
            <p className="font-medium">Obrigado pela sua avaliação!</p>
            <p className="text-sm mt-1">Ela será publicada após aprovação da moderação.</p>
          </div>
        )}

        {/* Lista de Avaliações */}
        {avaliacoes.length === 0 ? (
          <p className="text-gray-500 text-center py-8">
            Ainda não há avaliações. Seja o primeiro a avaliar!
          </p>
        ) : (
          <div className="space-y-4">
            {avaliacoes.map((avaliacao) => (
              <div key={avaliacao.id} className="border-b pb-4 last:border-0">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <User size={20} className="text-gray-400" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-medium text-gray-900">{avaliacao.nomeAutor}</span>
                      {renderStars(avaliacao.nota)}
                    </div>
                    {avaliacao.comentario && (
                      <p className="text-gray-600 text-sm">{avaliacao.comentario}</p>
                    )}
                    <p className="text-xs text-gray-400 mt-1">
                      {new Date(avaliacao.createdAt).toLocaleDateString('pt-BR')}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
