import React, { useContext, type FC } from 'react'
import { Route, Navigate } from 'react-router-dom'
import { LayoutContext } from './context/layoutContext'
import HRDashboardContainer from '../pages/HRDashboard/HRDashboardContainer'
import VendorDashboardContainer from '../pages/vendorDashboard/vendorDashboardContainer'

const PrivateRoute: FC<any> = ({ path, element: Component }) => {
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
