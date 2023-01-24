import Image from 'next/image'
import MenuIcon from '@mui/icons-material/Menu';
import styles from '../../assets/styles/Components.module.scss'
import Logo from '../../assets/images/logo/Logo.png'
import NameLogo from '../../assets/images/logo/Name-logo.png'

export default function Navbar() {
    return (
        <nav className={styles.nav}>
            <div>
                <Image alt="" src={NameLogo} width={150} />
            </div>
            <div>
                <Image alt='' src={Logo}  width={70} />
            </div>
            <div><MenuIcon /></div>
        </nav>
    )
}