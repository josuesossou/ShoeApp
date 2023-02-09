import Image from 'next/image'
import styles from './BagCheckout.module.scss'
import Logo from '../../assets/images/logo/Logo.png'
import NameLogo from '../../assets/images/logo/Name-logo.png'
import Link from 'next/link';
import Grid from '@mui/material/Unstable_Grid2';
import useSWR from 'swr'
import shoe9 from '../../assets/images/shoe9.png'
import { Badge, Button, Card, CardContent, colors, List, Skeleton } from '@mui/material';
import { navLinks } from '../../data/navLinks';
import { useContext, useState } from 'react';
import { lenghtToArray } from '../../helpers/helpers';
import { Close } from '@mui/icons-material';
import { PagesContext } from '../../contexts/pagesDataContext';
import { fetcher } from '../../helpers/api/shared';
import { BagItem } from '../../helpers/types';

const ItemCard = ({ bagItem }: { bagItem: BagItem}) => {
    const swrFetchProduct = useSWR({
        url: `/api/product:${bagItem.productTag}`, 
    }, fetcher)

    if (!swrFetchProduct.data) return <Skeleton variant="rectangular" className={styles.skeleton} />

    return (
        <Card className={styles.bagCard}>
            {bagItem && 
            <div>
                <Image alt='img' src={shoe9} fill />
            </div>}
            
            <CardContent sx={{ flex: 1 }}>
                <p>bagItem Name</p>
                <p>$120</p>
            </CardContent>

            {bagItem &&
            <Button variant='contained'>
                <Close />
            </Button>}
        </Card>
    )
}

export default function BagComp() {
    const [isOpen, toggleIsOpen] = useState(false)
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
                    <ItemCard bagItem={bagItem} />
                ))}

                <Card elevation={0} className={styles.subtotal}>
                    <CardContent>
                        <h2>Subtotal</h2>
                        
                        <small>Taxes and shipping calculated at checkout</small>
                    </CardContent>
                </Card>

                <br />
                <Link href='/checkout'>
                    <Button fullWidth variant='contained'>
                        Check Out $600
                    </Button>
                </Link>

            </Grid>
        </section>
    )
}
