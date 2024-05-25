import React, {forwardRef} from 'react';
import {Button, TextField} from "@mui/material";
import loreApi from "../utils/LoreApi";

const LoreAddDetails = forwardRef( () => {

        const [name, setName] = React.useState("");
        const [description, setDescription] = React.useState("");

        const onNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            setName(e.target.value);
        }
        const onDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            setDescription(e.target.value);
        }

        const submit = async (e: React.MouseEvent<HTMLButtonElement>) => {
            e.preventDefault();
            await loreApi.createLore(
                {
                    name: name,
                    description: description
                }
            )
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
)

export default LoreAddDetails;
