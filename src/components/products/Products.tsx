import styles from './Products.module.scss'
import Image from 'next/image';
import shoe9 from '../../assets/images/shoe9.png'
import ProductSidenav from './SideNav';
import Grid from '@mui/material/Unstable_Grid2';
import Link from 'next/link';

import { useContext, useEffect, useRef, useState } from 'react';
import { Product } from '../../helpers/types';
import { Card, CardContent, CardMedia, Typography } from "@mui/material";
import { generateProductData } from '../../helpers/testDataGenerator';
import { getPriceString } from '../../helpers/helpers';
import { useRouter } from 'next/router';
import { PagesContext } from '../../contexts/pagesDataContext';

interface CardPropsType {
    product: Product
}

const ProductCard = ({ product }: CardPropsType) => {
    const { type, name, price } = product
    const [pageData, passData] = useContext(PagesContext)
    const router = useRouter()

    // const onClick = () => {
    //     passData({...pageData, product})
    //     router.push(`/product/${type}/${name}`)
    // }

    return (
        <Link href={`/product/${type}/${name}`}>
            <Card elevation={0} className={styles.products_card}>
                <div>
                    <Image
                        alt='img'
                        src={shoe9}
                    />
                </div>

                <CardContent>
                    <p>{name}</p>
                    {type==='comingSoon' && <p>Coming Soon</p>}
                    {type==='linked' && <p>Affiliate Product </p>}
                    {type==='orderNow' && <p>Order Now</p>}
                    <p>{getPriceString(price)}</p>
                </CardContent>
            </Card>
        </Link>
    )
}

export default function ProductsComp() {
    const [products, setProducts] = useState<Product[]>([])

    useEffect(() => {
        const prods = generateProductData(9)
        setProducts(prods)
    }, [])

    return (
        <Grid container gap={2} p={5} className={styles.products_wrapper}>
            <Grid xs={2}>
                <ProductSidenav />
            </Grid>

            <Grid flex={1}>
                <section className={styles.products_section} >
                    {products.map(product => (
                        <ProductCard key={product.name} product={product} />
                    ))}
                </section>
            </Grid>
        </Grid>
    )
}