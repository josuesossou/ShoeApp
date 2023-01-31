import { useContext, useState } from "react";
import { AdminContext, SideBarNavContext } from "../contexts/adminPageContext";
import { Action } from "../helpers/types";
import DynamicTab from "../components/common/DynamicTab";
import styles from './AdminComponents.module.scss'


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