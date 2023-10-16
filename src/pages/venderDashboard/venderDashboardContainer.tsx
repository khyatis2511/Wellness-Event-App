import React, { type FC, useState } from 'react'
import VenderDashboardScene from './venderDashboardScene'

const VenderDashboardContainer: FC = () => {
  const [loading, setLoading] = useState()
  return (
    <VenderDashboardScene />
  )
}

export default VenderDashboardContainer
