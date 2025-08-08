"use client"

import React, { createContext, useContext, useReducer, ReactNode } from 'react'
import { AppState, AppAction, User, Company, Lead, Property, Document, Notification } from '@/lib/types'

const initialState: AppState = {
  isAuthenticated: false,
  user: null,
  company: null,
  activeService: "dashboard",
  leads: [
    {
      id: "1",
      name: "María González",
      email: "maria@email.com",
      phone: "+34 666 123 456",
      score: 8.5,
      status: "qualified",
      propertyInterest: "Apartamento en Madrid Centro",
      budget: "€300,000 - €400,000",
      source: "WhatsApp",
      lastActivity: new Date("2024-03-15"),
      assignedTo: "Carlos Ruiz",
      notes: ["Interesada en 2-3 habitaciones", "Disponible fines de semana", "Presupuesto flexible"]
    },
    {
      id: "2",
      name: "Juan Pérez",
      email: "juan.perez@gmail.com",
      phone: "+34 677 987 654",
      score: 6.2,
      status: "contacted",
      propertyInterest: "Casa en las afueras",
      budget: "€250,000 - €350,000",
      source: "Web",
      lastActivity: new Date("2024-03-14"),
      notes: ["Primera vivienda", "Busca jardín"]
    },
    {
      id: "3",
      name: "Ana Martín",
      email: "ana.martin@hotmail.com",
      phone: "+34 655 456 789",
      score: 9.1,
      status: "proposal",
      propertyInterest: "Piso moderno Barcelona",
      budget: "€400,000+",
      source: "Referido",
      lastActivity: new Date("2024-03-16"),
      assignedTo: "Laura Sánchez",
      notes: ["Cliente VIP", "Decisión rápida", "Inversión"]
    }
  ],
  properties: [
    {
      id: "1",
      address: "Calle Mayor 123, Madrid",
      type: "apartment",
      value: 245000,
      confidence: 92,
      status: "completed",
      requestDate: new Date("2024-03-10")
    },
    {
      id: "2",
      address: "Avenida Diagonal 456, Barcelona",
      type: "apartment",
      value: 0,
      confidence: 0,
      status: "processing",
      requestDate: new Date("2024-03-15")
    }
  ],
  documents: [
    {
      id: "1",
      name: "Contrato de Arras - María González",
      type: "contract",
      status: "signed",
      clientName: "María González",
      createdDate: new Date("2024-03-12")
    },
    {
      id: "2",
      name: "Informe de Valoración - Calle Mayor 123",
      type: "valuation",
      status: "pending",
      clientName: "Juan Pérez",
      createdDate: new Date("2024-03-14")
    }
  ],
  notifications: [
    {
      id: "1",
      title: "Nuevo lead generado",
      message: "María González ha mostrado interés en una propiedad",
      type: "success",
      read: false,
      timestamp: new Date("2024-03-16T10:30:00")
    },
    {
      id: "2",
      title: "Valoración completada",
      message: "La valoración de Calle Mayor 123 está lista",
      type: "info",
      read: false,
      timestamp: new Date("2024-03-16T09:15:00")
    },
    {
      id: "3",
      title: "Documento firmado",
      message: "El contrato de arras ha sido firmado digitalmente",
      type: "success",
      read: true,
      timestamp: new Date("2024-03-15T16:45:00")
    }
  ]
}

function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.user,
        company: action.payload.company
      }
    
    case "LOGOUT":
      return {
        ...initialState
      }
    
    case "SET_ACTIVE_SERVICE":
      return {
        ...state,
        activeService: action.payload
      }
    
    case "ADD_LEAD":
      return {
        ...state,
        leads: [...state.leads, action.payload]
      }
    
    case "UPDATE_LEAD":
      return {
        ...state,
        leads: state.leads.map(lead =>
          lead.id === action.payload.id
            ? { ...lead, ...action.payload.updates }
            : lead
        )
      }
    
    case "ADD_NOTIFICATION":
      return {
        ...state,
        notifications: [action.payload, ...state.notifications]
      }
    
    case "MARK_NOTIFICATION_READ":
      return {
        ...state,
        notifications: state.notifications.map(notification =>
          notification.id === action.payload
            ? { ...notification, read: true }
            : notification
        )
      }
    
    default:
      return state
  }
}

const AppContext = createContext<{
  state: AppState
  dispatch: React.Dispatch<AppAction>
} | null>(null)

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(appReducer, initialState)

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  )
}

export function useAppContext() {
  const context = useContext(AppContext)
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider')
  }
  return context
}
