import './App.css'
import styled from 'styled-components'
import { Board } from './game/conponents/board'
import FullscreenToggle from './game/conponents/fullScreenToggle';

const PageWrapper = styled.div`
  min-height: 100vh;
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

      <Board/>

      <InfoWrapper>
        {"Game by Inbar and Tal Segal"}
      </InfoWrapper>

    </PageWrapper>
  )
}

export default App
