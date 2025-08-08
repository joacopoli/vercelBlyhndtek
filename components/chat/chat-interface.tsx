'use client'

import { useState } from 'react'
import { ConversationList } from './conversation-list'
import { ChatWindow } from './chat-window'
import { Conversation } from '@/lib/types'

export function ChatInterface() {
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null)

  return (
    <div className="h-[calc(100vh-8rem)] flex bg-white rounded-lg border border-gray-200 overflow-hidden">
      <div className="w-1/3 border-r border-gray-200">
        <ConversationList 
          onSelectConversation={setSelectedConversation}
          selectedConversation={selectedConversation}
        />
      </div>
      <div className="flex-1">
        <ChatWindow conversation={selectedConversation} />
      </div>
    </div>
  )
}
