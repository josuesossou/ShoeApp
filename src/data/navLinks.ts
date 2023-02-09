import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SettingsIcon from '@mui/icons-material/Settings';
import { Action, NavLink } from '../helpers/types';

export const navLinks: NavLink[] = [
    {
        auth: false,
        name: 'Login | Register',
        icon: '',
        link: '/auth'
    },
    {
        auth: true,
        name: 'Account',
        icon: AccountCircleIcon,
        link: ''
    },
    {
        auth: true,
        name: 'Logout',
        icon: '',
        link: '',
        action: () => {
            fetch('/api/logout').then(() => {
                location.reload()
            })
        }
    },
]

export const productsFilterNavLinks:Action[] = [
    {
        label: 'Shoes',
        action: 'shoes',
    }
]