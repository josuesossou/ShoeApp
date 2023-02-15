
import Grid from '@mui/material/Unstable_Grid2';
import styles from './Checkout.module.scss'
import { useEffect } from 'react';
import { getProductsInCollection } from '../../helpers/api/shopify';
import Logo from '../logo/Logo';

export default function CheckoutComp() {

    useEffect(() => {
        getProductsInCollection()
        .then(data => console.log(data))
    }, [])

    return (
        <Grid container className={styles.checkout}>
            <Grid xs={7}>
                <Logo />
            </Grid>
            <Grid>

            </Grid>
        </Grid>
    )
}
