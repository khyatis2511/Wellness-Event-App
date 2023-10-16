import React, { type FC, useState } from 'react'
import HRDashboardScene from './HRDashboardScene'

const HRDashboardContainer: FC = () => {
  const [loading, setLoading] = useState()
  return (
    <HRDashboardScene />
  )
}

export default HRDashboardContainer
