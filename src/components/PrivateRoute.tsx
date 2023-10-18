import React, { useContext, type FC, Component } from 'react'
import { Route, Navigate } from 'react-router-dom'
import { LayoutContext } from './context/layoutContext'
import HRDashboardContainer from '../pages/HRDashboard/HRDashboardContainer'
import VendorDashboardContainer from '../pages/vendorDashboard/vendorDashboardContainer'

interface PrivateRouteProps {
  path: string
  element: any
}

const PrivateRoute: FC<PrivateRouteProps> = ({ path, element: Component }) => {
  const { loginUserData } = useContext(LayoutContext)

  if (!loginUserData) {
    return <Navigate to="/login" />
  }

  if (path === '/') {
    switch (loginUserData?.role) {
      case 'HR':
        return <HRDashboardContainer />
      case 'VENDOR':
        return <VendorDashboardContainer />
      default:
        return <Navigate to="/unauthorized" />
    }
  }

  return <Component />
}

export default PrivateRoute
