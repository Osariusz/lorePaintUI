import styled from "@emotion/styled";
import {Container} from "@mui/material";
import LorePage from "../lorePage/LorePage";
import Place from "../place/Place";
import LoreEntry from "./LoreEntry";
import Lore from "../types/Lore";


const StyledContainer = styled(Container)`
    display: flex;
    flex: 2;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background: #8A8C85;
`;

interface BrowsePageProps {
    lores: Lore[]
}

const BrowsePage = (props: BrowsePageProps) => {

    return <StyledContainer maxWidth={false}>
        {props.lores.map(lore => (<LoreEntry key={lore.id} lore={lore}/>))}
    <div style={{ width: '100%', height: '100vh' }} />
    </StyledContainer>;
};

export default BrowsePage;
