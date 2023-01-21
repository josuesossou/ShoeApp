import { Grid, Input } from "@mui/material"
import { useContext, useState } from "react"
import { AdminContext } from "../contexts/adminPageContext"
import { Action } from "../helpers/types"
import DynamicTab from "./DynamicTab"

type PropsType = {
    // tabs: Action[],
    // orientation: 'horizontal' | 'vertical'
}


export default function PurchaseSection() {
    const purchases = useContext(AdminContext)?.purchases || []
    const [purchaseValue, setpurchaseValue] = useState<Action>(purchases[0])

    return (
        <Grid container >
            <Grid item xs={10}>
                <DynamicTab 
                    orientation="horizontal" 
                    setValue={setpurchaseValue}
                    tabs={purchases} 
                    value={purchaseValue}
                />
            </Grid>
            <Grid item xs={2}>
                <Input aria-label="search" fullWidth />
            </Grid>      
            <Grid item xs={12} py={4}>
                {purchaseValue.label}
            </Grid>
        </Grid>
    )
}