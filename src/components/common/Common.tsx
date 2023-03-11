import { Button, Card, CardContent, Divider, Grid } from "@mui/material"
import { ReactNode } from "react"
import { BagItem } from '../../helpers/types';
import { Close } from "@mui/icons-material";
import Image from 'next/image'
import styles from './Common.module.scss'
// import Grid from "@mui/material/Unstable_Grid2/Grid2";

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

export const BagItemCard = ({ 
    bagItem, 
    noCloseBtn,
    small
}: { 
    bagItem: BagItem,
    noCloseBtn?: boolean
    small?: boolean
}) => {

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
                <Grid container justifyContent='space-between'>
                    <p className={styles.p}>SKU: {bagItem.productSKU}</p>
                    <p className={styles.p}>Quantity: {bagItem.quantity}</p>
                </Grid>

            </CardContent>

            {bagItem && !noCloseBtn &&
            <Button variant='contained'>
                <Close />
            </Button>}
        </Card>
    )
}