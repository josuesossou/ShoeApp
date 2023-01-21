import { Divider, IconButton, InputBase, Paper } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search"

type PropsType = {
    setQuery: any
}

export default function DynamicTextField({ setQuery }: PropsType) {
    return (
        <Paper
            component="form"
            elevation={0}
            sx={{ pl: '.9em', pr: '.1em', display: 'flex', alignItems: 'center'}}
        >
            <InputBase 
                aria-label='search' 
                placeholder={``}
                fullWidth multiline 
                onChange={setQuery}
                autoComplete=''
                inputProps={{ 'aria-label': 'search google maps' }}
            />
            <Divider orientation="vertical"  sx={{  height: 'auto', alignSelf: 'stretch'}} />
            <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
                <SearchIcon />
            </IconButton>
        </Paper>
    )
}