"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Lock, Zap, Check } from 'lucide-react'
import { useAppContext } from "@/lib/context/app-context"

interface LockedServicePanelProps {
  serviceId: string
}

export default function LockedServicePanel({ serviceId }: LockedServicePanelProps) {
  const { dispatch } = useAppContext()

  const serviceInfo = {
    conversations: {
      title: "Chatbot Web/WhatsApp",
      description: "Automatiza conversaciones con clientes potenciales",
      features: [
        "Respuestas automáticas 24/7",
        "Integración con WhatsApp Business",
        "Chat web personalizable",
        "Análisis de conversaciones"
      ],
      price: "€99/mes"
    },
    leads: {
      title: "CRM + IA Leads",
      description: "Gestión inteligente de leads con IA",
      features: [
        "Calificación automática de leads",
        "Seguimiento personalizado",
        "Integración con múltiples fuentes",
        "Reportes avanzados"
      ],
      price: "€149/mes"
    },
    valuations: {
      title: "Valoración AVM",
      description: "Sistema automático de valoración de propiedades",
      features: [
        "Valoraciones instantáneas",
        "Análisis de mercado",
        "Informes profesionales",
        "API de integración"
      ],
      price: "€199/mes"
    },
    voice: {
      title: "Call Center IA",
      description: "Asistente de voz inteligente para llamadas",
      features: [
        "Atención telefónica automatizada",
        "Reconocimiento de voz avanzado",
        "Transferencia inteligente",
        "Grabación y análisis"
      ],
      price: "€299/mes"
    },
    documents: {
      title: "Automatización Documental",
      description: "Generación automática de documentos legales",
      features: [
        "Plantillas personalizables",
        "Firma digital integrada",
        "Gestión de versiones",
        "Cumplimiento legal"
      ],
      price: "€179/mes"
    },
    reports: {
      title: "Reportes Avanzados",
      description: "Análisis e informes detallados de tu negocio",
      features: [
        "Dashboards interactivos",
        "Reportes personalizados",
        "Exportación múltiple",
        "Alertas automáticas"
      ],
      price: "€129/mes"
    }
  }

  const service = serviceInfo[serviceId as keyof typeof serviceInfo]

  if (!service) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-gray-500">Servicio no encontrado</p>
      </div>
    )
  }

  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <Card className="w-full max-w-2xl">
        <CardHeader className="text-center">
          <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
            <Lock className="h-8 w-8 text-gray-400" />
          </div>
          <CardTitle className="text-2xl">{service.title}</CardTitle>
          <CardDescription className="text-lg">
            {service.description}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="text-center">
            <Badge variant="outline" className="text-lg px-4 py-2">
              Servicio Premium
            </Badge>
          </div>

          <div className="space-y-3">
            <h3 className="font-semibold text-lg">Características incluidas:</h3>
            <ul className="space-y-2">
              {service.features.map((feature, index) => (
                <li key={index} className="flex items-center space-x-2">
                  <Check className="h-4 w-4 text-green-500" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="border-t pt-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <div className="text-2xl font-bold">{service.price}</div>
                <div className="text-sm text-gray-600">Facturación mensual</div>
              </div>
              <Button 
                size="lg"
                onClick={() => dispatch({ type: "SET_ACTIVE_SERVICE", payload: "billing" })}
              >
                <Zap className="h-4 w-4 mr-2" />
                Activar Servicio
              </Button>
            </div>
            <p className="text-sm text-gray-500 text-center">
              Puedes cancelar en cualquier momento. Sin compromisos a largo plazo.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
