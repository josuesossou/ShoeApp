import { CenterFocusStrong } from '@mui/icons-material';
import { Grid } from '@mui/material';
export default function ErrorPage() {
  return (
    <Grid container justifyContent='center' alignItems='center' sx={{ height: '80vh'}}>
        <Grid item alignSelf={'center'}>
            <p>Page doesn't exist</p>
        </Grid>
    </Grid>
  )
}
