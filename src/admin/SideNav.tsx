import { useContext, useState } from "react";
import { AdminContext, SideBarNavContext } from "../contexts/adminPageContext";
import { Action, AdminData } from "../helpers/types";
import DynamicTab from "./DynamicTab";

type PropsType = {
    setSidebarLinkValue: Function
}

export default function SideNav({ setSidebarLinkValue }: PropsType) {
    let sideNavLinks:Action[] = useContext(AdminContext)?.sidebarLinks || []
    const value = useContext(SideBarNavContext) || sideNavLinks[0]

    return (
        <>
            <DynamicTab 
                tabs={sideNavLinks} 
                orientation="vertical"
                value={value}
                setValue={setSidebarLinkValue}
                hideIndicator
            />
        </>
    )
}