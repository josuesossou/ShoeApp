import Link from 'next/link';
import { Badge, Icon, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { NavLink } from '../../helpers/types';
import { useContext, useEffect } from 'react';
import { PagesContext } from '../../contexts/pagesDataContext';

export default function ListNavItem({ name, icon, link, action }: NavLink) {
    const [pageData, _] = useContext(PagesContext)
    const voidAction = () => {}

    return (
        <Link href={link} onClick={action || voidAction}>
            <ListItemButton>
                {name.toLowerCase() === 'bag'? (
                    <ListItemIcon>
                        <Badge badgeContent={pageData.bag?.length || 0} color="primary">
                        <Icon component={icon}/>
                        </Badge>
                    </ListItemIcon>
                ) : (
                    <ListItemIcon>
                        <Icon component={icon}/>
                    </ListItemIcon>
                )}
                <ListItemText primary={name} />
            </ListItemButton>
        </Link>
    )
}