import styled from "@emotion/styled";
import {Container} from "@mui/material";
import Lore from "../types/Lore";
import {useEffect, useState} from "react";
import LoreApi from "../utils/LoreApi";
import UserApi from "../utils/UserApi";
import PlaceApi from "../utils/PlaceApi";


const StyledContainer = styled(Container)`
    display: flex;
    flex: 2;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background: #8A8C85;
`;

const AdminPage = () => {

    const [lores, setLores] = useState<Lore[]>([]);
    const [users, setUsers] = useState<any[]>([]);
    const [places, setPlaces] = useState<any[]>([]);

    useEffect(() => {
        LoreApi.getAllLores().then((response) => {
            setLores(response);
        });
        UserApi.getAllUsers().then((response) => {
            setUsers(response);
        });
        PlaceApi.getAllPlaces().then((response) => {
            setPlaces(response);
        });
    }, [])

    return <StyledContainer maxWidth={false}>
        <h2>LORES</h2>
        {lores.map(lore => (<div>{JSON.stringify(lore)}</div>))}
        <h2>USERS</h2>
        {users.map(user => (<div>{JSON.stringify(user)}</div>))}
        <h2>PLACES</h2>
        {places.map(place => (<div>{JSON.stringify(place)}</div>))}
        <div style={{height: '100vh'}}/>

    </StyledContainer>;
};

export default AdminPage;
