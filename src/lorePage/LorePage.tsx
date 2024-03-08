import React from "react";
import {ComposableMap, ZoomableGroup, Marker} from "react-simple-maps";
import Place from "../place/Place";

// url to a valid topojson file
const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";


const LorePage = () => {
    return (

        <div>
            <ComposableMap projection={"geoMercator"}>
                <ZoomableGroup center={[0, 0]} zoom={10} maxZoom={20} minZoom={0}>
                    <image
                        href={"https://cdn.discordapp.com/attachments/436214161077436426/1215728818174697513/image.png?ex=65fdceb1&is=65eb59b1&hm=b43de10d49dc3ef3bc227ff0c541b10642d10d83accc15ff85e46c3ff016f506&"}/>

                    <Place
                    position={[495, -15]}
                    size={[60,60]}
                    />
                    <Place position={[100, -84]}/>
                </ZoomableGroup>
            </ComposableMap>
        </div>

    );
};

export default LorePage;