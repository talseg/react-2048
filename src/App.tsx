// import { styled } from 'styled-components';
import { styled } from 'styled-components';
import './App.css'
import { Game } from './game/conponents/Game/Game';

const PageWrapper = styled.div`
  min-height: 90vh;  
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: start; 
`;


function App() {

  return (
      <Game/>
  )
}

export default App
