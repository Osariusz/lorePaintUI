import React, {forwardRef, useEffect} from 'react';
import Place from "./Place";
import Point from "ol/geom/Point";
import {Button, Checkbox, FormControlLabel, TextField} from "@mui/material";
import axios from "axios";
import placeApi from "../utils/PlaceApi";
import api from "../utils/Api";
import PlaceUpdateApi from "../utils/PlaceUpdateApi";
import place from "./Place";
import PlaceApi from "../utils/PlaceApi";
import placeUpdateApi from "../utils/PlaceUpdateApi";
import AIApi from "../utils/AIApi";
import {Overlay} from "ol";

interface PlaceEditProps {
    place: Place | null,
    loreId: number,
    currentLoreYear: number,
    name?: string,
    description?: string,
    loreYear?: number,
    editOverlay: Overlay
}

const defaultProps = {
    name: "",
    description: "",
    loreYear: 2024
}

const PlaceEdit = forwardRef( (props: PlaceEditProps, ref: any) => {
    props = {...defaultProps, ...props};
    let position = "";
    if(props && props.place) {
        let geometry = props.place.getGeometry() as Point;
        position = geometry.getCoordinates().toString();
    }
    const [name, setName] = React.useState(props.name);
    const [description, setDescription] = React.useState(props.description);
    const [year, setYear] = React.useState(props.loreYear);
    const [isSecret, setIsSecret] = React.useState(false);
    const [isAiView, setIsAiView] = React.useState(false);
    const [prompt, setPrompt] = React.useState("");
    const [aiGenerationStatus, setAiGenerationStatus] = React.useState<String | null>(null);

    useEffect(() => {
        console.log(props);
        if(props.place && props.place.getBackendId() != 0) { //todo add place data update after creation instead of checking if id is not temporary
            console.log("props present");
            PlaceApi.getPlace(props.place.getBackendId()).then(response => {
                console.log(response);
                setName(response.name);
                setIsSecret(response.isSecret)
            })
            PlaceUpdateApi.getLastPlaceUpdate(props.place.getBackendId(), props.currentLoreYear).then(
                response => {
                    let date = new Date(response.lore_date);
                    setDescription(response.description);
                    setYear(date.getFullYear());
                }
            );
        }
    }, [props.place]);

    const onNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value);
    }
    const onDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setDescription(e.target.value);
    }
    const onYearChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setYear(parseInt(e.target.value));
    }
    const onIsSecretChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setIsSecret(e.target.checked);
    }

    const onPromptChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPrompt(e.target.value);
    }

    const setAiView = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setIsAiView(true);
    }

    const submit = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        const point = props.place?.getGeometry() as Point;
        let date = new Date(`${year!.toString().padStart(4, '0')}-01-01` );
        let dateString = date.toISOString();
        console.log(props.place);
        if(!props.place || props.place.getBackendId() == 0) { //todo: change new place handling
            await placeApi.createPlace(
                {
                    name: name!,
                    description: description!,
                    point: {x: point.getCoordinates().at(0), y: point.getCoordinates().at(1)},
                    creationLoreDate: date,
                    loreId: props.loreId,
                    isSecret: isSecret
                }
            ).then(() => {
                props.editOverlay.setPosition(undefined);
            })
        }
        else {
            await placeUpdateApi.createPlaceUpdate(props.place.getBackendId(),
                {
                    description: description!,
                    lore_date: date,
                    placeId: props.place.getBackendId()
                }
            );
        }
    }

    const generate = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setIsAiView(false);
        setAiGenerationStatus("WAIT THE AI IS GENERATING");

        AIApi.getPlaceDescription(
            {
                name: name ? name : "No name provided",
                info: prompt
            }
        ).then((response: string) => {
            setDescription(response);
            setAiGenerationStatus(null);
        }).catch(() => {
            setAiGenerationStatus("ERROR");
        })
    }

    return (
       <div ref={ref} style={{background: "white"}}>

           {!isAiView && <>
             <TextField
               variant="outlined"
               margin="normal"
               required
               fullWidth
               id="place name"
               label="Name"
               name="place name"
               autoFocus
               value={name}
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
               value={description}
               onChange={onDescriptionChange}
           />
           <TextField
               variant="outlined"
               margin="normal"
               required
               fullWidth
               id="start year"
               label="Start Year"
               name="start year"
               autoFocus
               value={year}
               onChange={onYearChange}
           />
           <div>Position: {position}</div>
           <FormControlLabel
               label = "Is secret?"
               control={<Checkbox
                   id="is secret checkbox"
                   name="is secret checkbox"
                   checked={isSecret}
                   onChange={onIsSecretChange}
               />}/>
           <Button
               type="submit"
               fullWidth
               variant="contained"
               color="primary"
               onClick={submit}
           >
               Submit
           </Button>
             {!aiGenerationStatus && <Button
             type="submit"
             fullWidth
             variant="contained"
             color="primary"
             onClick={setAiView}
         >
           AI Generation
         </Button> }
               {aiGenerationStatus}
           </>}
           {isAiView && <>
             <TextField
                 variant="outlined"
                 margin="normal"
                 required
                 fullWidth
                 id="place name"
                 label="Name"
                 name="place name"
                 autoFocus
                 value={name}
                 onChange={onNameChange}
             />
             <TextField
                 variant="outlined"
                 margin="normal"
                 required
                 fullWidth
                 id="prompt"
                 label="Prompt"
                 name="prompt"
                 autoFocus
                 onChange={onPromptChange}
             />
             <Button
                 type="submit"
                 fullWidth
                 variant="contained"
                 color="primary"
                 onClick={generate}
             >
               Generate
             </Button>
           </>}
       </div>
    );
}
)

export default PlaceEdit;
