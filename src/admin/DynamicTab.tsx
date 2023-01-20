import { Tabs, Tab } from "@mui/material";
import { useState } from "react";
import { Action } from "../helpers/types";

type PropsType = {
    tabs: Action[],
    orientation: 'horizontal' | 'vertical'
}

export default function DynamicTab({ tabs, orientation }: PropsType) {
    const [value, tabValue] = useState(tabs[0].label)
    const onTabChange = (event:any, value:string) => {
        console.log(event, value)
    }
    return (
        <>
            <Tabs value={value} onChange={onTabChange} orientation={orientation}>
                {tabs.map(tab => (
                    <Tab label={tab.label} value={tab.label} />
                ))}
            </Tabs>

            {/* {tabs.map(tab => (
                <TabPanel  />
            ))} */}
        </>
    )
}