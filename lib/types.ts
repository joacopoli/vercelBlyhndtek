export interface User {
  id: string
  name: string
  email: string
  role: string
  avatar?: string
}

export interface Company {
  id: string
  name: string
  plan: string
  services: Service[]
  usage: {
    conversations: number
    leads: number
    valuations: number
  }
  limits: {
    conversations: number
    leads: number
    valuations: number
  }
}

export interface Service {
  id: string
  name: string
  tier: string
  price: number
  isActive: boolean
  usage: number
  unit: string
}

export interface Lead {
  id: string
  name: string
  email: string
  phone: string
  score: number
  status: "new" | "contacted" | "qualified" | "proposal" | "closed"
  propertyInterest: string
  budget: string
  source: string
  lastActivity: Date
  assignedTo?: string
  notes: string[]
}

export interface Property {
  id: string
  address: string
  type: string
  value: number
  confidence: number
  status: "completed" | "processing" | "failed"
  requestDate: Date
}

export interface Document {
  id: string
  name: string
  type: string
  status: "signed" | "pending" | "draft"
  clientName: string
  createdDate: Date
}

export interface Notification {
  id: string
  title: string
  message: string
  type: "info" | "success" | "warning" | "error"
  read: boolean
  timestamp: Date
}

export interface Conversation {
  id: string
  name: string
  preview: string
  time: string
  unread: number
  platform: 'whatsapp' | 'web'
  iaActiva: boolean
}

export interface AppState {
  isAuthenticated: boolean
  user: User | null
  company: Company | null
  activeService: string
  leads: Lead[]
  properties: Property[]
  documents: Document[]
  notifications: Notification[]
}

export type AppAction = 
  | { type: "LOGIN"; payload: { user: User; company: Company } }
  | { type: "LOGOUT" }
  | { type: "SET_ACTIVE_SERVICE"; payload: string }
  | { type: "ADD_LEAD"; payload: Lead }
  | { type: "UPDATE_LEAD"; payload: { id: string; updates: Partial<Lead> } }
  | { type: "ADD_NOTIFICATION"; payload: Notification }
  | { type: "MARK_NOTIFICATION_READ"; payload: string }
