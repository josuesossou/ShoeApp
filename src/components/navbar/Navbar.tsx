import Image from 'next/image'
import styles from './Navbar.module.scss'
import Logo from '../../assets/images/logo/Logo.png'
import NameLogo from '../../assets/images/logo/Name-logo.png'
import Link from 'next/link';
import { Badge, Button, List } from '@mui/material';
import { navLinks } from '../../data/navLinks';
import ListNavItem from './ListNavItem';
import { useState } from 'react';
import Grid from '@mui/material/Unstable_Grid2';



export default function Navbar() {
    const [isOpen, toggleIsOpen] = useState(false)

    const openNav = () => {
        const navEle = document.querySelector(`.${styles.list}`)
    
        navEle?.classList.toggle(styles.navActive)
        toggleIsOpen(!isOpen)
    }

    return (
        <nav className={styles.nav}>
            <Grid container alignItems='center' justifyContent='space-around'>
      
                <Link href='/'>
                    <Image alt="Autrion" src={NameLogo} width={110} />
                </Link>
                <Link href='/'>
                    <Image alt='' src={Logo} width={50} height={50}  />
                </Link>

                <Badge badgeContent={4} color="primary">
                    <Button onClick={openNav} sx={{ width: '5em' }}>
                        {isOpen? 'Close' : 'Menu'}
                    </Button>
                </Badge>

            </Grid>
            
            <Link href='/products' className={styles.shop_all}>
                <Button variant='outlined'>
                    Shop All
                </Button>
            </Link>

            <List className={styles.list}>
                {navLinks.map(navItem => (
                    <ListNavItem
                        key={navItem.name}
                        name={navItem.name}
                        icon={navItem.icon}
                        link={navItem.link}
                    />
                ))}
            </List>
        </nav>
    )
}