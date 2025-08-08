'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { MessageSquare, Search, Phone, MoreVertical, Send, Bot, User } from 'lucide-react'
import { useRealtimeChats } from '@/lib/hooks/useRealtimeChats'
import { useChatMessages } from '@/lib/hooks/useChatMessages'

export default function ConversationsPanel() {
  const [selectedChat, setSelectedChat] = useState<string | null>(null)
  const [newMessage, setNewMessage] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const { chats, loading, error } = useRealtimeChats()
  const { messages, loading: messagesLoading } = useChatMessages(selectedChat || '')

  const handleSendMessage = async () => {
    if (!newMessage.trim() || !selectedChat) return
    
    try {
      const response = await fetch('/api/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          conversation_id: selectedChat,
          message: newMessage,
          sender: 'agent'
        })
      })

      if (response.ok) {
        setNewMessage('')
      }
    } catch (error) {
      console.error('Error sending message:', error)
    }
  }

  const filteredChats = chats.filter(chat =>
    (chat.contact_name?.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (chat.contact_phone?.includes(searchTerm)) ||
    (chat.last_message?.toLowerCase().includes(searchTerm.toLowerCase()))
  )

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-red-500">Error: {error}</p>
      </div>
    )
  }

  return (
    <div className="flex h-[calc(100vh-8rem)]">
      {/* Chat List */}
      <div className="w-1/3 border-r border-gray-200 bg-white flex flex-col">
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Conversaciones</h2>
            <Badge variant="secondary">{chats.length}</Badge>
          </div>
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
          {filteredChats.map((chat) => (
            <div
              key={chat.chat_id}
              className={`p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors ${
                selectedChat === chat.chat_id ? 'bg-blue-50 border-blue-200' : ''
              }`}
              onClick={() => setSelectedChat(chat.chat_id)}
            >
              <div className="flex items-center space-x-3">
                <Avatar className="h-10 w-10">
                  <AvatarFallback>
                    <User className="h-4 w-4" />
                  </AvatarFallback>
                </Avatar>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {chat.contact_name || chat.contact_phone || 'Usuario Anónimo'}
                    </p>
                    <div className="flex items-center gap-1">
                      <Badge 
                        variant={chat.platform === 'whatsapp' ? 'default' : 'secondary'}
                        className="text-xs"
                      >
                        {chat.platform === 'whatsapp' ? 'WhatsApp' : 'Web'}
                      </Badge>
                      {chat.ai_enabled && (
                        <Badge variant="outline" className="text-xs bg-green-50 text-green-700">
                          <Bot className="h-3 w-3 mr-1" />
                          IA
                        </Badge>
                      )}
                    </div>
                  </div>
                  <p className="text-sm text-gray-500 truncate">
                    {chat.last_message || 'Sin mensajes'}
                  </p>
                  <div className="flex items-center justify-between mt-1">
                    <p className="text-xs text-gray-400">
                      {chat.last_message_time ? new Date(chat.last_message_time).toLocaleString() : ''}
                    </p>
                    {chat.unread_count > 0 && (
                      <Badge variant="destructive" className="text-xs">
                        {chat.unread_count}
                      </Badge>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}

          {filteredChats.length === 0 && (
            <div className="p-8 text-center">
              <MessageSquare className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No hay conversaciones
              </h3>
              <p className="text-gray-600">
                {searchTerm ? 'No se encontraron conversaciones que coincidan con tu búsqueda.' : 'Aún no tienes conversaciones activas.'}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Chat Window */}
      <div className="flex-1 flex flex-col">
        {selectedChat ? (
          <>
            {/* Chat Header */}
            <div className="p-4 border-b border-gray-200 bg-white">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback>
                      <User className="h-4 w-4" />
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">
                      {chats.find(c => c.chat_id === selectedChat)?.contact_name || 'Usuario Anónimo'}
                    </p>
                    <p className="text-sm text-gray-500">
                      {chats.find(c => c.chat_id === selectedChat)?.contact_phone}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="sm">
                    <Phone className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
              {messagesLoading ? (
                <div className="flex justify-center">
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
                </div>
              ) : (
                messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                        message.sender === 'user'
                          ? 'bg-blue-600 text-white'
                          : message.sender === 'assistant'
                          ? 'bg-green-100 text-green-900'
                          : 'bg-white text-gray-900'
                      }`}
                    >
                      <p className="text-sm">{message.message}</p>
                      <p className={`text-xs mt-1 ${
                        message.sender === 'user' 
                          ? 'text-blue-100' 
                          : 'text-gray-500'
                      }`}>
                        {new Date(message.timestamp).toLocaleTimeString()}
                      </p>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Message Input */}
            <div className="p-4 border-t border-gray-200 bg-white">
              <div className="flex items-center space-x-2">
                <Input
                  placeholder="Escribe un mensaje..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  className="flex-1"
                />
                <Button onClick={handleSendMessage} disabled={!newMessage.trim()}>
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center bg-gray-50">
            <div className="text-center">
              <MessageSquare className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">Selecciona una conversación para comenzar</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
