import React from "react";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";

// url to a valid topojson file
const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

const LorePage = () => {
    return (
        <div>
            <ComposableMap>
                <Geographies geography={geoUrl}>
            {({ geographies }) =>
    geographies.map((geo) => <Geography key={geo.rsmKey} geography={geo} />)
}
    </Geographies>
    </ComposableMap>
    </div>
);
};

export default LorePage;