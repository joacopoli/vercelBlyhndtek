import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function GET(
  request: Request,
  { params }: { params: { chat_id: string } }
) {
  try {
    const supabase = createClient()
    
    const { data: messages, error } = await supabase
      .from('messages')
      .select('*')
      .eq('chat_id', params.chat_id)
      .order('timestamp', { ascending: true })

    if (error) {
      console.error('Error fetching messages:', error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json(messages || [])
  } catch (error) {
    console.error('Unexpected error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
