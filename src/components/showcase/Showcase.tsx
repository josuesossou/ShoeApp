import Image from 'next/image'
import styles from './Showcase.module.scss'
import SouthIcon from '@mui/icons-material/South';
import { Button, Tooltip } from '@mui/material';
import Link from 'next/link';


export default function Showcase () {
    const bool = true

    if (bool) return (
        <section className={styles.showcase_section}>
            <video autoPlay muted width={400}>
                <source src={'http://localhost:1337/uploads/autrion_a065430a98.mp4'} />
            </video>
            {/* <Tooltip title="View Products"> */}
            <Link href='#products'>
                <Button>
                    <SouthIcon fontSize='medium' />
                </Button>
            </Link>
            {/* </Tooltip> */}
            
        </section>
    )

    return (
        <section className={styles.featured_section}>
            {/* <div>
                <Image 
                    src={bg2}
                    alt='background'
                    fill
                    style={{ objectFit: 'cover' }}
                />
            </div> 
            <div>
                <Image
                    src={shoe1}
                    alt='featured product'
                />
                <div>
                    <h2>Infinity</h2>
                    <small>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia quod sequi, quis enim commodi explicabo!</small>
                    <p>Order Now</p>
                </div>
            </div> */}
        </section>
    )
}