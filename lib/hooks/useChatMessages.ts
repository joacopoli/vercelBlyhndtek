'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Message } from '@/lib/types/chat'

export function useChatMessages(chatId: string) {
  const [messages, setMessages] = useState<Message[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!chatId) {
      setMessages([])
      return
    }

    const supabase = createClient()
    setLoading(true)
    setError(null)

    // Función para cargar mensajes
    const loadMessages = async () => {
      try {
        const { data, error } = await supabase
          .from('messages')
          .select('*')
          .eq('chat_id', chatId)
          .order('timestamp', { ascending: true })

        if (error) throw error
        setMessages(data || [])
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error loading messages')
      } finally {
        setLoading(false)
      }
    }

    // Cargar mensajes iniciales
    loadMessages()

    // Configurar suscripción en tiempo real para mensajes
    const channel = supabase
      .channel(`messages:${chatId}`)
      .on(
        'postgres_changes',
        { 
          event: '*', 
          schema: 'public', 
          table: 'messages',
          filter: `chat_id=eq.${chatId}`
        },
        (payload) => {
          if (payload.eventType === 'INSERT') {
            setMessages(prev => [...prev, payload.new as Message])
          } else if (payload.eventType === 'UPDATE') {
            setMessages(prev => prev.map(msg => 
              msg.id === (payload.new as Message).id 
                ? payload.new as Message 
                : msg
            ))
          } else if (payload.eventType === 'DELETE') {
            setMessages(prev => prev.filter(msg => 
              msg.id !== (payload.old as Message).id
            ))
          }
        }
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [chatId])

  return { messages, loading, error }
}
