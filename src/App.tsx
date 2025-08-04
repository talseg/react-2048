import { useState } from 'react'
import './App.css'
import styled from 'styled-components'
import { Board } from './game/conponents/board'


const PageWrapper = styled.div`
  min-height: 75vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
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

      <h1 style={{ color: "black" }}>2048</h1>

      <Board/>

      <InfoWrapper>
        {"Game by Tal and Natasha Segal"}
      </InfoWrapper>

    </PageWrapper>
  )
}

export default App
