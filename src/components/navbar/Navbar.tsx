import Image from 'next/image'
import styles from './Navbar.module.scss'
import NameLogo from '../../assets/images/logo/Name-logo.png'
import Link from 'next/link';
import ListNavItem from './ListNavItem';
import Grid from '@mui/material/Unstable_Grid2';
import LocalMallIcon from '@mui/icons-material/LocalMall';
import Logo from '../logo/Logo';
import { Badge, Button, List } from '@mui/material';
import { navLinks } from '../../data/navLinks';
import { useContext, useEffect, useState } from 'react';
import { PagesContext } from '../../contexts/pagesDataContext';
import { Shop } from '@mui/icons-material';

export default function Navbar() {
    const [isOpen, toggleIsOpen] = useState<boolean>(false)
    const [pageData, _] = useContext(PagesContext)

    const openNav = () => {
        const navEle = document.querySelector(`.${styles.list}`)
    
        navEle?.classList.toggle(styles.navActive)
        toggleIsOpen(!isOpen)
    }
    
    // useEffect(() => {
    //     console.log('PAGE DATA', pageData)
    //     // getProductsInBag(pageData.user.user.username)
    // }, [pageData.user])

    return (
        <nav className={styles.nav}>
            <Grid container alignItems='center' justifyContent='space-around'>
      
                <Link href='/'>
                    <Image alt="Autrion" src={NameLogo} width={110} />
                </Link>

                <Logo />

                <Badge badgeContent={pageData.bag?.length || 0} color="primary">
                    <Button 
                        onClick={openNav} 
                        sx={{ 
                            width: '5em',
                            
                        }}
                        style={{
                            color: pageData.user? '#1976d2' : '',
                        }}
                    >
                        {isOpen? 'Close' : 'Menu'}
                    </Button>
                </Badge>

            </Grid>
            
            {/* <Link href='/products' className={styles.shop_all}>
                <Button variant='outlined'>
                    Shop All
                </Button>
            </Link> */}

            <List className={styles.list}>
                <ListNavItem
                    name={'Shop All'}
                    icon={Shop}
                    link={'/products'}
                />
                <ListNavItem
                    name={'Bag'}
                    icon={LocalMallIcon}
                    link={'/bag'}
                />
                {navLinks.map(navItem => {
                    if (pageData.user && !navItem.auth) return
                    if (!pageData.user && navItem.auth) return
                    if (navItem.name === 'Account') return (
                        <ListNavItem
                            key={navItem.name}
                            name={`${navItem.name} for ${pageData.user?.user.username}`}
                            icon={navItem.icon}
                            link={navItem.link}
                            action={navItem.action}
                        />
                    )
                    
                    return (
                        <ListNavItem
                            key={navItem.name}
                            name={navItem.name}
                            icon={navItem.icon}
                            link={navItem.link}
                            action={navItem.action}
                        />
                )})}
            </List>
        </nav>
    )
}