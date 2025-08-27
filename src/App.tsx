import './App.css'
import styled from 'styled-components'
import FullscreenToggle from './game/conponents/fullScreenToggle';
import { Game } from './game/conponents/Game/Game';

const PageWrapper = styled.div`
  min-height: 90vh;  
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: start;  
`;

const InfoWrapper = styled.div`
  margin-top: 20px;
  color: #000000;
  font-size: 20px;
  font-weight: bold;
`;

function App() {

  return (
    <PageWrapper>

      <FullscreenToggle/>
        <h1 style={{ color: "black" }}>2048</h1>
      <Game/>

      <InfoWrapper>
        {"Game by Inbar and Tal Segal"}
      </InfoWrapper>

    </PageWrapper>
  )
}

export default App
