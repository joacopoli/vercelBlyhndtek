'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Chat } from '@/lib/types/chat'

export function useRealtimeChats() {
  const [chats, setChats] = useState<Chat[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const supabase = createClient()

    // Función para cargar chats iniciales
    const loadChats = async () => {
      try {
        const { data, error } = await supabase
          .from('chats')
          .select('*')
          .order('updated_at', { ascending: false })

        if (error) throw error
        setChats(data || [])
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error loading chats')
      } finally {
        setLoading(false)
      }
    }

    // Cargar chats iniciales
    loadChats()

    // Configurar suscripción en tiempo real
    const channel = supabase
      .channel('chats')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'chats' },
        (payload) => {
          if (payload.eventType === 'INSERT') {
            setChats(prev => [payload.new as Chat, ...prev])
          } else if (payload.eventType === 'UPDATE') {
            setChats(prev => prev.map(chat => 
              chat.chat_id === (payload.new as Chat).chat_id 
                ? payload.new as Chat 
                : chat
            ))
          } else if (payload.eventType === 'DELETE') {
            setChats(prev => prev.filter(chat => 
              chat.chat_id !== (payload.old as Chat).chat_id
            ))
          }
        }
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [])

  return { chats, loading, error }
}
