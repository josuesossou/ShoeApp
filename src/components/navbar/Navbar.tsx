import Image from 'next/image'
import MenuIcon from '@mui/icons-material/Menu';
import styles from '../../assets/styles/Components.module.scss'
import Logo from '../../assets/images/logo/Logo.png'
import NameLogo from '../../assets/images/logo/Name-logo.png'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Button, Grid } from '@mui/material';

export default function Navbar() {
    return (
        <nav className={styles.nav}>
            <Grid container alignItems='center' justifyContent='space-around'>
                <Image alt="Autrion" src={NameLogo} width={110} />
                <Image alt='' src={Logo} width={50} height={50}  />

                <Button>
                    Menu
                </Button>
            </Grid>
        </nav>
    )
}