import styled from 'styled-components';
import Lore from "../types/Lore";
import {Button, Grid, TextField} from "@mui/material";
import LoreButton from "../utils/LoreButton";
import React, {useState} from "react";
import {Navigate} from "react-router-dom";
import LoreApi from "../utils/LoreApi";

interface LoreEntryProps {
    lore: Lore
}

const StyledContainer = styled.div`
    display: flex;
    justify-content: flex-start;
    align-items: center;
    width: 100%;
    height: 100%;
    background-size: cover;
    background-position: center;
`;

const LoreImage = styled.img`
    width: 100%;
    height: auto;
`;

const fontColor = "#A89A7F";

const LoreName = styled.h1`
    font-size: 2em;
    text-align: center;
    color: ${fontColor};
`;

const LoreDescription = styled.p`
    font-size: 1em;
    color: ${fontColor};
`;

const LoreEntry = (props: LoreEntryProps) => {
    const { lore } = props;
    const [loreClicked, setLoreClicked] = useState(false);

    const [username, setUsername] = useState("");

    const onLoreClick = () => {
        setLoreClicked(true);
    }

    const onAddUserClicked = () => {
        LoreApi.addUser(lore.id, username);
    }

    const onUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUsername(e.target.value);
    }

    return (<>
        {loreClicked && <Navigate to={`/lore/${lore.id}`}/>}
        {!loreClicked && <StyledContainer style={{ backgroundColor: '#534439' }}>
            <Grid item>
                <img src={lore.picturePath} alt={lore.name} />
            </Grid>
            <Grid item xs={true} style={{display: 'flex', flexDirection: 'column',justifyContent: 'flex-end'}}>
                <LoreName>{lore.name}</LoreName>
                <LoreDescription>{lore.description}</LoreDescription>
                <LoreButton onClick={onLoreClick} buttonJustify={'right'} style={{backgroundColor: '#AC9C7A', color: '#66573D', margin: "1vh"}}>Join</LoreButton>
            </Grid>
          <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="user to add"
              label="User to Add"
              name="user to add"
              autoFocus
              onChange={onUsernameChange}
          />
          <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              onClick={onAddUserClicked}
          >
            Add User
          </Button>
        </StyledContainer>}
    </>);
};

export default LoreEntry;
