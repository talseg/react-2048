import { useState } from 'react'
import './App.css'
import styled from 'styled-components'

const StyledButton = styled.button`
  background-color: #c2e221;
  color: #3d21b9;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  font-size: 32px;
`



function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <h1>2048</h1>

      <div>
        <div style={{ color: "black", 
          fontSize: "30px"
          
          }}>here is the game</div>

      </div>



      <p className="info">
        Game by Tal Segal
      </p>
    </>
  )
}

export default App
