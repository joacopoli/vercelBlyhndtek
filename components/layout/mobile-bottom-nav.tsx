"use client"

import { Button } from "@/components/ui/button"
import { Home, MessageSquare, Users, Calculator, Settings } from 'lucide-react'
import { useAppContext } from "@/lib/context/app-context"

export function MobileBottomNav() {
  const { state, dispatch } = useAppContext()

  const navItems = [
    { id: "dashboard", icon: Home, label: "Inicio" },
    { id: "conversations", icon: MessageSquare, label: "Chat" },
    { id: "leads", icon: Users, label: "Leads" },
    { id: "valuations", icon: Calculator, label: "AVM" },
    { id: "settings", icon: Settings, label: "Config" },
  ]

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 lg:hidden z-50">
      <div className="flex justify-around py-2">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = state.activeService === item.id
          
          return (
            <Button
              key={item.id}
              variant="ghost"
              size="sm"
              className={`flex flex-col items-center space-y-1 h-auto py-2 ${
                isActive ? 'text-blue-600' : 'text-gray-600'
              }`}
              onClick={() => dispatch({ type: "SET_ACTIVE_SERVICE", payload: item.id })}
            >
              <Icon className="h-5 w-5" />
              <span className="text-xs">{item.label}</span>
            </Button>
          )
        })}
      </div>
    </div>
  )
}
