
import styles from './BagCheckout.module.scss'
import Grid from '@mui/material/Unstable_Grid2'
import { Button, Card, CardContent } from '@mui/material';
import { useContext } from 'react';
import { PagesContext } from '../../contexts/pagesDataContext';
import { BagItem } from '../../helpers/types';
import { nanoid } from 'nanoid';
import { BagItemCard } from '../common/Common';
import { checkout } from '../../helpers/api/shopify';
import { getListItems } from '../../helpers/helpers';
import { useRouter } from 'next/router';

const totalPrice = (bagItems: BagItem[]): number => {
    let total = 0

    if (!bagItems || bagItems.length === 0) return 0

    bagItems.forEach(item => {
        total += Number(item.productPrice) 
    })

    return total
}

export default function BagComp() {
    const [pageData, _] = useContext(PagesContext)
    const router = useRouter()

    const goToCheckout = () => {
        const itemList:string = getListItems(pageData.bag!)
        checkout(itemList)
        .then((data) => {
            location.href = data.webUrl
        })
        .catch(err => {
            console.log(err)
        })
    }

    if (!pageData.bag || pageData.bag.length < 1) {
        return (
            <section className={styles.bag}>
                <Grid 
                    container 
                    flexDirection='column' 
                    alignItems='center'
                >
                    <h1>Your Bag</h1>
                    <br />
                    <p>You do not have any item in your bag</p>
                </Grid>
            </section>
        )
    }

    return (
        <section className={styles.bag}>
            <Grid 
                container 
                flexDirection='column' 
                alignItems='center'
            >
                <h1>Your Bag</h1>

                {pageData.bag?.map(bagItem => (
                    <BagItemCard 
                        key={nanoid(4)}
                        bagItem={bagItem} 
                    />
                ))}

                <Card className={styles.subtotal}>
                    <CardContent>
                        <h2>Subtotal</h2>
                        <br />
                        <small>Taxes and shipping calculated at checkout</small>
                    </CardContent>
                </Card>

                <br />
                <Button 
                    fullWidth 
                    variant='contained'
                    onClick={goToCheckout}
                >
                    Check Out ${totalPrice(pageData.bag || [])}
                </Button>
            </Grid>
        </section>
    )
}
