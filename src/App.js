import React, { useState, useEffect } from 'react'
import './base.scss'
import Nav from './nav/Nav'
import Main from './main/Main'

function App() {
  const [darkMode, setDarkMode] = useState(false)

  useEffect(() => {
    darkMode ? document.querySelector('.wrapper').classList.add('darkBackground')
    : document.querySelector('.wrapper').classList.remove('darkBackground')
  }, [darkMode])

  return (
    <div className='wrapper'>
      <Nav dark={darkMode} switch={() => setDarkMode(!darkMode)}/>
      <Main dark={darkMode}/>
    </div>
  )
}

export default App