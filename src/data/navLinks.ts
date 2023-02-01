import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LocalMallIcon from '@mui/icons-material/LocalMall';
import SettingsIcon from '@mui/icons-material/Settings';
import { Action, NavLink } from '../helpers/types';

export const navLinks: NavLink[] = [
    {
        name: 'Login | Register',
        icon: '',
        link: '/auth'
    },
    {
        name: 'Account',
        icon: AccountCircleIcon,
        link: ''
    },
    {
        name: 'Bag',
        icon: LocalMallIcon,
        link: '/bag'
    },

    {
        name: 'Setting',
        icon: SettingsIcon,
        link: ''
    },
]

export const productsFilterNavLinks:Action[] = [
    {
        label: 'Shoes',
        action: 'shoes',
    }
]