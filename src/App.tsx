import React from 'react';
import logo from './logo.svg';
import './App.css';
import LoginPage from "./loginPage/LoginPage";
import GlobalStyle from "./GlobalStyle";
import LorePage from "./lorePage/LorePage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import RegisterPage from "./loginPage/RegisterPage";
import BrowsePage from "./browsePage/BrowsePage";
import Lore from "./types/Lore";
import {defaultProps} from "./types/Lore";
import {StompSessionProvider} from "react-stomp-hooks";
import Api, {backendURL} from "./utils/Api";
import AdminPage from "./admin/AdmiPage";
import MainPage from "./MainPage";
import Logout from "./logout/Logout";

function App() {
  return (//<GlobalStyle/>
      <BrowserRouter>
          <Routes>
              <Route index path="/login" element={<LoginPage/>}/>
              <Route index path="/logout" element={<Logout/>}/>
              <Route index path="/register" element={<RegisterPage/>}/>
              <Route path="/lore/:id" element={<StompSessionProvider url={backendURL+'/api/ws-endpoint'}><LorePage/></StompSessionProvider>}/>
              <Route path="/browse" element={<BrowsePage/>}/>
              <Route path="/admin" element={<AdminPage/>}/>
              <Route path="/" element={<MainPage/>}/>
          </Routes>
      </BrowserRouter>
  );
}

export default App;
