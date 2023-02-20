import styles from './Products.module.scss'
import Image from 'next/image';
import shoe9 from '../../assets/images/shoe9.png'
import ProductSidenav from './SideNav';
import Grid from '@mui/material/Unstable_Grid2';
import Link from 'next/link';

import { useContext, useEffect, useRef, useState } from 'react';
import { Product, Products } from '../../helpers/types';
import { Card, CardContent, CardMedia, Typography } from "@mui/material";
import { generateProductData } from '../../helpers/testDataGenerator';
import { getPriceString, shopifyDataToProducts } from '../../helpers/helpers';
import { useRouter } from 'next/router';
import { PagesContext } from '../../contexts/pagesDataContext';
import { getProductsInCollection } from '../../helpers/api/shopify';

interface CardPropsType {
    product: Products
}

const ProductCard = ({ product }: CardPropsType) => {
    const { title, handle, price, image } = product
    // const [pageData, passData] = useContext(PagesContext)
    // const router = useRouter()

    // const onClick = () => {
    //     passData({...pageData, product})
    //     router.push(`/product/${type}/${name}`)
    // }

    return (
        <Link href={`/product/${handle}`}>
            <Card elevation={1} className={styles.products_card}>
                <div>
                    <Image
                        alt='img'
                        src={image.url}
                        width={600}
                        height={600}
                    />
                </div>

                <CardContent>
                    <h3>{title}</h3>
                    {/* {type==='comingSoon' && <p>Coming Soon</p>}
                    {type==='linked' && <p>External Site</p>}
                    {type==='orderNow' && <p>Order Now</p>} */}
                    <p>{price}</p>
                </CardContent>
            </Card>
        </Link>
    )
}

export default function ProductsComp() {
    const [products, setProducts] = useState<Products[]>([])

    useEffect(() => {
        getProductsInCollection().then(res => {
            console.log(res)
            const prods:Products[] = res.map((node:any): Products => shopifyDataToProducts(node))
            setProducts(prods)
        })
    }, [])

    return (
        <Grid container gap={2} p={5} className={styles.products_wrapper}>
            <Grid xs={2}>
                <ProductSidenav />
            </Grid>

            <Grid flex={1}>
                <section className={styles.products_section} >
                    {products.map(product => (
                        <ProductCard key={product.handle} product={product} />
                    ))}
                </section>
            </Grid>
        </Grid>
    )
}