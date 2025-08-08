"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import LockedServicePanel from "./locked-service-panel"
import { Phone, Mic, Play, Pause } from 'lucide-react'

export default function VoicePanel() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">Call Center IA</h2>
        <p className="text-gray-600">Asistente de voz para llamadas automáticas</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Estado del Servicio</CardTitle>
          <CardDescription>El servicio de voz está en desarrollo</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <Phone className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Próximamente</h3>
            <p className="text-gray-600 mb-4">
              El Call Center IA estará disponible pronto con funciones avanzadas de reconocimiento de voz
            </p>
            <Badge variant="outline">En Desarrollo</Badge>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

// const [selectedCall, setSelectedCall] = useState<string | null>(null)
// const [isPlaying, setIsPlaying] = useState(false)

// const callMetrics = {
//   totalCalls: 234,
//   aiHandled: 95,
//   avgDuration: "1:45",
//   leadsGenerated: 18,
//   conversionRate: 7.7,
//   responseTime: "0.8s",
// }

// const callLogs = [
//   {
//     id: "call_001",
//     clientName: "María González",
//     phone: "+34 600 123 456",
//     type: "incoming" as const,
//     duration: "2:34",
//     outcome: "Visita agendada para mañana 15:00",
//     timestamp: new Date(Date.now() - 3600000),
//     aiHandled: true,
//     leadGenerated: true,
//     sentiment: "positive" as const,
//     transcription:
//       "Cliente interesada en apartamento 3 habitaciones zona Salamanca. Presupuesto 350k. Disponible mañana tarde.",
//     audioUrl: "#",
//   },
//   {
//     id: "call_002",
//     clientName: "Carlos Ruiz",
//     phone: "+34 600 234 567",
//     type: "outgoing" as const,
//     duration: "1:12",
//     outcome: "Información enviada por WhatsApp",
//     timestamp: new Date(Date.now() - 7200000),
//     aiHandled: true,
//     leadGenerated: false,
//     sentiment: "neutral" as const,
//     transcription: "Seguimiento de consulta web. Cliente solicita más fotos del piso en Chamberí.",
//     audioUrl: "#",
//   },
//   {
//     id: "call_003",
//     clientName: "Ana Martín",
//     phone: "+34 600 345 678",
//     type: "incoming" as const,
//     duration: "0:45",
//     outcome: "Consulta resuelta - No interesado",
//     timestamp: new Date(Date.now() - 10800000),
//     aiHandled: true,
//     leadGenerated: false,
//     sentiment: "negative" as const,
//     transcription: "Cliente buscaba alquiler, no venta. Fuera del target.",
//     audioUrl: "#",
//   },
//   {
//     id: "call_004",
//     clientName: "Luis Fernández",
//     phone: "+34 600 456 789",
//     type: "incoming" as const,
//     duration: "3:21",
//     outcome: "Transferido a agente humano",
//     timestamp: new Date(Date.now() - 14400000),
//     aiHandled: false,
//     leadGenerated: true,
//     sentiment: "positive" as const,
//     transcription: "Consulta compleja sobre financiación. IA transfirió a especialista.",
//     audioUrl: "#",
//   },
// ]

// const getSentimentColor = (sentiment: string) => {
//   switch (sentiment) {
//     case "positive":
//       return "text-green-600 bg-green-50"
//     case "negative":
//       return "text-red-600 bg-red-50"
//     default:
//       return "text-yellow-600 bg-yellow-50"
//   }
// }

// const getOutcomeColor = (outcome: string) => {
//   if (outcome.includes("agendada")) return "bg-green-100 text-green-800"
//   if (outcome.includes("Transferido")) return "bg-blue-100 text-blue-800"
//   if (outcome.includes("No interesado")) return "bg-red-100 text-red-800"
//   return "bg-gray-100 text-gray-800"
// }

// return (
//   <div className="p-6 space-y-6 bg-gray-50 min-h-full">
//     {/* Header */}
//     <div className="flex items-center justify-between">
//       <div>
//         <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">Asistente de Voz IA</h1>
//         <p className="text-gray-600 mt-1">Automatiza llamadas y gestiona leads con nuestro asistente de voz inteligente.</p>
//       </div>
//       <div className="flex items-center space-x-2">
//         <Badge className="bg-green-100 text-green-800">
//           <Mic className="w-3 h-3 mr-1" />
//           IA Activa
//         </Badge>
//       </div>
//     </div>

//     {/* Métricas principales */}
//     <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
//       <Card className="p-4">
//         <div className="flex items-center space-x-2 mb-2">
//           <Phone className="w-4 h-4 text-violet-600" />
//           <span className="text-sm font-medium text-gray-600">Total Llamadas</span>
//         </div>
//         <div className="text-2xl font-bold text-violet-600">{callMetrics.totalCalls}</div>
//         <div className="text-xs text-green-600 mt-1">+15% vs mes anterior</div>
//       </Card>

//       <Card className="p-4">
//         <div className="flex items-center space-x-2 mb-2">
//           <Mic className="w-4 h-4 text-green-600" />
//           <span className="text-sm font-medium text-gray-600">% IA</span>
//         </div>
//         <div className="text-2xl font-bold text-green-600">{callMetrics.aiHandled}%</div>
//         <div className="text-xs text-green-600 mt-1">Automatización</div>
//       </Card>

//       <Card className="p-4">
//         <div className="flex items-center space-x-2 mb-2">
//           <Play className="w-4 h-4 text-blue-600" />
//           <Pause className="w-4 h-4 text-blue-600" />
//           <span className="text-sm font-medium text-gray-600">Duración Media</span>
//         </div>
//         <div className="text-2xl font-bold text-blue-600">{callMetrics.avgDuration}</div>
//         <div className="text-xs text-blue-600 mt-1">min por llamada</div>
//       </Card>

//       <Card className="p-4">
//         <div className="flex items-center space-x-2 mb-2">
//           <Badge className="bg-orange-100 text-orange-800">
//             <Phone className="w-3 h-3 mr-1" />
//             Leads
//           </Badge>
//           <span className="text-sm font-medium text-gray-600">Generados</span>
//         </div>
//         <div className="text-2xl font-bold text-orange-600">{callMetrics.leadsGenerated}</div>
//         <div className="text-xs text-orange-600 mt-1">Leads generados</div>
//       </Card>

//       <Card className="p-4">
//         <div className="flex items-center space-x-2 mb-2">
//           <Badge className="bg-purple-100 text-purple-800">
//             <Phone className="w-3 h-3 mr-1" />
//             Conversión
//           </Badge>
//           <span className="text-sm font-medium text-gray-600">Llamada → Lead</span>
//         </div>
//         <div className="text-2xl font-bold text-purple-600">{callMetrics.conversionRate}%</div>
//         <div className="text-xs text-purple-600 mt-1">Conversión de llamadas a leads</div>
//       </Card>

//       <Card className="p-4">
//         <div className="flex items-center space-x-2 mb-2">
//           <Badge className="bg-indigo-100 text-indigo-800">
//             <Phone className="w-3 h-3 mr-1" />
//             Respuesta
//           </Badge>
//           <span className="text-sm font-medium text-gray-600">Tiempo medio</span>
//         </div>
//         <div className="text-2xl font-bold text-indigo-600">{callMetrics.responseTime}</div>
//         <div className="text-xs text-indigo-600 mt-1">Tiempo medio de respuesta</div>
//       </Card>
//     </div>

//     {/* Contenido principal */}
//     <Tabs defaultValue="calls" className="space-y-6">
//       <TabsList className="grid w-full grid-cols-3">
//         <TabsTrigger value="calls">Registro de Llamadas</TabsTrigger>
//         <TabsTrigger value="analytics">Analíticas</TabsTrigger>
//         <TabsTrigger value="settings">Configuración IA</TabsTrigger>
//       </TabsList>

//       <TabsContent value="calls" className="space-y-6">
//         <Card>
//           <CardHeader>
//             <div className="flex items-center justify-between">
//               <CardTitle>Llamadas Recientes</CardTitle>
//               <div className="flex items-center space-x-2">
//                 <Input placeholder="Buscar por teléfono..." className="w-64" />
//                 <Button variant="outline">
//                   <Phone className="w-4 h-4 mr-2" />
//                   Exportar
//                 </Button>
//               </div>
//             </div>
//           </CardHeader>
//           <CardContent>
//             <div className="space-y-4">
//               {callLogs.map((call) => (
//                 <div
//                   key={call.id}
//                   className={`p-4 border rounded-lg cursor-pointer transition-colors ${
//                     selectedCall === call.id ? "bg-violet-50 border-violet-200" : "bg-white hover:bg-gray-50"
//                   }`}
//                   onClick={() => setSelectedCall(selectedCall === call.id ? null : call.id)}
//                 >
//                   <div className="flex items-center justify-between">
//                     <div className="flex items-center space-x-4">
//                       <div className="flex items-center space-x-2">
//                         {call.type === "incoming" ? (
//                           <Phone className="w-4 h-4 text-green-600" />
//                         ) : (
//                           <Phone className="w-4 h-4 text-blue-600" />
//                         )}
//                         <div>
//                           <h3 className="font-medium text-gray-900">{call.clientName}</h3>
//                           <p className="text-sm text-gray-600">{call.phone}</p>
//                         </div>
//                       </div>

//                       <div className="flex items-center space-x-2">
//                         {call.aiHandled ? (
//                           <Badge variant="outline" className="bg-green-50 text-green-700">
//                             <Mic className="w-3 h-3 mr-1" />
//                             IA
//                           </Badge>
//                         ) : (
//                           <Badge variant="outline" className="bg-blue-50 text-blue-700">
//                             <Phone className="w-3 h-3 mr-1" />
//                             Humano
//                           </Badge>
//                         )}

//                         {call.leadGenerated && <Badge className="bg-orange-100 text-orange-800">Lead</Badge>}

//                         <Badge className={getSentimentColor(call.sentiment)}>{call.sentiment}</Badge>
//                       </div>
//                     </div>

//                     <div className="flex items-center space-x-4">
//                       <div className="text-right">
//                         <div className="text-sm font-medium">{call.duration}</div>
//                         <div className="text-xs text-gray-500">{call.timestamp.toLocaleTimeString()}</div>
//                       </div>

//                       <Button
//                         variant="ghost"
//                         size="sm"
//                         onClick={(e) => {
//                           e.stopPropagation()
//                           setIsPlaying(!isPlaying)
//                         }}
//                       >
//                         {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
//                       </Button>
//                     </div>
//                   </div>

//                   <div className="mt-3">
//                     <Badge className={getOutcomeColor(call.outcome)}>{call.outcome}</Badge>
//                   </div>

//                   {selectedCall === call.id && (
//                     <div className="mt-4 p-3 bg-gray-50 rounded-lg">
//                       <h4 className="font-medium text-gray-900 mb-2">Transcripción:</h4>
//                       <p className="text-sm text-gray-700">{call.transcription}</p>

//                       <div className="flex items-center justify-between mt-3">
//                         <div className="text-xs text-gray-500">Procesado por IA • Confianza: 94%</div>
//                         <Button variant="outline" size="sm">
//                           <Phone className="w-3 h-3 mr-1" />
//                           Descargar Audio
//                         </Button>
//                       </div>
//                     </div>
//                   )}
//                 </div>
//               ))}
//             </div>
//           </CardContent>
//         </Card>
//       </TabsContent>

//       <TabsContent value="analytics" className="space-y-6">
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//           <Card>
//             <CardHeader>
//               <CardTitle>Rendimiento por Hora</CardTitle>
//             </CardHeader>
//             <CardContent>
//               <div className="h-64 flex items-center justify-center text-gray-500">
//                 Gráfico de llamadas por hora del día
//               </div>
//             </CardContent>
//           </Card>

//           <Card>
//             <CardHeader>
//               <CardTitle>Tipos de Consulta</CardTitle>
//             </CardHeader>
//             <CardContent>
//               <div className="space-y-3">
//                 <div className="flex justify-between items-center">
//                   <span className="text-sm">Información de propiedades</span>
//                   <span className="text-sm font-medium">45%</span>
//                 </div>
//                 <div className="flex justify-between items-center">
//                   <span className="text-sm">Agendar visitas</span>
//                   <span className="text-sm font-medium">30%</span>
//                 </div>
//                 <div className="flex justify-between items-center">
//                   <span className="text-sm">Consultas de precio</span>
//                   <span className="text-sm font-medium">15%</span>
//                 </div>
//                 <div className="flex justify-between items-center">
//                   <span className="text-sm">Otros</span>
//                   <span className="text-sm font-medium">10%</span>
//                 </div>
//               </div>
//             </CardContent>
//           </Card>
//         </div>
//       </TabsContent>

//       <TabsContent value="settings" className="space-y-6">
//         <Card>
//           <CardHeader>
//             <CardTitle>Configuración del Asistente de Voz</CardTitle>
//           </CardHeader>
//           <CardContent className="space-y-6">
//             <div>
//               <label className="text-sm font-medium text-gray-700">Mensaje de Bienvenida</label>
//               <textarea
//                 className="w-full mt-2 p-3 border border-gray-300 rounded-md"
//                 rows={3}
//                 defaultValue="Hola, soy el asistente virtual de Inmobiliaria Premium. ¿En qué puedo ayudarte hoy?"
//               />
//             </div>

//             <div>
//               <label className="text-sm font-medium text-gray-700">Horario de Atención IA</label>
//               <div className="grid grid-cols-2 gap-4 mt-2">
//                 <div>
//                   <label className="text-xs text-gray-500">Desde</label>
//                   <Input type="time" defaultValue="09:00" />
//                 </div>
//                 <div>
//                   <label className="text-xs text-gray-500">Hasta</label>
//                   <Input type="time" defaultValue="21:00" />
//                 </div>
//               </div>
//             </div>

//             <div>
//               <label className="text-sm font-medium text-gray-700">Transferir a Humano Si:</label>
//               <div className="mt-2 space-y-2">
//                 <label className="flex items-center space-x-2">
//                   <input type="checkbox" defaultChecked />
//                   <span className="text-sm">Cliente solicita hablar con agente</span>
//                 </label>
//                 <label className="flex items-center space-x-2">
//                   <input type="checkbox" defaultChecked />
//                   <span className="text-sm">Consulta sobre financiación compleja</span>
//                 </label>
//                 <label className="flex items-center space-x-2">
//                   <input type="checkbox" />
//                   <span className="text-sm">Llamada dura más de 5 minutos</span>
//                 </label>
//               </div>
//             </div>

//             <Button className="bg-violet-600 hover:bg-violet-700">Guardar Configuración</Button>
//           </CardContent>
//         </Card>
//       </TabsContent>
//     </Tabs>
//   </div>
// )
}
