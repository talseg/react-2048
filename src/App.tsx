import React from 'react'
import './App.css'
import { Game } from './game/conponents/Game/Game'
import { SettingsProvider } from './game/conponents/settings/SettingsContext'

function App() {
  return (
    <React.StrictMode>
      <SettingsProvider>
        <Game />
      </SettingsProvider>
    </React.StrictMode>
  )
}

export default App
