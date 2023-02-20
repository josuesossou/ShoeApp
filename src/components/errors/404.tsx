import { Grid } from '@mui/material';
import Logo from '../logo/Logo';

export default function ErrorPage() {
  return (
    <Grid container flexDirection='column' justifyContent='center' alignItems='center' sx={{ height: '80vh'}}>
        <Logo height={150} width={150} />
        <Grid item alignSelf={'center'}>
            <p>Page doesn't exist</p>
        </Grid>
    </Grid>
  )
}
