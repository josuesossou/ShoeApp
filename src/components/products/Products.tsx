import styles from './Products.module.scss'
import Image from 'next/image';
import { Card, CardContent, CardMedia, Typography } from "@mui/material";
import { lenghtToArray } from "../../helpers/helpers";
import shoe9 from '../../assets/images/shoe9.png'

export default function ProductsComp() {
    return (
        <section className={styles.products_section}>
            {lenghtToArray(9).map(i => (
                <Card elevation={0}>
                    <div>
                        <Image
                            alt='img'
                            src={shoe9}
                        />
                    </div>

                    <CardContent>
                        <small>Infinity</small>
                        <p>$160</p>
                    </CardContent>
                </Card>
            ))}
        </section>
    )
}