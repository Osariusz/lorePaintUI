import React from 'react';
import logo from './logo.svg';
import './App.css';
import LoginPage from "./loginPage/LoginPage";
import GlobalStyle from "./GlobalStyle";
import LorePage from "./lorePage/LorePage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import RegisterPage from "./loginPage/RegisterPage";

function App() {
  return (//<GlobalStyle/>
      <BrowserRouter>
          <Routes>
              <Route index path="/login" element={<LoginPage/>}/>
              <Route index path="/register" element={<RegisterPage/>}/>
              <Route path="/lore" element={<LorePage/>}/>
          </Routes>
      </BrowserRouter>
  );
}

export default App;
