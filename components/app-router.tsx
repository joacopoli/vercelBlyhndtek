"use client"

import { useAppContext } from "@/lib/context/app-context"
import { DashboardOverview } from "./dashboard/dashboard-overview"
import ConversationsPanel from "./services/conversations-panel"
import LeadsPanel from "./services/leads-panel"
import ValuationsPanel from "./services/valuations-panel"
import VoicePanel from "./services/voice-panel"
import DocumentsPanel from "./services/documents-panel"
import ReportsPanel from "./services/reports-panel"
import BillingPanel from "./services/billing-panel"
import SettingsPanel from "./settings/settings-panel"
import AnalyticsPanel from "./modules/analytics-panel"
import PartnerManagement from "./modules/partner-management"
import LockedServicePanel from "./services/locked-service-panel"

export function AppRouter() {
  const { state } = useAppContext()

  const renderView = () => {
    switch (state.currentView) {
      case 'dashboard':
        return <DashboardOverview />
      case 'conversations':
        return state.company?.services.find(s => s.id === 'conversations')?.isActive 
          ? <ConversationsPanel />
          : <LockedServicePanel serviceId="conversations" />
      case 'leads':
        return state.company?.services.find(s => s.id === 'leads')?.isActive 
          ? <LeadsPanel />
          : <LockedServicePanel serviceId="leads" />
      case 'valuations':
        return state.company?.services.find(s => s.id === 'valuations')?.isActive 
          ? <ValuationsPanel />
          : <LockedServicePanel serviceId="valuations" />
      case 'voice':
        return state.company?.services.find(s => s.id === 'voice')?.isActive 
          ? <VoicePanel />
          : <LockedServicePanel serviceId="voice" />
      case 'documents':
        return state.company?.services.find(s => s.id === 'documents')?.isActive 
          ? <DocumentsPanel />
          : <LockedServicePanel serviceId="documents" />
      case 'reports':
        return state.company?.services.find(s => s.id === 'reports')?.isActive 
          ? <ReportsPanel />
          : <LockedServicePanel serviceId="reports" />
      case 'billing':
        return <BillingPanel />
      case 'settings':
        return <SettingsPanel />
      case 'analytics':
        return <AnalyticsPanel />
      case 'partners':
        return <PartnerManagement />
      default:
        return <DashboardOverview />
    }
  }

  return <div className="w-full h-full">{renderView()}</div>
}
