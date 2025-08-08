"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { FileText, Download, Calendar, TrendingUp } from 'lucide-react'
import { useAppContext } from "@/lib/context/app-context"

export function ReportsPanel() {
  const { state } = useAppContext()

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">Reportes</h2>
        <p className="text-gray-600">Informes y análisis automáticos</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Reportes Disponibles</CardTitle>
          <CardDescription>Lista de informes generados automáticamente</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {state.reports.map((report) => (
              <div key={report.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center space-x-4">
                  <FileText className="h-8 w-8 text-blue-500" />
                  <div>
                    <h3 className="font-semibold">{report.name}</h3>
                    <div className="flex items-center space-x-2 text-sm text-gray-500">
                      <Calendar className="h-3 w-3" />
                      <span>{report.generatedDate.toLocaleDateString()}</span>
                      <Badge variant="outline">
                        {report.type === "lead_conversion" ? "Conversión" : 
                         report.type === "agent_performance" ? "Rendimiento" : "Ingresos"}
                      </Badge>
                    </div>
                  </div>
                </div>
                <Button variant="outline" size="sm">
                  <Download className="h-3 w-3 mr-1" />
                  Descargar
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
