import { Tabs, Tab } from "@mui/material";
import { useState } from "react";
import { Action } from "../helpers/types";
import styles from '../assets/styles/TabIndicator.module.css'

type PropsType = {
    tabs: Action[],
    orientation: 'horizontal' | 'vertical',
    setValue: Function,
    value: Action,
    hideIndicator?: boolean
}

export default function DynamicTab({ tabs, orientation, setValue, value, hideIndicator }: PropsType) {
    // const [value, tabValue] = useState(tabs[0].label)
    const onTabChange = (event:any, value:Action) => {
        console.log(event, value)
        setValue(value)
    }

    return (
        <>
            <Tabs value={value} onChange={onTabChange} orientation={orientation} className={hideIndicator? styles.hidden : ''} >
                {tabs.map(tab => (
                    <Tab key={tab.action} label={tab.label} value={tab}  style={{ alignItems: 'flex-start'}} />
                ))}
            </Tabs>
        </>
    )
}