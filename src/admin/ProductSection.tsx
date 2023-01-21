import { Grid, Input } from "@mui/material"
import { useContext, useState } from "react"
import { AdminContext } from "../contexts/adminPageContext"
import { Action } from "../helpers/types"
import DynamicTab from "./DynamicTab"
import DynamicTextField from "./DynamicTextField"

type PropsType = {
    // tabs: Action[],
    // orientation: 'horizontal' | 'vertical'
}


export default function ProductSection() {
    const products = useContext(AdminContext)?.products || []
    const [productValue, setProductValue] = useState<Action>(products[0])
    const queryHandler = (e:any) => {
        console.log(e.target.value)
    }
    return (
        <Grid container >
            <Grid item xs={9}>
                <DynamicTab 
                    orientation="horizontal" 
                    setValue={setProductValue}
                    tabs={products} 
                    value={productValue}
                />
            </Grid>
            <Grid item xs={3}>
                <DynamicTextField setQuery={queryHandler} />
            </Grid>      
            <Grid item xs={12} py={4}>
                {productValue.label}
            </Grid>
        </Grid>
    )
}