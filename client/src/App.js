import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AppProvider } from './Context'

// Pages
import Home from './pages/Home'
import Products from './pages/Products'
import SingleItem from './pages/SingleItem'
import Cart from './pages/Cart'
import Checkout from './pages/Checkout'
import Error from './pages/Error'


// Components
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import Hero from './components/Hero'
import Searchbar from './components/Searchbar'
import Conflictbox from './components/Conflictbox'
import SuccesfulOrder from './components/SuccesfulOrder'

// Return
export default function App() {

  return (
    <BrowserRouter>

      {/* Provider to provide functions and states from Context.js to all children*/}
      <AppProvider>      

        <Navbar />
        <Hero />
        <Sidebar />
        <Searchbar />      
        <Conflictbox />
        <SuccesfulOrder />

        <Routes>
          <Route path='/' element={ <Home /> } />
          <Route path='/products' element={ <Products /> } />
          <Route path='/products/:id' element={ <SingleItem /> } />
          <Route path='/cart' element={ <Cart /> } />
          <Route path='/checkout' element={ <Checkout /> } />
          <Route path='*' element={ <Error /> } />
        </Routes>

      </AppProvider>
    </BrowserRouter>
  )
}