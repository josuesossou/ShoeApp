import { Grid } from '@mui/material';
export default function ErrorPage() {
    return (
        <Grid container justifyContent='center' alignItems='center' sx={{ height: '80vh'}}>
            <Grid item alignSelf={'center'}>
                Page doesn't exist
            </Grid>
        </Grid>
    )
}
