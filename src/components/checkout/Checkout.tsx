
import Grid from '@mui/material/Unstable_Grid2';
import styles from './Checkout.module.scss'
import Logo from '../logo/Logo';
import { useContext, useEffect } from 'react';
import { PagesContext } from '../../contexts/pagesDataContext';
import { ItemCard, LineDivider } from '../common/Common';
import { nanoid } from 'nanoid';
import { Button } from '@mui/material';

export default function CheckoutComp() {
    const [pageData, passData] = useContext(PagesContext)
    // useEffect(() => {
    //     // getProductsInCollection()
    //     // .then(data => console.log(data))
    // }, [])

    return (
        <Grid container className={styles.checkout}>
            <Grid xs={7}>
                <section>
                    <Logo height={100} width={100} />

                </section>
            </Grid>
            <Grid flex={1}>
                <section>
                    {pageData.bag?.map(bagItem => (
                        <ItemCard 
                            key={nanoid(4)}
                            bagItem={bagItem} 
                            noCloseBtn
                            small
                        />
                    ))}

                    <LineDivider thickness={.5} />
                </section>
            </Grid>
        </Grid>
    )
}
