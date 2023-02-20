import { Button, Grid } from '@mui/material'
import { resendEmailConfirmation } from '../../helpers/api/auth'
import Logo from '../logo/Logo'
import styles from './errors.module.scss'

export default function NotVerifiedUser({ email } : { email: any}) {
    return (
        <>
            {/* <Navbar /> */}
            <Grid container className={styles.errors}>
                <Logo height={150} width={150} />
                <Grid item alignSelf={'center'}>
                    <p>A verification email was sent to your email address {email}</p>
                    <p>Please verify your email or <a onClick={()=>resendEmailConfirmation({ email, password: '' })}>
                        resend</a></p>
                </Grid>
            </Grid>
        </>
    )
}