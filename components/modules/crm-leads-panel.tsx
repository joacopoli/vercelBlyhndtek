"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, Filter, Plus, Phone, Mail, MapPin, Calendar, Star } from 'lucide-react'
import { useAppContext } from "@/lib/context/app-context"

export default function CRMLeadsPanel() {
  const { state } = useAppContext()
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedStatus, setSelectedStatus] = useState("all")

  const filteredLeads = state.leads.filter(lead => {
    const matchesSearch = lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         lead.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         lead.phone.includes(searchTerm)
    const matchesStatus = selectedStatus === "all" || lead.status === selectedStatus
    return matchesSearch && matchesStatus
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "new": return "bg-blue-100 text-blue-800"
      case "contacted": return "bg-yellow-100 text-yellow-800"
      case "qualified": return "bg-green-100 text-green-800"
      case "proposal": return "bg-purple-100 text-purple-800"
      case "closed": return "bg-gray-100 text-gray-800"
      default: return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "new": return "Nuevo"
      case "contacted": return "Contactado"
      case "qualified": return "Calificado"
      case "proposal": return "Propuesta"
      case "closed": return "Cerrado"
      default: return "Desconocido"
    }
  }

  const getScoreColor = (score: number) => {
    if (score >= 8) return "text-green-600"
    if (score >= 6) return "text-yellow-600"
    return "text-red-600"
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold mb-2">CRM - Gestión de Leads</h2>
          <p className="text-gray-600">Administra y da seguimiento a tus leads</p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Nuevo Lead
        </Button>
      </div>

      {/* Filtros y búsqueda */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Buscar leads por nombre, email o teléfono..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2">
              <Button
                variant={selectedStatus === "all" ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedStatus("all")}
              >
                Todos
              </Button>
              <Button
                variant={selectedStatus === "new" ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedStatus("new")}
              >
                Nuevos
              </Button>
              <Button
                variant={selectedStatus === "qualified" ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedStatus("qualified")}
              >
                Calificados
              </Button>
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 mr-2" />
                Filtros
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Estadísticas rápidas */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-blue-600">
              {state.leads.filter(l => l.status === "new").length}
            </div>
            <p className="text-sm text-gray-600">Leads Nuevos</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-green-600">
              {state.leads.filter(l => l.status === "qualified").length}
            </div>
            <p className="text-sm text-gray-600">Calificados</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-purple-600">
              {state.leads.filter(l => l.status === "proposal").length}
            </div>
            <p className="text-sm text-gray-600">En Propuesta</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-orange-600">
              {(state.leads.filter(l => l.status === "qualified").length / state.leads.length * 100).toFixed(1)}%
            </div>
            <p className="text-sm text-gray-600">Tasa Conversión</p>
          </CardContent>
        </Card>
      </div>

      {/* Lista de leads */}
      <Card>
        <CardHeader>
          <CardTitle>Leads ({filteredLeads.length})</CardTitle>
          <CardDescription>Lista de todos tus leads y su información</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredLeads.map((lead) => (
              <div key={lead.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-4">
                    <Avatar>
                      <AvatarImage src={`/generic-placeholder-graphic.png?height=40&width=40`} />
                      <AvatarFallback>{lead.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <h3 className="font-semibold">{lead.name}</h3>
                        <Badge className={getStatusColor(lead.status)}>
                          {getStatusText(lead.status)}
                        </Badge>
                        <div className="flex items-center space-x-1">
                          <Star className={`h-3 w-3 ${getScoreColor(lead.score)}`} />
                          <span className={`text-sm font-medium ${getScoreColor(lead.score)}`}>
                            {lead.score}
                          </span>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-gray-600 mb-2">
                        <div className="flex items-center space-x-1">
                          <Mail className="h-3 w-3" />
                          <span>{lead.email}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Phone className="h-3 w-3" />
                          <span>{lead.phone}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <MapPin className="h-3 w-3" />
                          <span>{lead.propertyInterest}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Calendar className="h-3 w-3" />
                          <span>{lead.lastActivity.toLocaleDateString()}</span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="text-sm">
                          <span className="text-gray-500">Presupuesto: </span>
                          <span className="font-medium">{lead.budget}</span>
                        </div>
                        <div className="text-sm">
                          <span className="text-gray-500">Fuente: </span>
                          <span className="font-medium">{lead.source}</span>
                        </div>
                        {lead.assignedTo && (
                          <div className="text-sm">
                            <span className="text-gray-500">Asignado a: </span>
                            <span className="font-medium">{lead.assignedTo}</span>
                          </div>
                        )}
                      </div>

                      {lead.notes && lead.notes.length > 0 && (
                        <div className="mt-2">
                          <div className="text-xs text-gray-500 mb-1">Notas:</div>
                          <div className="flex flex-wrap gap-1">
                            {lead.notes.slice(0, 3).map((note, index) => (
                              <Badge key={index} variant="outline" className="text-xs">
                                {note}
                              </Badge>
                            ))}
                            {lead.notes.length > 3 && (
                              <Badge variant="outline" className="text-xs">
                                +{lead.notes.length - 3} más
                              </Badge>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm">
                      <Phone className="h-3 w-3 mr-1" />
                      Llamar
                    </Button>
                    <Button variant="outline" size="sm">
                      <Mail className="h-3 w-3 mr-1" />
                      Email
                    </Button>
                    <Button size="sm">
                      Ver Detalles
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredLeads.length === 0 && (
            <div className="text-center py-8">
              <Search className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No se encontraron leads</h3>
              <p className="text-gray-500">
                {searchTerm ? "Intenta con otros términos de búsqueda" : "Aún no tienes leads registrados"}
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
