import styles from './Products.module.scss'
import Grid from '@mui/material/Unstable_Grid2'
import { useContext, useEffect, useState } from 'react'
import { PagesContext } from '../../contexts/pagesDataContext'
import { getPriceString } from '../../helpers/helpers'
import { Product } from '../../helpers/types'
import { LineDivider } from '../common/Common'
import { Button, Stack } from '@mui/material'
import { generateProductData } from '../../helpers/testDataGenerator'
import { shoeSizes } from '../../data/productSizes'

interface SizeBtnProps {
    size: string,
    onClick: any,
    selected: string
}

const SizeButton = ({ size, onClick, selected }: SizeBtnProps) => {
    return (
        <Button
            className={selected === size? styles.size_selected: ''}
            size='small'
            onClick={onClick}
        >   
            {size}
        </Button>
    )
}

// Comp short for Component
const SizesComp = ({setSelected, selected}: any) => {
    return (
        <div className={styles.sizes_comp}>
            <Grid justifyContent='space-between' container>
                <p>SIZE</p>
                <p>Size Chart</p>
            </Grid>
            <br />
            <Stack
                direction="row"
                flexWrap='wrap'
                justifyContent='space-between'
                gap={1}
            >
                {shoeSizes.USMen.map(size => (
                    <SizeButton 
                        size={size} 
                        onClick={() => setSelected(size)}
                        selected={selected}
                    />
                ))}
            </Stack>
        </div>
    )
}

const Quantity = ({ quantity, increment}: any) => {
    return (
        <div className={styles.quantity_comp}>
            <p>QUANTITY</p>
                <br />
                <Grid container gap={1}>
                    <Button 
                        variant='outlined'
                        onClick={() => {
                            if (quantity > 1) increment(quantity - 1)
                        }}
                    >
                        -
                    </Button>
                    <Button style={{ flex: 1 }} variant='outlined' disabled>
                        {quantity}
                    </Button>
                    <Button 
                        variant='outlined'
                        onClick={() => increment(quantity + 1)}
                    >
                        +
                    </Button>
                </Grid>
        </div>
    )
}



export default function ProductComp() {
    const [product, setProduct] = useState<Product | null>(null)
    const [selected, setSelected] = useState<string>('')
    const [quantity, increment] = useState<number>(1)

    useEffect(() => {
        const prod = generateProductData(1)[0]
        setProduct(prod)
    }, [])

    if (!product) return <p>loading</p>
    return (
        <section className={styles.product_page_wrapper}>
            <div>
                <div>
                    <h1>{product.name}</h1>
                    <p>DETAILS</p>
                    <p>{product.description}</p>
                    <p>{getPriceString(product.price)}</p>
                </div>
            </div>
            <div>Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia, dignissimos?</div>
            <div>
                <div>
                    <SizesComp 
                        selected={selected} 
                        setSelected={setSelected} 
                    />
                    <br />
                    <LineDivider />
                    <br />
                    <Quantity
                        quantity={quantity}
                        increment={increment}
                    />
                    <br />
                    <Button style={{ width: '100%' }} variant='contained'>
                        Add To Bag
                    </Button>
                </div>
            </div>
        </section>
    )
}