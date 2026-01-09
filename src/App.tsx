import './App.css'
import { Game } from './game/conponents/Game/Game'
import { SettingsProvider } from './game/conponents/settings/SettingsContext'
import { ErrorBoundary } from './game/conponents/ErrorBoundary'

function App() {
  return (
    <ErrorBoundary>
      <SettingsProvider>
        <Game />
      </SettingsProvider>
    </ErrorBoundary>
  )
}

export default App
