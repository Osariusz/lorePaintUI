import React from 'react';
import { Button, TextField, Container, Typography } from '@mui/material';
import styled from '@emotion/styled';

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

const LoginPage: React.FC = () => {
    return (
        <StyledContainer>
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
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    autoFocus
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
                />
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                >
                    Sign In
                </Button>
            </StyledForm>
        </StyledContainer>
    );
};

export default LoginPage;
