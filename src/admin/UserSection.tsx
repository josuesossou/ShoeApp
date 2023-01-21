import { Grid, Input } from "@mui/material"
import { useContext, useState } from "react"
import { AdminContext } from "../contexts/adminPageContext"
import { Action } from "../helpers/types"
import DynamicTab from "./DynamicTab"

type PropsType = {
    // tabs: Action[],
    // orientation: 'horizontal' | 'vertical'
}


export default function UserSection() {
    const users = useContext(AdminContext)?.users || []
    const [userValue, setuserValue] = useState<Action>(users[0])

    return (
        <Grid container >
            <Grid item xs={10}>
                <DynamicTab 
                    orientation="horizontal" 
                    setValue={setuserValue}
                    tabs={users} 
                    value={userValue}
                />
            </Grid>
            <Grid item xs={2}>
                <Input aria-label="search" fullWidth />
            </Grid>      
            <Grid item xs={12} py={4}>
                {userValue.label}
            </Grid>
        </Grid>
    )
}