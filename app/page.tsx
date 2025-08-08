import { MainApp } from "@/components/main-app"
import { AppProvider } from "@/lib/context/app-context"
import { SupabaseProvider } from "@/lib/supabase/provider"

export default function Home() {
  return (
    <SupabaseProvider>
      <AppProvider>
        <MainApp />
      </AppProvider>
    </SupabaseProvider>
  )
}
