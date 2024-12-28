import { useState } from 'react'
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Main from './pages/angry-birds/Main'

function App() {
  const [count, setCount] = useState(0)

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/angry-birds" element={<Main />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
