import {Button} from "@mui/material";

const LoreButton = ({buttonJustify, ...props}: any) => {
    return <div style={{ display: 'flex', justifyContent: props.buttonJustify}}>
        <Button {...props}></Button>
    </div>;
}

export default LoreButton;