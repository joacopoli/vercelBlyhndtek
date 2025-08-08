"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MapPin, Home, TrendingUp, Calculator, FileText, Clock } from 'lucide-react'
import { useAppContext } from "@/lib/context/app-context"

export default function AVMValuation() {
  const { state } = useAppContext()
  const [address, setAddress] = useState("")
  const [propertyType, setPropertyType] = useState("apartment")
  const [isValuating, setIsValuating] = useState(false)

  const handleValuation = async () => {
    setIsValuating(true)
    // Simular proceso de valoración
    setTimeout(() => {
      setIsValuating(false)
    }, 3000)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed": return "bg-green-100 text-green-800"
      case "processing": return "bg-yellow-100 text-yellow-800"
      case "failed": return "bg-red-100 text-red-800"
      default: return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "completed": return "Completada"
      case "processing": return "Procesando"
      case "failed": return "Error"
      default: return "Pendiente"
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">Valoración AVM</h2>
        <p className="text-gray-600">Sistema automático de valoración de propiedades</p>
      </div>

      <Tabs defaultValue="new-valuation" className="space-y-6">
        <TabsList>
          <TabsTrigger value="new-valuation">Nueva Valoración</TabsTrigger>
          <TabsTrigger value="history">Historial</TabsTrigger>
          <TabsTrigger value="analytics">Análisis</TabsTrigger>
        </TabsList>

        <TabsContent value="new-valuation" className="space-y-6">
          {/* Formulario de nueva valoración */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Calculator className="h-5 w-5" />
                <span>Nueva Valoración</span>
              </CardTitle>
              <CardDescription>
                Ingresa los datos de la propiedad para obtener una valoración automática
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="address">Dirección</Label>
                  <Input
                    id="address"
                    placeholder="Ej: Calle Mayor 123, Madrid"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="property-type">Tipo de Propiedad</Label>
                  <select
                    id="property-type"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    value={propertyType}
                    onChange={(e) => setPropertyType(e.target.value)}
                  >
                    <option value="apartment">Apartamento</option>
                    <option value="house">Casa</option>
                    <option value="commercial">Local Comercial</option>
                    <option value="office">Oficina</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="size">Superficie (m²)</Label>
                  <Input id="size" type="number" placeholder="120" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="rooms">Habitaciones</Label>
                  <Input id="rooms" type="number" placeholder="3" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="bathrooms">Baños</Label>
                  <Input id="bathrooms" type="number" placeholder="2" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="year">Año de Construcción</Label>
                  <Input id="year" type="number" placeholder="2010" />
                </div>
              </div>

              <Button 
                onClick={handleValuation} 
                disabled={!address || isValuating}
                className="w-full"
              >
                {isValuating ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Valorando...
                  </>
                ) : (
                  <>
                    <Calculator className="h-4 w-4 mr-2" />
                    Obtener Valoración
                  </>
                )}
              </Button>

              {isValuating && (
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Analizando datos del mercado...</span>
                    <span>75%</span>
                  </div>
                  <Progress value={75} className="h-2" />
                </div>
              )}
            </CardContent>
          </Card>

          {/* Resultado de valoración (ejemplo) */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Resultado de Valoración</span>
                <Badge className="bg-green-100 text-green-800">Confianza: 92%</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center mb-6">
                <div className="text-4xl font-bold text-blue-600 mb-2">€245,000</div>
                <div className="text-gray-600">Valor estimado de mercado</div>
                <div className="text-sm text-gray-500 mt-1">
                  Rango: €230,000 - €260,000
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <div className="text-lg font-semibold">€2,041</div>
                  <div className="text-sm text-gray-600">Precio por m²</div>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <div className="text-lg font-semibold">+5.2%</div>
                  <div className="text-sm text-gray-600">vs año anterior</div>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <div className="text-lg font-semibold">45 días</div>
                  <div className="text-sm text-gray-600">Tiempo venta est.</div>
                </div>
              </div>

              <div className="space-y-3">
                <h4 className="font-semibold">Factores considerados:</h4>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div className="flex justify-between">
                    <span>Ubicación</span>
                    <span className="font-medium">Excelente</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Estado</span>
                    <span className="font-medium">Bueno</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Comparables</span>
                    <span className="font-medium">15 propiedades</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Tendencia mercado</span>
                    <span className="font-medium text-green-600">↗ Alcista</span>
                  </div>
                </div>
              </div>

              <div className="flex space-x-2 mt-6">
                <Button variant="outline" className="flex-1">
                  <FileText className="h-4 w-4 mr-2" />
                  Descargar Informe
                </Button>
                <Button className="flex-1">
                  <MapPin className="h-4 w-4 mr-2" />
                  Ver en Mapa
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="history" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Historial de Valoraciones</CardTitle>
              <CardDescription>Todas las valoraciones realizadas</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {state.properties.map((property) => (
                  <div key={property.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-4">
                      <Home className="h-8 w-8 text-gray-400" />
                      <div>
                        <h3 className="font-semibold">{property.address}</h3>
                        <div className="flex items-center space-x-2 text-sm text-gray-500">
                          <Clock className="h-3 w-3" />
                          <span>{property.requestDate.toLocaleDateString()}</span>
                          <Badge className={getStatusColor(property.status)}>
                            {getStatusText(property.status)}
                          </Badge>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      {property.value > 0 ? (
                        <>
                          <div className="text-lg font-semibold">
                            €{property.value.toLocaleString()}
                          </div>
                          <div className="text-sm text-gray-500">
                            Confianza: {property.confidence}%
                          </div>
                        </>
                      ) : (
                        <div className="text-gray-500">Procesando...</div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Estadísticas del Mes</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span>Valoraciones realizadas</span>
                    <span className="font-semibold">24</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Valor promedio</span>
                    <span className="font-semibold">€312,500</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Confianza promedio</span>
                    <span className="font-semibold">89%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Tiempo promedio</span>
                    <span className="font-semibold">2.3 min</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Tendencias de Mercado</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span>Apartamentos</span>
                    <div className="flex items-center space-x-2">
                      <TrendingUp className="h-4 w-4 text-green-500" />
                      <span className="text-green-600 font-semibold">+3.2%</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Casas</span>
                    <div className="flex items-center space-x-2">
                      <TrendingUp className="h-4 w-4 text-green-500" />
                      <span className="text-green-600 font-semibold">+2.8%</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Locales comerciales</span>
                    <div className="flex items-center space-x-2">
                      <TrendingUp className="h-4 w-4 text-red-500 rotate-180" />
                      <span className="text-red-600 font-semibold">-1.5%</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
