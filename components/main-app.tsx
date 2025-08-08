"use client"

import { useAppContext } from "@/lib/context/app-context"
import { LoginForm } from "./auth/login-form"
import { Header } from "./layout/header"
import { Sidebar } from "./layout/sidebar"
import { MobileBottomNav } from "./layout/mobile-bottom-nav"
import { AppRouter } from "./app-router"

export function MainApp() {
  const { state } = useAppContext()

  if (!state.isAuthenticated) {
    return <LoginForm />
  }

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar - Desktop */}
      <Sidebar />
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col lg:ml-64">
        <Header />
        
        <main className="flex-1 overflow-auto p-6 pb-20 lg:pb-6">
          <AppRouter />
        </main>
      </div>

      {/* Mobile Bottom Navigation */}
      <MobileBottomNav />
    </div>
  )
}
