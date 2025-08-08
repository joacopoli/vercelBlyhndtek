"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { TrendingUp, TrendingDown, Users, MessageSquare, Phone, FileText } from 'lucide-react'
import { useAppContext } from "@/lib/context/app-context"

export default function AnalyticsPanel() {
  const { state } = useAppContext()

  const metrics = [
    {
      title: "Conversaciones Totales",
      value: "2,847",
      change: "+12.5%",
      trend: "up",
      icon: MessageSquare,
      color: "text-blue-600"
    },
    {
      title: "Leads Generados",
      value: "456",
      change: "+8.2%",
      trend: "up",
      icon: Users,
      color: "text-green-600"
    },
    {
      title: "Tasa de Conversión",
      value: "16.2%",
      change: "-2.1%",
      trend: "down",
      icon: TrendingUp,
      color: "text-orange-600"
    },
    {
      title: "Llamadas Atendidas",
      value: "1,234",
      change: "+15.3%",
      trend: "up",
      icon: Phone,
      color: "text-purple-600"
    }
  ]

  const channelData = [
    { name: "WhatsApp", value: 65, color: "bg-green-500" },
    { name: "Web Chat", value: 25, color: "bg-blue-500" },
    { name: "Teléfono", value: 10, color: "bg-orange-500" }
  ]

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">Analytics</h2>
        <p className="text-gray-600">Análisis detallado de tu rendimiento</p>
      </div>

      {/* Métricas principales */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric, index) => {
          const Icon = metric.icon
          return (
            <Card key={index}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {metric.title}
                </CardTitle>
                <Icon className={`h-4 w-4 ${metric.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{metric.value}</div>
                <div className="flex items-center text-xs text-muted-foreground">
                  {metric.trend === "up" ? (
                    <TrendingUp className="mr-1 h-3 w-3 text-green-500" />
                  ) : (
                    <TrendingDown className="mr-1 h-3 w-3 text-red-500" />
                  )}
                  <span className={metric.trend === "up" ? "text-green-600" : "text-red-600"}>
                    {metric.change}
                  </span>
                  <span className="ml-1">desde el mes pasado</span>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Distribución por canal */}
        <Card>
          <CardHeader>
            <CardTitle>Distribución por Canal</CardTitle>
            <CardDescription>Porcentaje de conversaciones por canal</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {channelData.map((channel, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>{channel.name}</span>
                  <span className="font-medium">{channel.value}%</span>
                </div>
                <Progress value={channel.value} className="h-2" />
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Rendimiento semanal */}
        <Card>
          <CardHeader>
            <CardTitle>Rendimiento Semanal</CardTitle>
            <CardDescription>Actividad de los últimos 7 días</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm">Lunes</span>
                <div className="flex items-center space-x-2">
                  <Progress value={85} className="w-20 h-2" />
                  <span className="text-sm font-medium">85%</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Martes</span>
                <div className="flex items-center space-x-2">
                  <Progress value={92} className="w-20 h-2" />
                  <span className="text-sm font-medium">92%</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Miércoles</span>
                <div className="flex items-center space-x-2">
                  <Progress value={78} className="w-20 h-2" />
                  <span className="text-sm font-medium">78%</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Jueves</span>
                <div className="flex items-center space-x-2">
                  <Progress value={95} className="w-20 h-2" />
                  <span className="text-sm font-medium">95%</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Viernes</span>
                <div className="flex items-center space-x-2">
                  <Progress value={88} className="w-20 h-2" />
                  <span className="text-sm font-medium">88%</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Estadísticas detalladas */}
      <Card>
        <CardHeader>
          <CardTitle>Estadísticas Detalladas</CardTitle>
          <CardDescription>Métricas avanzadas de rendimiento</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <div className="text-2xl font-bold text-blue-600">4.2s</div>
              <div className="text-sm text-gray-600">Tiempo promedio de respuesta</div>
            </div>
            <div className="space-y-2">
              <div className="text-2xl font-bold text-green-600">94.5%</div>
              <div className="text-sm text-gray-600">Satisfacción del cliente</div>
            </div>
            <div className="space-y-2">
              <div className="text-2xl font-bold text-orange-600">€12,450</div>
              <div className="text-sm text-gray-600">Ingresos generados</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
