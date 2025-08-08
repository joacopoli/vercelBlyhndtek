'use client'

import { useState, useEffect } from 'react'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Search, Bot, User } from 'lucide-react'
import { Conversation } from '@/lib/types'

interface ConversationListProps {
  onSelectConversation: (conversation: Conversation) => void
  selectedConversation: Conversation | null
}

export function ConversationList({ onSelectConversation, selectedConversation }: ConversationListProps) {
  const [conversations, setConversations] = useState<Conversation[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetchConversations()
  }, [])

  const fetchConversations = async () => {
    try {
      const response = await fetch('/api/chats')
      if (response.ok) {
        const data = await response.json()
        setConversations(data)
      }
    } catch (error) {
      console.error('Error fetching conversations:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const filteredConversations = conversations.filter(conv =>
    conv.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    conv.preview.toLowerCase().includes(searchTerm.toLowerCase())
  )

  if (isLoading) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  return (
    <div className="h-full flex flex-col">
      <div className="p-4 border-b border-gray-200">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Buscar conversaciones..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        {filteredConversations.map((conversation) => (
          <div
            key={conversation.id}
            onClick={() => onSelectConversation(conversation)}
            className={`p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors ${
              selectedConversation?.id === conversation.id ? 'bg-blue-50 border-blue-200' : ''
            }`}
          >
            <div className="flex items-center space-x-3">
              <Avatar>
                <AvatarImage src={`/generic-placeholder-graphic.png?height=40&width=40`} />
                <AvatarFallback>
                  <User className="h-4 w-4" />
                </AvatarFallback>
              </Avatar>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="font-medium truncate text-sm">
                    {conversation.name || conversation.id}
                  </h3>
                  <div className="flex items-center gap-1">
                    {conversation.iaActiva && (
                      <Badge variant="default" className="bg-green-100 text-green-800 text-xs">
                        <Bot className="h-2 w-2 mr-1" />
                        IA
                      </Badge>
                    )}
                  </div>
                </div>
                <p className="text-xs text-gray-600 truncate">{conversation.preview}</p>
                <div className="flex items-center justify-between mt-1">
                  <span className="text-xs text-gray-400">{conversation.id}</span>
                  <span className="text-xs text-gray-400">{conversation.time}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredConversations.length === 0 && !isLoading && (
        <div className="flex-1 flex items-center justify-center p-4">
          <div className="text-center text-gray-500">
            <Search className="h-8 w-8 mx-auto mb-2 opacity-50" />
            <p className="text-sm">
              {searchTerm ? 'No se encontraron conversaciones' : 'No hay conversaciones'}
            </p>
          </div>
        </div>
      )}
    </div>
  )
}
