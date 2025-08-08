"use client"

import type React from "react"
import LockedServicePanel from "./locked-service-panel"
import AVMValuation from "../modules/avm-valuation"

export default function ValuationsPanel() {
  return (
    <LockedServicePanel
      serviceName="Valuaciones Automáticas"
      description="Obtén valuaciones precisas de propiedades usando IA y datos del mercado en tiempo real."
      features={[
        'Valuaciones instantáneas con IA',
        'Análisis comparativo de mercado',
        'Reportes detallados en PDF',
        'Histórico de precios',
        'Integración con MLS',
        'API para desarrolladores'
      ]}
    >
      <AVMValuation />
    </LockedServicePanel>
  )
}
