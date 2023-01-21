import { Paper, TextField } from "@mui/material";
import { ChangeEventHandler } from "react";

type PropsType = {
    setQuery: any
}

export default function DynamicTextField({ setQuery }: PropsType) {
    return (
        <Paper
            component="form"
            sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400 }}
        >
            <TextField 
                variant="standard"
                label='Search' 
                aria-label="search" 
                fullWidth multiline 
                onChange={setQuery}
                autoComplete=''
            />
        </Paper>
    )
}