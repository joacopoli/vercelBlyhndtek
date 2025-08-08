"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, Plus, Building2, Users, TrendingUp, Mail, Phone } from 'lucide-react'
import { useAppContext } from "@/lib/context/app-context"

export default function PartnerManagement() {
  const { state } = useAppContext()
  const [searchTerm, setSearchTerm] = useState("")

  const partners = [
    {
      id: "1",
      name: "Inmobiliaria García",
      type: "Agencia",
      status: "active",
      leads: 45,
      revenue: 2850,
      contact: "info@garciaproperties.com",
      phone: "+34 91 123 4567",
      joinDate: "2024-01-15"
    },
    {
      id: "2",
      name: "PropTech Solutions",
      type: "Tecnología",
      status: "active",
      leads: 78,
      revenue: 4200,
      contact: "contact@proptech.es",
      phone: "+34 93 987 6543",
      joinDate: "2024-02-20"
    },
    {
      id: "3",
      name: "Valoraciones Madrid",
      type: "Tasación",
      status: "pending",
      leads: 12,
      revenue: 890,
      contact: "admin@valormadrid.com",
      phone: "+34 91 555 0123",
      joinDate: "2024-03-10"
    }
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": return "bg-green-100 text-green-800"
      case "pending": return "bg-yellow-100 text-yellow-800"
      case "inactive": return "bg-gray-100 text-gray-800"
      default: return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "active": return "Activo"
      case "pending": return "Pendiente"
      case "inactive": return "Inactivo"
      default: return "Desconocido"
    }
  }

  const filteredPartners = partners.filter(partner =>
    partner.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    partner.type.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold mb-2">Gestión de Socios</h2>
          <p className="text-gray-600">Administra tu red de partners y colaboradores</p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Nuevo Socio
        </Button>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList>
          <TabsTrigger value="overview">Resumen</TabsTrigger>
          <TabsTrigger value="partners">Socios</TabsTrigger>
          <TabsTrigger value="performance">Rendimiento</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Métricas generales */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center space-x-2">
                  <Building2 className="h-8 w-8 text-blue-600" />
                  <div>
                    <div className="text-2xl font-bold">{partners.length}</div>
                    <p className="text-sm text-gray-600">Socios Totales</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center space-x-2">
                  <Users className="h-8 w-8 text-green-600" />
                  <div>
                    <div className="text-2xl font-bold">
                      {partners.reduce((sum, p) => sum + p.leads, 0)}
                    </div>
                    <p className="text-sm text-gray-600">Leads Generados</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center space-x-2">
                  <TrendingUp className="h-8 w-8 text-orange-600" />
                  <div>
                    <div className="text-2xl font-bold">
                      €{partners.reduce((sum, p) => sum + p.revenue, 0).toLocaleString()}
                    </div>
                    <p className="text-sm text-gray-600">Ingresos Totales</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center space-x-2">
                  <Building2 className="h-8 w-8 text-purple-600" />
                  <div>
                    <div className="text-2xl font-bold">
                      {partners.filter(p => p.status === "active").length}
                    </div>
                    <p className="text-sm text-gray-600">Socios Activos</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Top performers */}
          <Card>
            <CardHeader>
              <CardTitle>Mejores Socios del Mes</CardTitle>
              <CardDescription>Socios con mejor rendimiento</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {partners.slice(0, 3).map((partner, index) => (
                  <div key={partner.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                        <span className="text-sm font-bold text-blue-600">#{index + 1}</span>
                      </div>
                      <div>
                        <h3 className="font-medium">{partner.name}</h3>
                        <p className="text-sm text-gray-500">{partner.type}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold">{partner.leads} leads</div>
                      <div className="text-sm text-gray-500">€{partner.revenue}</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="partners" className="space-y-6">
          {/* Búsqueda y filtros */}
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="Buscar socios..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">Todos</Button>
                  <Button variant="outline" size="sm">Activos</Button>
                  <Button variant="outline" size="sm">Pendientes</Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Lista de socios */}
          <Card>
            <CardHeader>
              <CardTitle>Lista de Socios ({filteredPartners.length})</CardTitle>
              <CardDescription>Todos tus socios y colaboradores</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredPartners.map((partner) => (
                  <div key={partner.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-4">
                        <Avatar>
                          <AvatarImage src={`/generic-placeholder-graphic.png?height=40&width=40`} />
                          <AvatarFallback>{partner.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-1">
                            <h3 className="font-semibold">{partner.name}</h3>
                            <Badge className={getStatusColor(partner.status)}>
                              {getStatusText(partner.status)}
                            </Badge>
                          </div>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-gray-600 mb-2">
                            <div className="flex items-center space-x-1">
                              <Building2 className="h-3 w-3" />
                              <span>{partner.type}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Mail className="h-3 w-3" />
                              <span>{partner.contact}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Phone className="h-3 w-3" />
                              <span>{partner.phone}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Users className="h-3 w-3" />
                              <span>{partner.leads} leads generados</span>
                            </div>
                          </div>

                          <div className="flex items-center justify-between">
                            <div className="text-sm">
                              <span className="text-gray-500">Ingresos: </span>
                              <span className="font-medium">€{partner.revenue}</span>
                            </div>
                            <div className="text-sm">
                              <span className="text-gray-500">Desde: </span>
                              <span className="font-medium">
                                {new Date(partner.joinDate).toLocaleDateString()}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">
                          <Mail className="h-3 w-3 mr-1" />
                          Contactar
                        </Button>
                        <Button size="sm">
                          Ver Detalles
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="performance" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Rendimiento por Socio</CardTitle>
              <CardDescription>Análisis detallado del rendimiento</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {partners.map((partner) => (
                  <div key={partner.id} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-semibold">{partner.name}</h3>
                      <Badge className={getStatusColor(partner.status)}>
                        {getStatusText(partner.status)}
                      </Badge>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="text-center p-3 bg-gray-50 rounded">
                        <div className="text-2xl font-bold text-blue-600">{partner.leads}</div>
                        <div className="text-sm text-gray-600">Leads</div>
                      </div>
                      <div className="text-center p-3 bg-gray-50 rounded">
                        <div className="text-2xl font-bold text-green-600">€{partner.revenue}</div>
                        <div className="text-sm text-gray-600">Ingresos</div>
                      </div>
                      <div className="text-center p-3 bg-gray-50 rounded">
                        <div className="text-2xl font-bold text-orange-600">
                          {partner.leads > 0 ? Math.round(partner.revenue / partner.leads) : 0}€
                        </div>
                        <div className="text-sm text-gray-600">Por Lead</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
