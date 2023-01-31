import Image from 'next/image'
import styles from './Featured.module.scss'
import shoe1 from '../../assets/images/shoe1.png'
import shoe6 from '../../assets/images/shoe6.jpeg'
import shoe5 from '../../assets/images/shoe5.jpeg'
import shoe7 from '../../assets/images/shoe7.jpeg'
import bg2 from '../../assets/images/tech.webp'
import { Button } from '@mui/material'
import Link from 'next/link'


export default function Featured () {
    const bool = false
    const video = false

    if (video) return (
        <section className={styles.featured_section}>
            <div>
                
            </div>
        </section>
    )

    if (bool) return (
        <section className={styles.featured_section}>
            <div>
                <Image 
                    src={shoe6}
                    alt='background'
                    fill
                    style={{ objectFit: 'contain' }}
                />
                <h2>Infinity</h2>
            </div>
        </section>
    )

    return (
        <section className={styles.featured_section}>
            <div>
                {/* <Image 
                    src={shoe7}
                    alt='background'
                    fill
                    style={{ objectFit: 'cover' }}
                /> */}
            </div> 
            <div>
                <Link href={'/product/order/1'}>
                    <Button size='small'>
                        View Product
                    </Button>
                </Link>
                <Image
                    src={shoe1}
                    alt='featured product'
                    style={{ objectFit: 'contain'}}
                />
                <div>
                    <h2>Infinity</h2>
                    <small>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia quod sequi, quis enim commodi explicabo!</small>
                    <p>Order Now</p>
                </div>
            </div>
        </section>
    )
}