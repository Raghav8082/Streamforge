import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import Navbar from './shared/Navbar.jsx'
import EclipseCard from './shared/Cards.jsx'
import './App.css'  


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Navbar />
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: "calc(100svh - 72px)", background: "#08060d" }}>
        <EclipseCard />
      </div>
      </>
  )
}

export default App
