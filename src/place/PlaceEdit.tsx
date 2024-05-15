import React, {forwardRef} from 'react';
import Place from "./Place";
import Point from "ol/geom/Point";
import {Button, TextField} from "@mui/material";
import axios from "axios";
import placeApi from "../utils/PlaceApi";

interface PlaceEditProps {
    place: Place | null,
    loreId: number
}

const PlaceEdit = forwardRef( (props: PlaceEditProps, ref: any) => {
    let position = "";
    if(props && props.place) {
        let geometry = props.place.getGeometry() as Point;
        position = geometry.getCoordinates().toString();
    }

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
        const point = props.place?.getGeometry() as Point;
        await placeApi.createPlace(
            {
                name: name,
                description: description,
                point: {x: point.getCoordinates().at(0), y: point.getCoordinates().at(1)},
                creationLoreDate: new Date(),
                loreId: props.loreId,
                isSecret: false
            }
        )
    }

    return (
       <div ref={ref} style={{background: "white"}}>
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
           Position: {position}
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

export default PlaceEdit;
