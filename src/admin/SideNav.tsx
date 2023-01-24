import { useContext, useState } from "react";
import { AdminContext, SideBarNavContext } from "../contexts/adminPageContext";
import { Action, AdminData } from "../helpers/types";
import DynamicTab from "./DynamicTab";
import styles from '../assets/styles/AdminComponents.module.scss'
import { Divider } from "@mui/material";


type PropsType = {
    setSidebarLinkValue: Function
}

export default function SideNav({ setSidebarLinkValue }: PropsType) {
    let sideNavLinks:Action[] = useContext(AdminContext)?.sidebarLinks || []
    const value = useContext(SideBarNavContext) || sideNavLinks[0]

    return (
        <section className={styles.sideNav}>
            <DynamicTab 
                tabs={sideNavLinks} 
                orientation="vertical"
                value={value}
                setValue={setSidebarLinkValue}
                hideIndicator
            />
        </section>
    )
}