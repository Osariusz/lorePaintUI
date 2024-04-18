interface Lore {
    id: number,
    name: string,
    description: string,
    picturePath: string
}

export const defaultProps = {
    description: "",
    picturePath: ""
}

export default Lore;