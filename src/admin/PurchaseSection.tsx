import { Grid, Input } from "@mui/material"
import { useContext, useState } from "react"
import { AdminContext } from "../contexts/adminPageContext"
import { Action } from "../helpers/types"
import DynamicTab from "../components/common/DynamicTab"
import DynamicTextField from "./DynamicTextField"

type PropsType = {
    // tabs: Action[],
    // orientation: 'horizontal' | 'vertical'
}


export default function PurchaseSection() {
    const purchases = useContext(AdminContext)?.purchases || []
    const [purchaseValue, setpurchaseValue] = useState<Action>(purchases[0])
    const queryHandler = (e:any) => {
        console.log(e.target.value)
    }
    return (
        <Grid container >
            <Grid item xs={9}>
                <DynamicTab 
                    orientation="horizontal" 
                    setValue={setpurchaseValue}
                    tabs={purchases} 
                    value={purchaseValue}
                />
            </Grid>
            <Grid item xs={3}>
                <DynamicTextField setQuery={queryHandler} />
            </Grid>      
            <Grid item xs={12} py={4}>
                {purchaseValue.label}
            </Grid>
        </Grid>
    )
}