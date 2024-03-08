import React from 'react';
import logo from './logo.svg';
import './App.css';
import LoginPage from "./loginPage/LoginPage";
import GlobalStyle from "./GlobalStyle";
import LorePage from "./lorePage/LorePage";

function App() {
  return (
      <>
        <GlobalStyle/>
        <LorePage/>
      </>
  );
}

export default App;
