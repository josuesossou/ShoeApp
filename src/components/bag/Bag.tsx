import Image from 'next/image'
import styles from './BagCheckout.module.scss'
import Logo from '../../assets/images/logo/Logo.png'
import NameLogo from '../../assets/images/logo/Name-logo.png'
import Link from 'next/link';
import Grid from '@mui/material/Unstable_Grid2';
import shoe9 from '../../assets/images/shoe9.png'
import { Badge, Button, Card, CardContent, colors, List } from '@mui/material';
import { navLinks } from '../../data/navLinks';
import { useState } from 'react';
import { lenghtToArray } from '../../helpers/helpers';
import { Close } from '@mui/icons-material';

const ItemCard = ({ forItem }: any) => {
    return (
        <Card 
            sx={{ 
                display: 'flex', 
                height: forItem? '10em': '5em' 
            }} 
            className={styles.bagCard}
        >
            {forItem && 
            <div>
                <Image alt='img' src={shoe9} fill />
            </div>}
            
            <CardContent sx={{ flex: 1 }}>
                <p>Product Name</p>
                <p>$120</p>
            </CardContent>
            {forItem &&
            <Button variant='contained'>
                <Close />
            </Button>}
        </Card>
    )
}

export default function BagComp() {
    const [isOpen, toggleIsOpen] = useState(false)

    return (
        <section className={styles.bag}>
            <Grid 
                container 
                flexDirection='column' 
                alignItems='center'
                
            >
                <h1>Your Bag</h1>

                {lenghtToArray(1).map(i => (
                    <ItemCard forItem />
                ))}
                <ItemCard />
                <Button fullWidth variant='contained'>
                    Check Out
                </Button>
            </Grid>
        </section>
    )
}