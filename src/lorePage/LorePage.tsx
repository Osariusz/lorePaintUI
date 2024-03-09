import React, {ForwardedRef, forwardRef, useState} from "react";
// @ts-ignore
import { ComposableMap, ZoomableGroup, useMapContext } from "react-simple-maps";
import Place from "../place/Place";



const LorePage = () => {
    const [places, setPlaces] = useState([]);

    const imageWidth = 1653;
    const imageHeight = 796;

    // @ts-ignore
    const PlaceWithMapContext = ({ position }) => {
        const { projection } = useMapContext();
        const projectedPosition = projection(position);
        console.log("map position")
        console.log(projectedPosition);
        return <Place position={projectedPosition} />;
    };



    const clickHandler = (event:any) => {
        let {innerWidth: width, innerHeight: height} = window;

        let aspectRatio = width/height;

        if(imageWidth/imageHeight > aspectRatio) {
            height = (imageHeight/imageWidth)*width;
        }
        else {
            width = (imageWidth/imageHeight)*height;
        }


        const coordinates = [event.clientX-width/2, event.clientY-height/2];
        console.log("click coords")
        console.log(coordinates)
        addPlace(coordinates);
    }

    type Props = {
        coordinates?: [[number, number], [number, number]];
        [key: string]: any;
    };

    const CustomLine = forwardRef(
        ({ coordinates = [[0, 0], [65, 0]], ...restProps }: Props, ref: ForwardedRef<any>) => {
            const { projection } = useMapContext()
            const [x1, y1] = projection(coordinates[0])
            const [x2, y2] = projection(coordinates[1])
            return <line x1={x1} y1={y1} x2={x2} y2={y2} {...restProps} />
        }
    )

    const addPlace = (position:any) => {
        // @ts-ignore
        setPlaces(prevPlaces => [...prevPlaces, <PlaceWithMapContext position={position}/>]);
    }

    return (
        <ComposableMap width={imageWidth} height={imageHeight} projection="geoMercator" projectionConfig={{center: [0,0]}} onClick={clickHandler}>
            <ZoomableGroup zoom={1} maxZoom={20} minZoom={0} style={{border:5, borderColor: "black"}}>
                <image id={"image"} href={"https://cdn.discordapp.com/attachments/436214161077436426/1215728818174697513/image.png?ex=65fdceb1&is=65eb59b1&hm=b43de10d49dc3ef3bc227ff0c541b10642d10d83accc15ff85e46c3ff016f506&"}/>
                {places}
                <CustomLine coordinates={[[0,0], [500,0]]}
                            strokeWidth={3}
                            stroke="#000000"></CustomLine>
            </ZoomableGroup>
        </ComposableMap>
    );
};

export default LorePage;
