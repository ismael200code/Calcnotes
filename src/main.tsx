import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import ReactGA from 'react-ga4'
import './index.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Headers from './Components/Headers'
import NotFound from './pages/Errors'
import Configuration from './pages/Configuration'
import Resultat from './pages/Resultats'
import DataProvider from './utils/context'
import { AnalyticsTracker } from './utils/AnaliticsTracker/intex'

ReactGA.initialize(import.meta.env.VITE_GA_ID)

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <DataProvider>
      <Router>
        <AnalyticsTracker/>
        <Headers/>
        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/config/:studentStatut' element={<Configuration/>}/>
          <Route path='/result/:studentStatut' element={<Resultat/>}/>
          <Route path='*' element={<NotFound/>}/>
        </Routes>
      </Router>
    </DataProvider>
  </StrictMode>,
)
