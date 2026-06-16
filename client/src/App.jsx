import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import Navbar from './shared/Navbar.jsx'
import EclipseCard from './shared/Cards.jsx'
import './App.css'  
import HeroPage from './pages/hero.jsx'

function App() {
  const [count, setCount] = useState(0)

  return (
    <HeroPage />
  )
}

export default App
