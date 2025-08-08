"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MessageSquare, Bot, Users, TrendingUp, Settings, Smartphone, Globe } from 'lucide-react'
import { ChatInterface } from "../chat/chat-interface"

export default function ChatbotWebWhatsApp() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">Chatbot Web/WhatsApp</h2>
        <p className="text-gray-600">Gestiona las conversaciones automatizadas</p>
      </div>

      <Tabs defaultValue="conversations" className="space-y-6">
        <TabsList>
          <TabsTrigger value="conversations">Conversaciones</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="settings">Configuración</TabsTrigger>
        </TabsList>

        <TabsContent value="conversations" className="space-y-6">
          <ChatInterface />
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          {/* Métricas principales */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Conversaciones Hoy</CardTitle>
                <MessageSquare className="h-4 w-4 text-blue-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">127</div>
                <p className="text-xs text-muted-foreground">+12% vs ayer</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Respuestas IA</CardTitle>
                <Bot className="h-4 w-4 text-green-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">89%</div>
                <p className="text-xs text-muted-foreground">Automatización</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Usuarios Únicos</CardTitle>
                <Users className="h-4 w-4 text-orange-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">94</div>
                <p className="text-xs text-muted-foreground">+8% vs ayer</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Satisfacción</CardTitle>
                <TrendingUp className="h-4 w-4 text-purple-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">4.7</div>
                <p className="text-xs text-muted-foreground">de 5 estrellas</p>
              </CardContent>
            </Card>
          </div>

          {/* Distribución por canales */}
          <Card>
            <CardHeader>
              <CardTitle>Distribución por Canales</CardTitle>
              <CardDescription>Conversaciones por canal de comunicación</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Smartphone className="h-5 w-5 text-green-500" />
                    <span>WhatsApp</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-32 bg-gray-200 rounded-full h-2">
                      <div className="bg-green-500 h-2 rounded-full" style={{ width: '65%' }}></div>
                    </div>
                    <span className="text-sm font-medium">65%</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Globe className="h-5 w-5 text-blue-500" />
                    <span>Web Chat</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-32 bg-gray-200 rounded-full h-2">
                      <div className="bg-blue-500 h-2 rounded-full" style={{ width: '35%' }}></div>
                    </div>
                    <span className="text-sm font-medium">35%</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Horarios de mayor actividad */}
          <Card>
            <CardHeader>
              <CardTitle>Horarios de Mayor Actividad</CardTitle>
              <CardDescription>Distribución de conversaciones por hora</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-6 gap-2 text-center text-xs">
                {Array.from({ length: 24 }, (_, i) => (
                  <div key={i} className="space-y-1">
                    <div className={`h-8 rounded ${
                      i >= 9 && i <= 18 ? 'bg-blue-500' : 
                      i >= 19 && i <= 22 ? 'bg-green-500' : 'bg-gray-200'
                    }`}></div>
                    <span>{i}:00</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Configuración del Chatbot</CardTitle>
              <CardDescription>Ajusta el comportamiento del asistente virtual</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base">IA Habilitada</Label>
                  <div className="text-sm text-gray-500">
                    Permite que la IA responda automáticamente
                  </div>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base">Respuestas Instantáneas</Label>
                  <div className="text-sm text-gray-500">
                    Responde inmediatamente a mensajes comunes
                  </div>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base">Transferencia a Humano</Label>
                  <div className="text-sm text-gray-500">
                    Permite transferir conversaciones complejas
                  </div>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base">Horario de Atención</Label>
                  <div className="text-sm text-gray-500">
                    Lunes a Viernes, 9:00 - 18:00
                  </div>
                </div>
                <Button variant="outline" size="sm">
                  Configurar
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Integraciones</CardTitle>
              <CardDescription>Conecta con servicios externos</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center space-x-3">
                  <Smartphone className="h-8 w-8 text-green-500" />
                  <div>
                    <h3 className="font-semibold">WhatsApp Business API</h3>
                    <p className="text-sm text-gray-500">Conectado</p>
                  </div>
                </div>
                <Badge className="bg-green-100 text-green-800">Activo</Badge>
              </div>

              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center space-x-3">
                  <Globe className="h-8 w-8 text-blue-500" />
                  <div>
                    <h3 className="font-semibold">Widget Web</h3>
                    <p className="text-sm text-gray-500">Integrado en sitio web</p>
                  </div>
                </div>
                <Badge className="bg-green-100 text-green-800">Activo</Badge>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
