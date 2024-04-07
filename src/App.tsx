import React from 'react';
import logo from './logo.svg';
import './App.css';
import LoginPage from "./loginPage/LoginPage";
import GlobalStyle from "./GlobalStyle";
import LorePage from "./lorePage/LorePage";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (//<GlobalStyle/>
      <BrowserRouter>
          <Routes>
              <Route index path="/loginPage" element={<LoginPage/>}/>
              <Route path="/lorePage" element={<LorePage/>}/>
          </Routes>
      </BrowserRouter>
  );
}

export default App;
