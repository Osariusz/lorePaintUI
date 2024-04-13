import React, {useState} from 'react';
import { Button, TextField, Container, Typography } from '@mui/material';
import styled from '@emotion/styled';
import axios from 'axios';
import  { Navigate } from 'react-router-dom'


const StyledContainer = styled(Container)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;

const StyledForm = styled('form')`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 360px;
`;

const RegisterPage: React.FC = () => {

    const TEMP_BACKEND = "http://localhost:8080/public/register";

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [registered, setRegistered] = useState(false);
    //const [cookies, setCookies] = useCookies();
    //const jwt = cookies.jwt;


    const onUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUsername(e.target.value);
    };
    const onPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    };

    const submit = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        try {
            const response = await axios.post(TEMP_BACKEND, {
                    username,
                    password
                }, {withCredentials: true}
            )
            if(response.status == 200) {
                setRegistered(true);
            }
            console.log(response);
        } catch (error: any) {
            console.log("Register failed" + error.message);
        }
    }

    return (<>
        {registered && <Navigate to="/login"/>}
        {!registered && <StyledContainer>
            <Typography variant="h4" component="h1">
                Login
            </Typography>
            <StyledForm noValidate autoComplete="off">
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Username"
                    name="username"
                    autoComplete="username"
                    autoFocus
                    onChange={onUsernameChange}
                />
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    onChange={onPasswordChange}
                />
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    onClick={submit}
                >
                    Register
                </Button>
            </StyledForm>
        </StyledContainer>}
        </>
    );
};

export default RegisterPage;
