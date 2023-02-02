import { Badge, Icon, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import Link from 'next/link';
import { ReactNode } from 'react';
import { NavLink } from '../../helpers/types';

export default function ListNavItem({ name, icon, link }: NavLink) {
    return (
        <Link href={link}>
            <ListItemButton>
                {name.toLowerCase() === 'bag'? (
                    
                        <ListItemIcon>
                            <Badge badgeContent={4} color="primary">
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