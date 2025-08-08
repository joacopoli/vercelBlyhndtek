import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function GET() {
  try {
    const supabase = createClient()
    
    const { data: chats, error } = await supabase
      .from('chats')
      .select('*')
      .order('updated_at', { ascending: false })

    if (error) {
      console.error('Error fetching chats:', error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json(chats || [])
  } catch (error) {
    console.error('Unexpected error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
