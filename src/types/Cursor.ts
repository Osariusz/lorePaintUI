import {Overlay} from "ol";

interface Cursor {
    id: number,
    name: string,
    color: string,
    overlay: Overlay | undefined
}

export const defaultProps = {
    color: "red"
}

export default Cursor;