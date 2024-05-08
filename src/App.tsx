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

const lores = [
    {...defaultProps,id: 0,name: "Ziemia",description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut sed nunc non felis placerat bibendum. Morbi vulputate at arcu nec convallis. In ullamcorper ligula vel massa sagittis, at malesuada odio molestie. Fusce vel est lectus. Sed aliquam pretium justo ut iaculis. Duis commodo orci eget luctus aliquet. Quisque et odio lacus. Ut sed iaculis lorem. Nunc auctor aliquam congue. Interdum et malesuada fames ac ante ipsum primis in faucibus. Vestibulum pellentesque neque in eros sagittis elementum.",picturePath:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRq-_H3qxKQjW-ubcKlW0boiFOQ6tokXtYB3eCHLy18hQ&s"},
    {...defaultProps,id: 1,name: "Biedorbis",description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut sed nunc non felis placerat bibendum. Morbi vulputate at arcu nec convallis. In ullamcorper ligula vel massa sagittis, at malesuada odio molestie. Fusce vel est lectus. Sed aliquam pretium justo ut iaculis. Duis commodo orci eget luctus aliquet. Quisque et odio lacus. Ut sed iaculis lorem. Nunc auctor aliquam congue. Interdum et malesuada fames ac ante ipsum primis in faucibus. Vestibulum pellentesque neque in eros sagittis elementum.",picturePath:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRq-_H3qxKQjW-ubcKlW0boiFOQ6tokXtYB3eCHLy18hQ&s"}

]

function App() {
  return (//<GlobalStyle/>
      <BrowserRouter>
          <Routes>
              <Route index path="/login" element={<LoginPage/>}/>
              <Route index path="/register" element={<RegisterPage/>}/>
              <Route path="/lore/:id" element={<StompSessionProvider url={'http://localhost:8080/api/ws-endpoint'}><LorePage/></StompSessionProvider>}/>
              <Route path="/browse" element={<BrowsePage/>}/>
          </Routes>
      </BrowserRouter>
  );
}

export default App;
