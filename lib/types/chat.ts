export interface Chat {
  chat_id: string
  contact_name?: string
  contact_phone?: string
  platform: 'whatsapp' | 'web'
  last_message?: string
  last_message_time?: string
  unread_count: number
  ai_enabled: boolean
  created_at: string
  updated_at: string
}

export interface Message {
  id: string
  chat_id: string
  message: string
  sender: 'user' | 'assistant' | 'agent'
  timestamp: string
  message_type?: 'text' | 'image' | 'audio' | 'document'
  metadata?: Record<string, any>
}

export interface ChatResponse {
  chats: Chat[]
  total: number
  page: number
  limit: number
}

export interface MessageResponse {
  messages: Message[]
  total: number
  chat_id: string
}
