import { TextField } from "@mui/material";
import { ChangeEventHandler } from "react";

type PropsType = {
    setQuery: any
}

export default function DynamicTextField({ setQuery }: PropsType) {
    return (
        <>
            <TextField 
                variant="standard"
                label='Search' 
                aria-label="search" 
                fullWidth multiline 
                onChange={setQuery}
            />
        </>
    )
}