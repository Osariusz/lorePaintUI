import React, {useState} from "react";
import {Button} from "@mui/material";
import AuthApi from "../utils/AuthApi";
import LoreAddDetails from "./LoreAddDetails";

interface loreAddProps {
    reloadLores: any
}


const LoreAdd = (loreAddProps: loreAddProps) => {

    const [details, setDetails] = useState(false);

    const openDetails = async (e: React.MouseEvent<HTMLButtonElement>) => {
        setDetails(true);
    }

    const reloadLores = () => {
        loreAddProps.reloadLores();
        setDetails(false);
    }

    return (<>
        {details && <LoreAddDetails reloadLores={reloadLores}/>}
        <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            onClick={openDetails}
        >
            Create Lore
        </Button>
    </>);
};

export default LoreAdd;
