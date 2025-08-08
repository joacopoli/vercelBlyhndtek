"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { CreditCard, Download, Calendar, TrendingUp, AlertCircle } from 'lucide-react'
import { useAppContext } from "@/lib/context/app-context"

export function BillingPanel() {
  const { state } = useAppContext()

  const invoices = [
    {
      id: "INV-2024-001",
      date: "2024-01-01",
      amount: 299,
      status: "paid",
      description: "Plan Professional - Enero 2024"
    },
    {
      id: "INV-2024-002",
      date: "2024-02-01",
      amount: 299,
      status: "paid",
      description: "Plan Professional - Febrero 2024"
    },
    {
      id: "INV-2024-003",
      date: "2024-03-01",
      amount: 299,
      status: "pending",
      description: "Plan Professional - Marzo 2024"
    }
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "paid": return "bg-green-100 text-green-800"
      case "pending": return "bg-yellow-100 text-yellow-800"
      case "overdue": return "bg-red-100 text-red-800"
      default: return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "paid": return "Pagada"
      case "pending": return "Pendiente"
      case "overdue": return "Vencida"
      default: return "Desconocida"
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">Facturación</h2>
        <p className="text-gray-600">Gestiona tu plan y facturación</p>
      </div>

      {/* Plan actual */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Plan Actual</span>
            <Badge className="bg-blue-100 text-blue-800">Professional</Badge>
          </CardTitle>
          <CardDescription>Tu plan y uso actual</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold">Plan Professional</h3>
              <p className="text-sm text-gray-600">€299/mes • Facturación mensual</p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold">€299</div>
              <div className="text-sm text-gray-500">por mes</div>
            </div>
          </div>

          <div className="space-y-3">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Conversaciones</span>
                <span>{state.company?.usage.conversations.toLocaleString()} / {state.company?.limits.conversations.toLocaleString()}</span>
              </div>
              <Progress 
                value={(state.company?.usage.conversations || 0) / (state.company?.limits.conversations || 1) * 100} 
                className="h-2" 
              />
            </div>
            
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Leads</span>
                <span>{state.leads.length} / 1000</span>
              </div>
              <Progress value={(state.leads.length / 1000) * 100} className="h-2" />
            </div>
          </div>

          <div className="flex space-x-2">
            <Button variant="outline" className="flex-1">
              Cambiar Plan
            </Button>
            <Button className="flex-1">
              Actualizar Método de Pago
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Método de pago */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <CreditCard className="h-5 w-5" />
            <span>Método de Pago</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-6 bg-blue-600 rounded flex items-center justify-center">
                <span className="text-white text-xs font-bold">VISA</span>
              </div>
              <div>
                <p className="font-medium">•••• •••• •••• 4242</p>
                <p className="text-sm text-gray-500">Expira 12/25</p>
              </div>
            </div>
            <Button variant="outline" size="sm">
              Cambiar
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Próxima facturación */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Calendar className="h-5 w-5" />
            <span>Próxima Facturación</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">1 de Abril, 2024</p>
              <p className="text-sm text-gray-600">Plan Professional</p>
            </div>
            <div className="text-right">
              <div className="text-xl font-bold">€299</div>
              <div className="text-sm text-gray-500">en 5 días</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Historial de facturas */}
      <Card>
        <CardHeader>
          <CardTitle>Historial de Facturas</CardTitle>
          <CardDescription>Todas tus facturas y pagos</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {invoices.map((invoice) => (
              <div key={invoice.id} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                    <CreditCard className="h-4 w-4 text-gray-600" />
                  </div>
                  <div>
                    <p className="font-medium">{invoice.id}</p>
                    <p className="text-sm text-gray-600">{invoice.description}</p>
                    <p className="text-xs text-gray-500">
                      {new Date(invoice.date).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="text-right">
                    <div className="font-semibold">€{invoice.amount}</div>
                    <Badge className={getStatusColor(invoice.status)}>
                      {getStatusText(invoice.status)}
                    </Badge>
                  </div>
                  <Button variant="outline" size="sm">
                    <Download className="h-3 w-3 mr-1" />
                    PDF
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Estadísticas de facturación */}
      <Card>
        <CardHeader>
          <CardTitle>Estadísticas de Facturación</CardTitle>
          <CardDescription>Resumen de tus gastos</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">€897</div>
              <div className="text-sm text-gray-600">Total este año</div>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600">€299</div>
              <div className="text-sm text-gray-600">Promedio mensual</div>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <div className="text-2xl font-bold text-orange-600">3</div>
              <div className="text-sm text-gray-600">Facturas pagadas</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
