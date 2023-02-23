import { Button, Card, CardContent, Divider } from "@mui/material"
import { ReactNode } from "react"
import { BagItem } from '../../helpers/types';
import Image from 'next/image'
import styles from './Common.module.scss'
import { Close } from "@mui/icons-material";

interface DividerProps {
    thickness?: number,
    orientation?: 'vertical' | 'horizontal',
    children?: ReactNode

}

export const LineDivider = ({ thickness=1, orientation, children }: DividerProps) => {
    return (
        <Divider sx={{ my: 2, borderWidth: thickness+'px', borderColor:'black' }} orientation={orientation}>
            {children}
        </Divider>
    )
}

export const ItemCard = ({ 
    bagItem, 
    noCloseBtn,
    small
}: { 
    bagItem: BagItem,
    noCloseBtn?: boolean
    small?: boolean
}) => {
    // const swrFetchProduct = useSWR({
    //     url: `/api/product:${bagItem.productHandle}`, 
    // }, fetcher)

    // if (!swrFetchProduct.data) return <Skeleton variant="rectangular" className={styles.skeleton} />
    console.log('bagItem', bagItem)
    return (
        <Card className={styles.bagCard} elevation={small? 0:1}>
            {bagItem && 
            <div style={{ width: small? '6em' : '10em'}}>
                <Image 
                    // loader={}
                    alt='img' 
                    src={bagItem.productImageUrl} 
                    fill 
                />
            </div>}
            
            <CardContent sx={{ 
                flex: 1, 
                flexDirection: small ? 'row':'column', 
                display: 'flex',
                justifyContent: 'space-between'
            }} >
                <div>
                    <h2>{bagItem.productTitle}</h2>
                    {!small && <br />}
                    <p>${bagItem.productPrice}</p>
                </div>
                <p style={{ color: 'grey', marginTop: '.5em' }}>SKU:{bagItem.productSKU}</p>
            </CardContent>

            {bagItem && !noCloseBtn &&
            <Button variant='contained'>
                <Close />
            </Button>}
        </Card>
    )
}