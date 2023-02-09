import styles from './Products.module.scss'
import Grid from '@mui/material/Unstable_Grid2'
import Image from 'next/image'
import shoe9 from '../../assets/images/shoe9.png'

import { useContext, useEffect, useState } from 'react'
import { PagesContext } from '../../contexts/pagesDataContext'
import { getPriceString, lenghtToArray } from '../../helpers/helpers'
import { Product } from '../../helpers/types'
import { LineDivider } from '../common/Common'
import { Button, Rating, Stack, TextField } from '@mui/material'
import { generateProductData } from '../../helpers/testDataGenerator'
import { shoeSizes } from '../../data/productSizes'
import { useRouter } from 'next/router'
import { addProductToBag } from '../../helpers/api/bags'

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
                        key={size.toString()}
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
    const [rating, setRating] = useState<number | null>(null)
    const [comment, setComment] = useState<string>('')
    const [pageData, passData] = useContext(PagesContext)

    const router = useRouter()

    useEffect(() => {
        const prod = generateProductData(1)[0]
        setProduct(prod)
    }, [])

    const addToBag = () => {
        if (!pageData.user) {
            router.push('/auth')
            return
        }
        if (!product) return

        if (pageData.bag?.find(item => item.productTag === product.tag)) return

        addProductToBag(
            {
                username: pageData.user.user.username,
                productTag: product.tag,
            }, 
            pageData.user.jwt
        )

        location.reload()
    }

    if (!product) return <p>loading</p>
    return (
        <section className={styles.product_page_wrapper}>
            <div>
                <div>
                    <h2>{product.name}</h2>
                    <br />
                    <p>DETAILS</p>
                    <p className={styles.text}>{product.description}</p>
                    <br />
                    <p>{getPriceString(product.price)}</p>
                </div>
            </div>
            <div>
                {lenghtToArray(9).map(i => (
                    <Image
                        key={i}
                        alt='img'
                        src={shoe9}
                    />
                ))}
            </div>
            <div>
                <div>
                    <SizesComp 
                        selected={selected} 
                        setSelected={setSelected} 
                    />
                    <br />
                    <LineDivider thickness={0.5} />
                    <br />
                    <Quantity
                        quantity={quantity}
                        increment={increment}
                    />
                    <br />
                    <Button 
                        style={{ width: '100%' }} 
                        variant='contained'
                        onClick={addToBag}
                    >
                        Add To Bag
                    </Button>
                    <LineDivider thickness={0} />
                    <div>
                        <Grid container 
                            justifyContent='space-between' 
                            alignItems='center'
                        >
                            <p>ADD A REVIEW</p>
                            <Button style={{ padding: 0 }}>Submit</Button>
                        </Grid>
                        
                        <br />
                        <Rating 
                            name="product-rating" 
                            defaultValue={2.5} 
                            precision={0.5}
                            onChange={(e, newVal) => setRating(newVal)}
                            style={{ marginBottom: '.5em' }}
                        />
                        
                        <TextField 
                            id='desc'
                            label='Comment'
                            fullWidth
                            size="small"
                            value={comment}
                            // error={description.error}
                            // aria-errormessage={description.errorMessage}
                            // helperText={name.errorMessage}
                            onChange={(e) => setComment(e.target.value)}
                            multiline
                            rows={4}
                        />
                    </div>
                    
                </div>
            </div>
        </section>
    )
}