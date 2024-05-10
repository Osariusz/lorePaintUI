import React, {forwardRef} from 'react';
import Point from "ol/geom/Point";
import {Button, TextField} from "@mui/material";
import axios from "axios";
import placeApi from "../utils/PlaceApi";
import {Coordinate} from "ol/coordinate";

interface UserCursorProps {
    color: string
}

const UserCursor = forwardRef( (props: UserCursorProps, ref: any) => {

        return (
            <div ref={ref} style={{background: "white", userSelect: "none"}}>
               bleble
            </div>
        );
    }
)

export default UserCursor;
