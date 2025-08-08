"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Home, MessageSquare, Users, Building, Phone, FileText, BarChart3, Settings, CreditCard, UserCheck, TrendingUp } from 'lucide-react'
import { useAppContext } from "@/lib/context/app-context"
import Image from 'next/image'

export function Sidebar() {
  const { state, dispatch } = useAppContext()

  const menuItems = [
    { id: 'dashboard', icon: Home, label: 'Dashboard', badge: null },
    { id: 'conversations', icon: MessageSquare, label: 'Conversaciones', badge: '3' },
    { id: 'leads', icon: Users, label: 'Leads', badge: '12' },
    { id: 'valuations', icon: Building, label: 'Valoraciones', badge: null },
    { id: 'voice', icon: Phone, label: 'Call Center', badge: null },
    { id: 'documents', icon: FileText, label: 'Documentos', badge: null },
    { id: 'reports', icon: BarChart3, label: 'Reportes', badge: null },
  ]

  const bottomMenuItems = [
    { id: 'analytics', icon: TrendingUp, label: 'Analytics', badge: null },
    { id: 'partners', icon: UserCheck, label: 'Partners', badge: null },
    { id: 'billing', icon: CreditCard, label: 'Facturación', badge: null },
    { id: 'settings', icon: Settings, label: 'Configuración', badge: null },
  ]

  const isServiceActive = (serviceId: string) => {
    return state.company?.services.find(s => s.id === serviceId)?.isActive || false
  }

  return (
    <div className="w-64 bg-white border-r border-gray-200 flex flex-col h-full">
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center space-x-2">
          <Image
            src="/images/blyndtek-logo.png"
            alt="Blyndtek"
            width={32}
            height={32}
          />
          <div>
            <h2 className="font-semibold text-gray-900">Blyndtek</h2>
            <p className="text-xs text-gray-500">{state.company?.plan}</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 p-4 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon
          const isActive = state.currentView === item.id
          const serviceActive = isServiceActive(item.id)
          
          return (
            <Button
              key={item.id}
              variant={isActive ? "default" : "ghost"}
              className={`w-full justify-start ${
                !serviceActive && item.id !== 'dashboard' ? 'opacity-50' : ''
              }`}
              onClick={() => dispatch({ type: 'SET_VIEW', payload: item.id })}
            >
              <Icon className="mr-2 h-4 w-4" />
              {item.label}
              {item.badge && (
                <Badge variant="secondary" className="ml-auto">
                  {item.badge}
                </Badge>
              )}
              {!serviceActive && item.id !== 'dashboard' && (
                <Badge variant="outline" className="ml-auto text-xs">
                  Pro
                </Badge>
              )}
            </Button>
          )
        })}
      </nav>

      <div className="p-4 border-t border-gray-200 space-y-2">
        {bottomMenuItems.map((item) => {
          const Icon = item.icon
          const isActive = state.currentView === item.id
          
          return (
            <Button
              key={item.id}
              variant={isActive ? "default" : "ghost"}
              className="w-full justify-start"
              onClick={() => dispatch({ type: 'SET_VIEW', payload: item.id })}
            >
              <Icon className="mr-2 h-4 w-4" />
              {item.label}
              {item.badge && (
                <Badge variant="secondary" className="ml-auto">
                  {item.badge}
                </Badge>
              )}
            </Button>
          )
        })}
      </div>
    </div>
  )
}
