'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

export default function TestAPIPage() {
  const [chats, setChats] = useState([])
  const [messages, setMessages] = useState([])
  const [loading, setLoading] = useState(false)
  const [selectedChat, setSelectedChat] = useState('')

  const testChatsAPI = async () => {
    setLoading(true)
    try {
      const response = await fetch('/api/chats')
      const data = await response.json()
      setChats(data)
      console.log('Chats API Response:', data)
    } catch (error) {
      console.error('Error testing chats API:', error)
    } finally {
      setLoading(false)
    }
  }

  const testMessagesAPI = async (chatId: string) => {
    if (!chatId) return
    
    setLoading(true)
    try {
      const response = await fetch(`/api/chats/${chatId}`)
      const data = await response.json()
      setMessages(data)
      console.log('Messages API Response:', data)
    } catch (error) {
      console.error('Error testing messages API:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-bold">API Test Page</h1>
      
      <Card>
        <CardHeader>
          <CardTitle>Test Chats API</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button onClick={testChatsAPI} disabled={loading}>
            {loading ? 'Loading...' : 'Test /api/chats'}
          </Button>
          
          <div>
            <h3 className="font-semibold mb-2">Chats ({chats.length}):</h3>
            <pre className="bg-gray-100 p-4 rounded text-sm overflow-auto max-h-60">
              {JSON.stringify(chats, null, 2)}
            </pre>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Test Messages API</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <input
              type="text"
              placeholder="Enter chat ID"
              value={selectedChat}
              onChange={(e) => setSelectedChat(e.target.value)}
              className="border rounded px-3 py-2 mr-2"
            />
            <Button onClick={() => testMessagesAPI(selectedChat)} disabled={loading || !selectedChat}>
              {loading ? 'Loading...' : 'Test Messages API'}
            </Button>
          </div>
          
          <div>
            <h3 className="font-semibold mb-2">Messages ({messages.length}):</h3>
            <pre className="bg-gray-100 p-4 rounded text-sm overflow-auto max-h-60">
              {JSON.stringify(messages, null, 2)}
            </pre>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
