import { useState } from 'react'
import logo from './logo.svg'
import './App.css'

import Profile from './components/Profile';

function App() {


  return (
    <div>
      <div className="lg:fixed px-5 lg:px-24 py-6 font-semibold">GitHub Finder</div>
      <Profile />
    </div>
  )
}

export default App