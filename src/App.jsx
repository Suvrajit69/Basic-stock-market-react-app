import React from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import StockOverviewPage from './pages/StockOverviewPage'
import StockDetailsPage from './pages/StockDetailsPage'
import { WatchListContextProvider } from './context/WatchlistContext'


const App =()=> {
 

  return (
    <main className='container'>
      <WatchListContextProvider>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<StockOverviewPage/>}/>
        <Route path="/detail/:symbol" element={<StockDetailsPage/>}/>
      </Routes>
      </BrowserRouter>
      </WatchListContextProvider>
    </main>
  )
}

export default App
