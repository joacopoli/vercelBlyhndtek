import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function GET() {
  try {
    const supabase = createClient()
    
    const { data: conversations, error } = await supabase
      .from('conversations')
      .select('*')
      .order('updated_at', { ascending: false })

    if (error) {
      console.error('Error fetching conversations:', error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    // Transform data to match frontend expectations
    const transformedConversations = conversations?.map(conv => ({
      id: conv.id,
      name: conv.contact_name || conv.contact_phone || 'Usuario Anónimo',
      preview: conv.last_message || 'Sin mensajes',
      time: new Date(conv.updated_at).toLocaleTimeString('es-ES', { 
        hour: '2-digit', 
        minute: '2-digit' 
      }),
      unread: conv.unread_count || 0,
      platform: conv.platform || 'whatsapp',
      iaActiva: conv.ai_enabled || false
    })) || []

    return NextResponse.json(transformedConversations)
  } catch (error) {
    console.error('Unexpected error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
