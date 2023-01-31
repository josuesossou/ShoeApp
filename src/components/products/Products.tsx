import styles from './Products.module.scss'
import { Card, CardContent, CardMedia, Typography } from "@mui/material";
import { lenghtToArray } from "../../helpers/helpers";

export default function ProductsComp() {
    return (
        <section className={styles.products_section}>
            {lenghtToArray(9).map(i => (
                <Card elevation={0}>
                    <CardMedia
                        className={styles.cardMedia}
                        image="http://localhost:1337/uploads/thumbnail_Test_main_solid_648307a9c0.jpeg"
                        title="green iguana"
                        
                    />
                    <CardContent>
                        <small>Infinity</small>
                        <p>$160</p>
                    </CardContent>
                </Card>
            ))}
        </section>
    )
}