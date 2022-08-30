import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

// Pages
import Home from './pages/Home'
import Products from './pages/Products'
import SingleItem from './pages/SingleItem'
import Cart from './pages/Cart'
import Error from './pages/Error'

// Components
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import Hero from './components/Hero'
import Searchbar from './components/Searchbar'

// Return
export default function App() {

  return (
    <BrowserRouter>

      <Navbar />
      <Sidebar />
      <Searchbar />
      <Hero />

      <Routes>
        <Route path='/' element={ <Home /> } />
        <Route path='/products' element={ <Products /> } />
        <Route path='/products/:id' element={ <SingleItem /> } />
        <Route path='/cart' element={ <Cart/> } />
        <Route path='*' element={ <Error /> } />
      </Routes>

    </BrowserRouter>
  )
}