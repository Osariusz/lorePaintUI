import styled from "@emotion/styled";
import {Container} from "@mui/material";
import LorePage from "../lorePage/LorePage";
import Place from "../place/Place";
import LoreEntry from "./LoreEntry";
import Lore from "../types/Lore";


const StyledContainer = styled(Container)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;

interface BrowsePageProps {
    lores: [Lore]
}

const BrowsePage = (props: BrowsePageProps) => {

    return <StyledContainer>
        {props.lores.map(lore => (<LoreEntry lore={lore}/>))}
    <div style={{ width: '100%', height: '100vh' }} />
    </StyledContainer>;
};

export default BrowsePage;
