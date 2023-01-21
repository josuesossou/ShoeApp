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


export default function ProductReviewSection() {
    const productReviews = useContext(AdminContext)?.productReviews || []
    const [productReviewValue, setProductReviewValue] = useState<Action>(productReviews[0])
    const queryHandler = (e:any) => {
        console.log(e.target.value)
    }
    return (
        <Grid container >
            <Grid item xs={9}>
                <DynamicTab 
                    orientation="horizontal" 
                    setValue={setProductReviewValue}
                    tabs={productReviews} 
                    value={productReviewValue}
                />
            </Grid>
            <Grid item xs={3}>
                <DynamicTextField setQuery={queryHandler} />
            </Grid>      
            <Grid item xs={12} py={4}>
                {productReviewValue.label}
            </Grid>
        </Grid>
    )
}