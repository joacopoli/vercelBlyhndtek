'use client'

import { useRealtimeChats } from '@/lib/hooks/useRealtimeChats'
import { useChatMessages } from '@/lib/hooks/useChatMessages'
import { useState } from 'react'

export function ChatUsageExample() {
  const [selectedChatId, setSelectedChatId] = useState<string>('')
  
  // Hook para obtener chats en tiempo real
  const { chats, loading: chatsLoading, error: chatsError } = useRealtimeChats()
  
  // Hook para obtener mensajes de un chat específico
  const { messages, loading: messagesLoading, error: messagesError } = useChatMessages(selectedChatId)

  if (chatsLoading) return <div>Cargando chats...</div>
  if (chatsError) return <div>Error: {chatsError}</div>

  return (
    <div className="flex h-screen">
      {/* Lista de chats */}
      <div className="w-1/3 border-r">
        <h2 className="p-4 font-bold">Chats ({chats.length})</h2>
        {chats.map((chat) => (
          <div
            key={chat.chat_id}
            className={`p-4 cursor-pointer hover:bg-gray-100 ${
              selectedChatId === chat.chat_id ? 'bg-blue-100' : ''
            }`}
            onClick={() => setSelectedChatId(chat.chat_id)}
          >
            <div className="font-medium">{chat.contact_name || chat.contact_phone}</div>
            <div className="text-sm text-gray-500">{chat.last_message}</div>
            <div className="text-xs text-gray-400">
              {new Date(chat.last_message_time || '').toLocaleString()}
            </div>
          </div>
        ))}
      </div>

      {/* Mensajes del chat seleccionado */}
      <div className="flex-1 flex flex-col">
        {selectedChatId ? (
          <>
            <div className="p-4 border-b font-bold">
              Chat: {chats.find(c => c.chat_id === selectedChatId)?.contact_name || 'Sin nombre'}
            </div>
            <div className="flex-1 overflow-y-auto p-4">
              {messagesLoading ? (
                <div>Cargando mensajes...</div>
              ) : messagesError ? (
                <div>Error: {messagesError}</div>
              ) : (
                <div className="space-y-2">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`p-2 rounded max-w-xs ${
                        message.sender === 'user'
                          ? 'bg-blue-500 text-white ml-auto'
                          : 'bg-gray-200'
                      }`}
                    >
                      <div>{message.message}</div>
                      <div className="text-xs opacity-70">
                        {new Date(message.timestamp).toLocaleTimeString()}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center text-gray-500">
            Selecciona un chat para ver los mensajes
          </div>
        )}
      </div>
    </div>
  )
}
