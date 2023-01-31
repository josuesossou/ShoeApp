import { Grid, Input } from "@mui/material"
import { GridColDef, GridValueGetterParams } from "@mui/x-data-grid"
import { useContext, useState } from "react"
import { AdminContext } from "../contexts/adminPageContext"
import { Action } from "../helpers/types"
import DynamicDataTable from "./DynamicDataTable"
import DynamicTab from "../components/common/DynamicTab"
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
    const columns: GridColDef[] = [
        { field: 'id', headerName: 'ID' },
        {
          field: 'firstName',
          headerName: 'First name',
          width: 150,
          editable: true,
        },
        {
          field: 'lastName',
          headerName: 'Last name',
          width: 150,
          editable: true,
        },
        {
          field: 'age',
          headerName: 'Age',
        //   type: 'number',
          width: 110,
          editable: true,
          align: 'left'
        },
        {
          field: 'fullName',
          headerName: 'Full name',
          description: 'This column has a value getter and is not sortable.',
          sortable: false,
          width: 160,
          valueGetter: (params: GridValueGetterParams) =>
            `${params.row.firstName || ''} ${params.row.lastName || ''}`,
        },
    ];
    const rows = [
        { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
        { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
        { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
        { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
        { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
        { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
        { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
        { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
        { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
    ];
      
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
                <DynamicDataTable
                    columns={columns}
                    rows={rows}
                    cellHandler={(value: any, event: any, detail: any) => {
                        console.log('VALUE', value)
                        console.log('EVENT', event)
                        console.log('DETAIL', detail)
                    }}
                />
            </Grid>
        </Grid>
    )
}