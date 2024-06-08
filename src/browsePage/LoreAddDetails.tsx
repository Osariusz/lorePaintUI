import React, {forwardRef} from 'react';
import {Button, TextField} from "@mui/material";
import loreApi from "../utils/LoreApi";
import Place from "../place/Place";

interface loreAddDetailsProps {
    reloadLores: any
}

const LoreAddDetails =  (loreAddDetailsProps: loreAddDetailsProps) => {
    const [name, setName] = React.useState("");
    const [description, setDescription] = React.useState("");
    const [mapPath, setMapPath] = React.useState("");

    const onNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value);
    }
    const onDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setDescription(e.target.value);
    }
    const onMapPathChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setMapPath(e.target.value);
    }

    const submit = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        await loreApi.createLore(
            {
                name: name,
                description: description,
                map_path: mapPath
            }
        ).then(() => {
            loreAddDetailsProps.reloadLores();
        })
    }

    return (
        <div style={{background: "white"}}>
            <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="place name"
                label="Name"
                name="place name"
                autoFocus
                onChange={onNameChange}
            />
            <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="place description"
                label="Description"
                name="place description"
                autoFocus
                onChange={onDescriptionChange}
            />
            <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="map path"
                label="Map Path"
                name="map path"
                autoFocus
                onChange={onMapPathChange}
            />
            <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                onClick={submit}
            >
                Submit
            </Button>
        </div>
    );
}

export default LoreAddDetails;
