
import styles from './BagCheckout.module.scss'
import Link from 'next/link';
import Grid from '@mui/material/Unstable_Grid2';
import shoe9 from '../../assets/images/shoe9.png'
import { Badge, Button, Card, CardContent, Skeleton } from '@mui/material';
import { useContext, useState } from 'react';
import { Close } from '@mui/icons-material';
import { PagesContext } from '../../contexts/pagesDataContext';
import { BagItem } from '../../helpers/types';
import { nanoid } from 'nanoid';
import { ItemCard } from '../common/Common';



const totalPrice = (bagItems: BagItem[]): number => {
    let total = 0

    if (!bagItems || bagItems.length === 0) return 0

    bagItems.forEach(item => {
        total += Number(item.productPrice) 
    })

    console.log('newBgItem',total)

    return total
}

export default function BagComp() {
    const [pageData, passData] = useContext(PagesContext)

    return (
        <section className={styles.bag}>
            <Grid 
                container 
                flexDirection='column' 
                alignItems='center'
                
            >
                <h1>Your Bag</h1>

                {pageData.bag?.map(bagItem => (
                    <ItemCard 
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
                <Link href='/checkout'>
                    <Button fullWidth variant='contained' >
                        Check Out ${totalPrice(pageData.bag || [])}
                    </Button>
                </Link>

            </Grid>
        </section>
    )
}
