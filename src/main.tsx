import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Headers from './Components/Headers'
import NotFound from './pages/Errors'
import Configuration from './pages/Configuration'
import Resultat from './pages/Resultats'
import DataProvider from './utils/context'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <DataProvider>
      <Router>
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
