"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FileText, Download, Send, Plus, Clock, CheckCircle, AlertCircle } from 'lucide-react'
import { useAppContext } from "@/lib/context/app-context"

export default function DocumentAutomation() {
  const { state } = useAppContext()
  const [selectedTemplate, setSelectedTemplate] = useState("")

  const templates = [
    { id: "contract", name: "Contrato de Arras", description: "Contrato de reserva de propiedad" },
    { id: "nda", name: "Acuerdo de Confidencialidad", description: "NDA para valoraciones" },
    { id: "valuation", name: "Informe de Valoración", description: "Reporte detallado de valoración" },
    { id: "rental", name: "Contrato de Alquiler", description: "Contrato de arrendamiento" },
  ]

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "signed": return <CheckCircle className="h-4 w-4 text-green-500" />
      case "pending": return <Clock className="h-4 w-4 text-yellow-500" />
      case "draft": return <FileText className="h-4 w-4 text-gray-500" />
      default: return <AlertCircle className="h-4 w-4 text-red-500" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "signed": return "bg-green-100 text-green-800"
      case "pending": return "bg-yellow-100 text-yellow-800"
      case "draft": return "bg-gray-100 text-gray-800"
      default: return "bg-red-100 text-red-800"
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "signed": return "Firmado"
      case "pending": return "Pendiente"
      case "draft": return "Borrador"
      default: return "Error"
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">Automatización Documental</h2>
        <p className="text-gray-600">Genera y gestiona documentos automáticamente</p>
      </div>

      <Tabs defaultValue="generate" className="space-y-6">
        <TabsList>
          <TabsTrigger value="generate">Generar Documento</TabsTrigger>
          <TabsTrigger value="documents">Documentos</TabsTrigger>
          <TabsTrigger value="templates">Plantillas</TabsTrigger>
        </TabsList>

        <TabsContent value="generate" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Plus className="h-5 w-5" />
                <span>Nuevo Documento</span>
              </CardTitle>
              <CardDescription>
                Selecciona una plantilla y completa los datos para generar un documento
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="template">Plantilla</Label>
                <select
                  id="template"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  value={selectedTemplate}
                  onChange={(e) => setSelectedTemplate(e.target.value)}
                >
                  <option value="">Selecciona una plantilla</option>
                  {templates.map((template) => (
                    <option key={template.id} value={template.id}>
                      {template.name}
                    </option>
                  ))}
                </select>
              </div>

              {selectedTemplate && (
                <div className="space-y-4 p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-semibold">Datos del documento</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="client-name">Nombre del Cliente</Label>
                      <Input id="client-name" placeholder="María González" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="client-email">Email del Cliente</Label>
                      <Input id="client-email" type="email" placeholder="maria@email.com" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="property-address">Dirección de la Propiedad</Label>
                      <Input id="property-address" placeholder="Calle Mayor 123, Madrid" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="amount">Importe</Label>
                      <Input id="amount" type="number" placeholder="250000" />
                    </div>
                  </div>
                  
                  <div className="flex space-x-2">
                    <Button className="flex-1">
                      <FileText className="h-4 w-4 mr-2" />
                      Generar Documento
                    </Button>
                    <Button variant="outline">
                      Vista Previa
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="documents" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Documentos Generados</CardTitle>
              <CardDescription>Lista de todos los documentos creados</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {state.documents.map((document) => (
                  <div key={document.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-4">
                      {getStatusIcon(document.status)}
                      <div>
                        <h3 className="font-semibold">{document.name}</h3>
                        <div className="flex items-center space-x-2 text-sm text-gray-500">
                          <span>{document.clientName}</span>
                          <span>•</span>
                          <span>{document.createdDate.toLocaleDateString()}</span>
                          <Badge className={getStatusColor(document.status)}>
                            {getStatusText(document.status)}
                          </Badge>
                        </div>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">
                        <Download className="h-3 w-3 mr-1" />
                        Descargar
                      </Button>
                      {document.status === "draft" && (
                        <Button size="sm">
                          <Send className="h-3 w-3 mr-1" />
                          Enviar
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="templates" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Plantillas Disponibles</CardTitle>
              <CardDescription>Gestiona las plantillas de documentos</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {templates.map((template) => (
                  <Card key={template.id}>
                    <CardContent className="pt-6">
                      <div className="flex items-center space-x-3 mb-3">
                        <FileText className="h-8 w-8 text-blue-500" />
                        <div>
                          <h3 className="font-semibold">{template.name}</h3>
                          <p className="text-sm text-gray-600">{template.description}</p>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm" className="flex-1">
                          Editar
                        </Button>
                        <Button size="sm" className="flex-1">
                          Usar Plantilla
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
