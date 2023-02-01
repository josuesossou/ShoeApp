import styles from './Products.module.scss'
import Image from 'next/image';
import { Card, CardContent, CardMedia, Typography } from "@mui/material";
import { lenghtToArray } from "../../helpers/helpers";
import shoe9 from '../../assets/images/shoe9.png'
import DynamicTab from '../common/DynamicTab';
import { productsFilterNavLinks } from '../../data/navLinks';

export default function ProductSidenav() {
    return (
        <section className={styles.sidenav}>
            <DynamicTab
                orientation='vertical'
                setValue={() => console.log()}
                tabs={productsFilterNavLinks}
                value={{label: '1', action: '1'}}
            />
        </section>
    )
}