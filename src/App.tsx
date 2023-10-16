import React from 'react'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import PrivateRoute from './components/PrivateRoute'
import Unauthorized from './components/Unauthorized'
import { LayoutContextProvider } from './components/context/layoutContext'
import HRDashboardContainer from './pages/HRDashboard/HRDashboardContainer'
import LoginContainer from './pages/login/loginContainer'

const App: React.FC = () => {
  return (
    <Router>
      <LayoutContextProvider>
        <Routes>
          <Route
            path="/"
            element={
              <PrivateRoute path="/" element={HRDashboardContainer} />
            }
          />
          <Route path="/login" element={<LoginContainer />} />
          <Route path="/unauthorized" element={<Unauthorized />} />
        </Routes>
      </LayoutContextProvider>
    </Router>
  )
}

export default App
