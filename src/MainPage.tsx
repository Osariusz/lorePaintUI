import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import styled from 'styled-components';
import './App.css';
import {Container} from "@mui/material"; // Import your CSS

const StyledContainer = styled(Container)`
    display: flex;
    flex: 2;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background: #8A8C85;
    width: 100%;
    max-width: none;
    height: 100vh;
`;

const MainPage: React.FC = () => {
    return (
        <StyledContainer>
            <img src="https://cdn.pixabay.com/photo/2020/05/06/12/01/compass-5137269_1280.jpg" className="App-logo" alt="logo" />
            <h1>LorePaint</h1>
            <p>
                This is a collaborative platform where you can edit and contribute to our shared lore and map.
                Join us and be part of this amazing journey!
            </p>
            <nav>
                <ul>
                    <li><Link to="/register">Register</Link></li>
                    <li><Link to="/login">Login</Link></li>
                    <li><Link to="/browse">Browse</Link></li>
                    <li><Link to="/admin">Admin</Link></li>
                </ul>
            </nav>
        </StyledContainer>
    );
}

export default MainPage;
