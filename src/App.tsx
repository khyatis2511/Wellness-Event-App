import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { LayoutContextProvider } from './components/context/layoutContext'
import LoginContainer from './pages/login/loginContainer'
import HRDashboardContainer from './pages/HRDashboard/HRDashboardContainer'

const App: React.FC = () => {
  return (
    <Router>
      <LayoutContextProvider>
        <Routes>
          <Route path="/login" element={<LoginContainer />} />
          <Route path="/dashboard" element={<HRDashboardContainer />} />
        </Routes>
      </LayoutContextProvider>
    </Router>
  )
}

export default App
