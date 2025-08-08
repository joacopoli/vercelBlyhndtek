"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useApp } from "@/lib/context/app-context"
import { CreditCard, Download, TrendingUp, AlertTriangle, CheckCircle, Star, Zap, Users, MessageSquare, Phone, FileText, BarChart3, Settings, Crown, Sparkles, Home, DollarSign, Calendar, ArrowUp, Plus, Clock } from 'lucide-react'
import { LockedServicePanel } from './locked-service-panel'
import BillingPanel from "../global/billing-panel"

const additionalServices = [
  {
    id: "voice-upgrade-5k",
    name: "Call Center IA - 5,000 llamadas",
    description: "Upgrade a 5,000 llamadas mensuales con panel omnicanal",
    price: 1500,
    currentPrice: 500,
    icon: <Phone className="h-5 w-5" />,
    category: "upgrade",
  },
  {
    id: "voice-upgrade-10k",
    name: "Call Center IA - 10,000 llamadas",
    description: "Máximo volumen de llamadas para empresas grandes",
    price: 3000,
    currentPrice: 500,
    icon: <Phone className="h-5 w-5" />,
    category: "upgrade",
  },
  {
    id: "conversations-upgrade-10k",
    name: "Chatbot - 10,000 conversaciones",
    description: "Upgrade a 10,000 conversaciones mensuales",
    price: 800,
    currentPrice: 500,
    icon: <MessageSquare className="h-5 w-5" />,
    category: "upgrade",
  },
  {
    id: "avm-upgrade-1k",
    name: "AVM - 1,000 valoraciones",
    description: "Upgrade a 1,000 valoraciones mensuales",
    price: 900,
    currentPrice: 200,
    icon: <Home className="h-5 w-5" />,
    category: "upgrade",
  },
  {
    id: "avm-upgrade-5k",
    name: "AVM - 5,000 valoraciones",
    description: "Máximo volumen de valoraciones",
    price: 2900,
    currentPrice: 200,
    icon: <Home className="h-5 w-5" />,
    category: "upgrade",
  },
  {
    id: "documents-upgrade-200",
    name: "Documentos - 200/mes",
    description: "Upgrade a 200 documentos mensuales",
    price: 600,
    currentPrice: 300,
    icon: <FileText className="h-5 w-5" />,
    category: "upgrade",
  },
  {
    id: "documents-upgrade-500",
    name: "Documentos - 500/mes",
    description: "Máximo volumen de documentos",
    price: 900,
    currentPrice: 300,
    icon: <FileText className="h-5 w-5" />,
    category: "upgrade",
  },
  {
    id: "premium-support",
    name: "Soporte Premium 24/7",
    description: "Soporte técnico dedicado con respuesta en menos de 1 hora",
    price: 200,
    icon: <Settings className="h-5 w-5" />,
    category: "addon",
  },
  {
    id: "custom-integrations",
    name: "Integraciones Personalizadas",
    description: "Desarrollo de integraciones específicas para tu negocio",
    price: 500,
    icon: <Zap className="h-5 w-5" />,
    category: "addon",
  },
  {
    id: "white-label",
    name: "Marca Blanca",
    description: "Personalización completa con tu marca y dominio",
    price: 800,
    icon: <Crown className="h-5 w-5" />,
    category: "addon",
  },
]

const invoiceHistory = [
  {
    id: "inv_001",
    date: "2024-08-01",
    amount: 1900,
    status: "paid",
    period: "Agosto 2024",
    services: ["Plan Professional", "Chatbot 5K", "CRM 20 usuarios", "AVM 100", "Documentos 50"],
  },
  {
    id: "inv_002",
    date: "2024-07-01",
    amount: 1900,
    status: "paid",
    period: "Julio 2024",
    services: ["Plan Professional", "Chatbot 5K", "CRM 20 usuarios", "AVM 100", "Documentos 50"],
  },
  {
    id: "inv_003",
    date: "2024-06-01",
    amount: 1600,
    status: "paid",
    period: "Junio 2024",
    services: ["Plan Professional", "Chatbot 5K", "CRM 20 usuarios", "AVM 100"],
  },
]

export default function BillingPanelWrapper() {
  return <BillingPanel />
}
