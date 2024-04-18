import styled from "@emotion/styled";
import {Container} from "@mui/material";
import Lore from "../types/Lore";

const StyledContainer = styled(Container)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;

interface LoreEntryProps {
    lore: Lore
}

const LoreEntry = (props: LoreEntryProps) => {

    return <StyledContainer>
        {props.lore.name}
    </StyledContainer>;
};

export default LoreEntry;
