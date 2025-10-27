import './App.css'
import { Game } from './game/conponents/Game/Game'
import { SettingsProvider } from './game/conponents/settings/SettingsContext'

function App() {
  return (
    <SettingsProvider>
      <Game/>
    </SettingsProvider>
  )
}

export default App
