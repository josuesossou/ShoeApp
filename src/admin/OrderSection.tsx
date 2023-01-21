import { Grid, Input, TextField } from "@mui/material"
import { useContext, useState } from "react"
import { AdminContext } from "../contexts/adminPageContext"
import { Action } from "../helpers/types"
import DynamicTab from "./DynamicTab"
import DynamicTextField from "./DynamicTextField"


export default function OrderSection() {
    const orders = useContext(AdminContext)?.orders || []
    const [orderValue, setorderValue] = useState<Action>(orders[0])
    const queryHandler = (e:any) => {
        console.log(e.target.value)
    }

    return (
        <Grid container alignItems='center' justifyContent='space-between'>
            <Grid item xs={9}>
                <DynamicTab 
                    orientation="horizontal" 
                    setValue={setorderValue}
                    tabs={orders} 
                    value={orderValue}
                />
            </Grid>
            <Grid item xs={3}>
                <DynamicTextField setQuery={queryHandler} />
            </Grid>      
            <Grid item xs={12} py={4}>
                {orderValue.label}
            </Grid>
        </Grid>
    )
}