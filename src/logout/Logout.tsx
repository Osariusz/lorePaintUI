import React, {useState} from 'react';
import { Button, TextField, Container, Typography } from '@mui/material';
import styled from '@emotion/styled';
import axios from 'axios';
import  { Navigate } from 'react-router-dom'
import AuthApi from "../utils/AuthApi";


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
    const [logout, setLogout] = useState(false);

    const onLogout = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        await AuthApi.logout(setLogout);
    }

    return (<>
            {logout && <Navigate to="/"/>}
            {!logout && <StyledContainer>
              <StyledForm noValidate autoComplete="off">
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    onClick={onLogout}
                >
                  Log out
                </Button>
              </StyledForm>
            </StyledContainer>}
        </>
    );
};

export default RegisterPage;
