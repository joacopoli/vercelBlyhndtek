"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { MessageSquare, Users, TrendingUp, Building, Phone, FileText, BarChart3, Zap, ArrowRight } from 'lucide-react'
import { useAppContext } from "@/lib/context/app-context"

export function DashboardOverview() {
  const { state, dispatch } = useAppContext()

  const stats = [
    {
      title: "Conversaciones Activas",
      value: "24",
      change: "+12%",
      icon: MessageSquare,
      color: "text-blue-600"
    },
    {
      title: "Leads Generados",
      value: "89",
      change: "+8%",
      icon: Users,
      color: "text-green-600"
    },
    {
      title: "Valoraciones Realizadas",
      value: "156",
      change: "+23%",
      icon: Building,
      color: "text-purple-600"
    },
    {
      title: "Documentos Generados",
      value: "45",
      change: "+15%",
      icon: FileText,
      color: "text-orange-600"
    }
  ]

  const services = [
    {
      id: 'conversations',
      title: 'Chatbot Web/WhatsApp',
      description: 'Automatiza conversaciones con clientes',
      icon: MessageSquare,
      isActive: true
    },
    {
      id: 'leads',
      title: 'CRM + IA Leads',
      description: 'Gestión inteligente de leads',
      icon: Users,
      isActive: true
    },
    {
      id: 'valuations',
      title: 'Valoración AVM',
      description: 'Valoraciones automáticas de propiedades',
      icon: Building,
      isActive: false
    },
    {
      id: 'voice',
      title: 'Call Center IA',
      description: 'Asistente de voz para llamadas',
      icon: Phone,
      isActive: false
    },
    {
      id: 'documents',
      title: 'Automatización Documental',
      description: 'Generación automática de documentos',
      icon: FileText,
      isActive: false
    },
    {
      id: 'reports',
      title: 'Reportes Avanzados',
      description: 'Análisis e informes detallados',
      icon: BarChart3,
      isActive: false
    }
  ]

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <p className="text-gray-600">Bienvenido de vuelta, {state.user?.name}</p>
        </div>
        <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
          Plan {state.company?.plan}
        </Badge>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon
          return (
            <Card key={index}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {stat.title}
                </CardTitle>
                <Icon className={`h-4 w-4 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <div className="flex items-center text-xs text-muted-foreground">
                  <TrendingUp className="mr-1 h-3 w-3 text-green-500" />
                  {stat.change} desde el mes pasado
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Services Grid */}
      <div>
        <h2 className="text-lg font-semibold mb-4">Servicios Disponibles</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => {
            const Icon = service.icon
            const isActive = state.company?.services.find(s => s.id === service.id)?.isActive
            
            return (
              <Card key={service.id} className={`relative ${!isActive ? 'opacity-75' : ''}`}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <Icon className={`h-8 w-8 ${isActive ? 'text-blue-600' : 'text-gray-400'}`} />
                    {isActive ? (
                      <Badge className="bg-green-100 text-green-800">Activo</Badge>
                    ) : (
                      <Badge variant="outline">Inactivo</Badge>
                    )}
                  </div>
                  <CardTitle className="text-lg">{service.title}</CardTitle>
                  <CardDescription>{service.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button
                    variant={isActive ? "default" : "outline"}
                    className="w-full"
                    onClick={() => dispatch({ type: 'SET_VIEW', payload: service.id })}
                  >
                    {isActive ? (
                      <>
                        Abrir Servicio
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </>
                    ) : (
                      <>
                        <Zap className="mr-2 h-4 w-4" />
                        Activar Servicio
                      </>
                    )}
                  </Button>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle>Actividad Reciente</CardTitle>
          <CardDescription>Últimas acciones en tu cuenta</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <div className="flex-1">
                <p className="text-sm font-medium">Nuevo lead generado desde WhatsApp</p>
                <p className="text-xs text-gray-500">Hace 2 minutos</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <div className="flex-1">
                <p className="text-sm font-medium">Conversación iniciada en web chat</p>
                <p className="text-xs text-gray-500">Hace 15 minutos</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
              <div className="flex-1">
                <p className="text-sm font-medium">Valoración AVM completada</p>
                <p className="text-xs text-gray-500">Hace 1 hora</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
