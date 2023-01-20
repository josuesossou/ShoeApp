import { Grid } from "@mui/material";

export default function AdminPage() {
    return (
        <Grid container spacing={2} marginTop='4em'>
            <Grid item xs={12}>
                header
            </Grid>
            <Grid item xs={2}>
                sidebar
            </Grid>
            <Grid item xs={8}>
                main
            </Grid>
        </Grid>
    )
}