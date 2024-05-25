import React, {useState} from "react";
import {Button} from "@mui/material";
import AuthApi from "../utils/AuthApi";
import LoreAddDetails from "./LoreAddDetails";

const LoreAdd = () => {

    const [details, setDetails] = useState(false);

    const openDetails = async (e: React.MouseEvent<HTMLButtonElement>) => {
        setDetails(true);
    }

    return (<>
        {details && <LoreAddDetails/>}
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
