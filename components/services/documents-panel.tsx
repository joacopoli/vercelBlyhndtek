"use client"

import { useState } from "react"
import { useApp } from "@/lib/context/app-context"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import LockedServicePanel from "./locked-service-panel"
import { FileText, Plus, Download, Send, Eye, Edit, CheckCircle, Clock, AlertCircle, PenTool, Upload, Search } from 'lucide-react'
import DocumentAutomation from "../modules/document-automation"

export default function DocumentsPanel() {
  const { state } = useApp()
  const [selectedTemplate, setSelectedTemplate] = useState("")
  const [selectedClient, setSelectedClient] = useState("")

  const documentMetrics = {
    totalDocuments: 47,
    pendingSignature: 12,
    signed: 28,
    drafts: 7,
    avgSigningTime: "2.3 días",
  }

  const documents = [
    {
      id: "doc_001",
      name: "Contrato de Arras - María González",
      type: "Contrato de Arras",
      client: "María González",
      status: "pending" as const,
      createdDate: new Date(Date.now() - 86400000),
      signedDate: null,
      progress: 75,
      signers: [
        { name: "María González", signed: true, signedAt: new Date(Date.now() - 3600000) },
        { name: "Inmobiliaria Premium", signed: false, signedAt: null },
      ],
    },
    {
      id: "doc_002",
      name: "Nota de Encargo - Carlos Ruiz",
      type: "Nota de Encargo",
      client: "Carlos Ruiz",
      status: "signed" as const,
      createdDate: new Date(Date.now() - 172800000),
      signedDate: new Date(Date.now() - 86400000),
      progress: 100,
      signers: [
        { name: "Carlos Ruiz", signed: true, signedAt: new Date(Date.now() - 90000000) },
        { name: "Inmobiliaria Premium", signed: true, signedAt: new Date(Date.now() - 86400000) },
      ],
    },
    {
      id: "doc_003",
      name: "Contrato de Alquiler - Ana Martín",
      type: "Contrato de Alquiler",
      client: "Ana Martín",
      status: "draft" as const,
      createdDate: new Date(Date.now() - 3600000),
      signedDate: null,
      progress: 25,
      signers: [],
    },
  ]

  const templates = [
    {
      id: "tpl_001",
      name: "Contrato de Arras",
      description: "Para reservar una propiedad con señal",
      fields: ["Datos del comprador", "Datos de la propiedad", "Importe de la señal", "Fecha de firma definitiva"],
    },
    {
      id: "tpl_002",
      name: "Nota de Encargo de Venta",
      description: "Autorización para comercializar una propiedad",
      fields: ["Datos del propietario", "Descripción de la propiedad", "Precio de venta", "Comisión"],
    },
    {
      id: "tpl_003",
      name: "Contrato de Alquiler",
      description: "Contrato de arrendamiento de vivienda",
      fields: ["Datos del inquilino", "Datos del propietario", "Renta mensual", "Duración del contrato"],
    },
    {
      id: "tpl_004",
      name: "Contrato de Compraventa",
      description: "Contrato definitivo de compraventa",
      fields: ["Datos del comprador", "Datos del vendedor", "Precio final", "Condiciones especiales"],
    },
  ]

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "draft":
        return <Edit className="w-4 h-4 text-yellow-600" />
      case "pending":
        return <Clock className="w-4 h-4 text-blue-600" />
      case "signed":
        return <CheckCircle className="w-4 h-4 text-green-600" />
      default:
        return <FileText className="w-4 h-4 text-gray-500" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "draft":
        return "bg-yellow-100 text-yellow-800"
      case "pending":
        return "bg-blue-100 text-blue-800"
      case "signed":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "draft":
        return "Borrador"
      case "pending":
        return "Pendiente Firma"
      case "signed":
        return "Firmado"
      default:
        return "Desconocido"
    }
  }

  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-full">
      {/* Header */}
      <LockedServicePanel
        serviceName="Gestión de Documentos"
        description="Automatiza la creación y gestión de contratos y documentos legales."
        features={[
          'Plantillas de contratos',
          'Firma electrónica',
          'Generación automática de documentos',
          'Almacenamiento seguro en la nube',
          'Control de versiones',
          'Integración con DocuSign'
        ]}
      />

      {/* Métricas */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <Card className="p-4">
          <div className="flex items-center space-x-2 mb-2">
            <FileText className="w-4 h-4 text-violet-600" />
            <span className="text-sm font-medium text-gray-600">Total</span>
          </div>
          <div className="text-2xl font-bold text-violet-600">{documentMetrics.totalDocuments}</div>
          <div className="text-xs text-green-600 mt-1">+8 este mes</div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center space-x-2 mb-2">
            <Clock className="w-4 h-4 text-blue-600" />
            <span className="text-sm font-medium text-gray-600">Pendientes</span>
          </div>
          <div className="text-2xl font-bold text-blue-600">{documentMetrics.pendingSignature}</div>
          <div className="text-xs text-blue-600 mt-1">Esperando firma</div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center space-x-2 mb-2">
            <CheckCircle className="w-4 h-4 text-green-600" />
            <span className="text-sm font-medium text-gray-600">Firmados</span>
          </div>
          <div className="text-2xl font-bold text-green-600">{documentMetrics.signed}</div>
          <div className="text-xs text-green-600 mt-1">Completados</div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center space-x-2 mb-2">
            <Edit className="w-4 h-4 text-yellow-600" />
            <span className="text-sm font-medium text-gray-600">Borradores</span>
          </div>
          <div className="text-2xl font-bold text-yellow-600">{documentMetrics.drafts}</div>
          <div className="text-xs text-yellow-600 mt-1">En edición</div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center space-x-2 mb-2">
            <PenTool className="w-4 h-4 text-purple-600" />
            <span className="text-sm font-medium text-gray-600">Tiempo Firma</span>
          </div>
          <div className="text-2xl font-bold text-purple-600">{documentMetrics.avgSigningTime}</div>
          <div className="text-xs text-purple-600 mt-1">Promedio</div>
        </Card>
      </div>

      {/* Contenido principal */}
      <DocumentAutomation />
    </div>
  )
}
