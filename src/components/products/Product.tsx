import styles from './Products.module.scss'
import Grid from '@mui/material/Unstable_Grid2'
import Image from 'next/image'
import useSWR from 'swr'

import { useContext, useEffect, useState } from 'react'
import { PagesContext } from '../../contexts/pagesDataContext'
import { getPriceString, lenghtToArray, shopifyDataToProduct, shopifyDataToProducts } from '../../helpers/helpers'
import { Product, Products, Variant } from '../../helpers/types'
import { LineDivider } from '../common/Common'
import { Button, Card, Rating, Stack, TextField } from '@mui/material'
import { generateProductData } from '../../helpers/testDataGenerator'
import { shoeSizes } from '../../data/productSizes'
import { useRouter } from 'next/router'
import { addProductToBag } from '../../helpers/api/bags'
import { getProduct } from '../../helpers/api/shopify'
import { nanoid } from 'nanoid'

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

const VariantsComp = ({ variants, setCurrentVariant, currentSKU }: 
                    { 
                        setCurrentVariant: any, 
                        variants: Variant[],
                        currentSKU: string
                    }
    ) => {
    return (
        <section className={styles.variants}>
            <p>VARIANTS</p>
            <br />
            <Grid container position='relative'>
                {variants.map(variant => (
                    <Grid xs={3} className={styles.variant_card} key={nanoid(4)}>
                        <Button onClick={() => setCurrentVariant(variant)}>
                            <Card 
                                sx={{ 
                                    outline: currentSKU === variant.sku ? 
                                            '3px solid  #1976d2' : ''                      
                                }} 
                                className={styles.img_wrapper}
                            >
                                <Image
                                    alt=""
                                    src={variant.image.url}
                                    fill
                                />
                            </Card>
                        </Button>
                    </Grid>
                ))}
            </Grid>
        </section>
    )
}

const VariantComp = ({ variant }:{ variant:Variant }) => {
    return (
        <section>
            
            {variant.sku && variant.selectedOptions.map(option => (
                <div key={nanoid(4)}>
                    <small>{option.name}: </small>
                    <small>{option.value}</small>
                    <br/>
                </div>
            ))}
            <br />
            <p className='large-p-text'>${variant.price}</p>
            {variant.availableForSale? (<></>): (
                <>
                    <br />
                    <p>Not Available</p>
                </>
            )}
        </section>
    )
}

export default function ProductComp() {
    const [product, setProduct] = useState<Product | null>(null)
    const [additionalProduts, setAdditionalProducts] = useState<Products[]>()
    const [variant, setCurrentVariant] = useState<Variant>()
    const [selected, setSelected] = useState<string>('')
    const [quantity, increment] = useState<number>(1)
    const [rating, setRating] = useState<number | null>(null)
    const [comment, setComment] = useState<string>('')
    const [pageData, passData] = useContext(PagesContext)

    const router = useRouter()
    const { productHandle } = router.query

    const shopifyData = useSWR(productHandle, getProduct)

    useEffect(() => {
        if (!shopifyData.data) return 

        const prod:Product = shopifyDataToProduct(shopifyData.data)
        let additionalProds = shopifyData.data['collections']['edges'][0]['node']['products']['edges']

        additionalProds = additionalProds.map((addProd:any) => shopifyDataToProducts(addProd))
        
        console.log(prod)
        console.log('additionalProds', additionalProds)

        setProduct(prod)
        setAdditionalProducts(additionalProds)
        setCurrentVariant(prod.variants[0])
        
    }, [shopifyData.isLoading])

    const addToBag = () => {
        if (!pageData.user) {
            router.push('/auth')
            return
        }
        if (!product) return

        if (pageData.bag?.find(item => item.productTag === product.handle)) return

        addProductToBag(
            {
                username: pageData.user.user.username,
                productTag: product.handle,
            }, 
            pageData.user.jwt
        )

        location.reload()
    }

    if (!product) return <p>loading</p>
    return (
        <>
        <section className={styles.product_wrapper}>
            <section>
                <div>
                    <h2>{product.title}</h2>
                    <br />
                    <p>DETAILS</p>
                    <p className={styles.text}>{product.description}</p>
                </div>
            </section>
            <section>
                {product.images.map(image => (
                    <div key={image.url}>
                        <Image
                            // loader={}
                            alt='img'
                            src={image.url}
                            fill
                            sizes='1x'
                        />
                    </div>
                ))}
            </section>
            <section>
                <div>
                    <VariantsComp
                        variants={product.variants} 
                        currentSKU={variant?.sku || ''}
                        setCurrentVariant={
                            (variant: Variant) => 
                            setCurrentVariant(variant)
                        }
                    />
                    <br />
                    {variant && <VariantComp variant={variant} />}
                    {/* <p>{product.}</p> */}
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
            </section>
        </section>
        <br />
        <section className={styles.additional_products_wrapper}>
            <h1>RECOMMENDED PRODUCTS</h1>
            <br />
            <br />
            <Grid container gap={2} alignSelf='center'>
                {additionalProduts && additionalProduts.map(prod => (
                    <Grid xs={4} key={nanoid(4)}>
                        <Card elevation={0} className={styles.img_wrapper}>
                            <Image 
                                alt=''
                                src={prod.image.url}
                                fill
                            />
                        </Card>
                    </Grid>
                ))}
            </Grid>

        </section>
        </>
    )
}
