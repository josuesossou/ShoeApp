import styles from './Products.module.scss'
import Image from 'next/image';
import { Card, CardContent, CardMedia, Typography } from "@mui/material";
import { lenghtToArray } from "../../helpers/helpers";
import shoe9 from '../../assets/images/shoe9.png'
import DynamicTab from '../common/DynamicTab';
import { productsFilterNavLinks } from '../../data/navLinks';
import { useState } from 'react';
import { Action } from '../../helpers/types';

export default function ProductSidenav() {
    const [value, setValue] = useState<Action>(productsFilterNavLinks[0])

    return (
        <section className={styles.sidenav}>
            <DynamicTab
                orientation='vertical'
                setValue={setValue}
                tabs={productsFilterNavLinks}
                value={value}
            />
        </section>
    )
}