import { Button, Grid, Input, Paper } from "@mui/material"
import { GridColDef, GridEventListener, GridValueGetterParams } from "@mui/x-data-grid"
import { useContext, useState } from "react"
import { AdminContext } from "../contexts/adminPageContext"
import { generateProductData } from "../helpers/testDataGenerator"
import { Action, Product } from "../helpers/types"
import DynamicDataTable from "./DynamicDataTable"
import DynamicTab from "./DynamicTab"
import DynamicTextField from "./DynamicTextField"

type ProductDetailsPropsType = {
    product: Product
}

const columns: GridColDef[] = [
    { 
        field: 'id', 
        headerName: 'Tag',
        width:150
    },
    {
        field: 'name',
        headerName: 'Name',
        width: 150
    },
    {
        field: 'type',
        headerName: 'Type of Product',
        width:150
    },
    {
        field: 'price',
        headerName: 'Price',
        width:150
    },
    {
        field: 'rating',
        headerName: 'Rating',
        width:150
    },
    {
        field: 'createdAt',
        headerName: 'Time and Date Created',
        width:200
    },
    {
        field: 'solid',
        headerName: 'Solid Image',
        width:150
    },
    {
        field: 'featured',
        headerName: 'Featured',
        width:150
    },
    {
        field: 'showcase',
        headerName: 'Showcased',
        width:150
    },
    // {
    //   field: 'fullName',
    //   headerName: 'Full name',
    //   description: 'This column has a value getter and is not sortable.',
    //   valueGetter: (params: GridValueGetterParams) =>
    //     `${params.row.firstName || ''} ${params.row.lastName || ''}`,
    // },
];

const filterData = (filterQuery:string, data:Product[]) => {

}

const ProductDetails = ({ product }: ProductDetailsPropsType) => {

    return (
        <Paper>
            <h2>{product.name}</h2>
            <p>{product.dateTime}</p>
            <p>{product.type}</p>
            <Button variant="outlined">
                Edit
            </Button>
            <Button variant="contained" color="error">
                Delete
            </Button>
        </Paper>
    )
}

export default function ProductSection() {
    const products = useContext(AdminContext)?.products || []
    const productsData: Product[] = generateProductData(100) // this will be changed based on the tab that's clicked. this mocks api calls
    const rows = productsData.map(product => ({
        id: product.tag,
        name: product.name,
        solid: product.isSolid? 'yes' : 'no',
        featured: product.isFeatured? 'yes' : 'no',
        showcase: product.showcase? 'yes' : 'no',
        type: product.type,
        price: '$' + (product.price.whole + (product.price.decimal*0.01)),
        rating: product.rating,
        createdAt: product.createdAt
    }))

    const [productValue, setProductValue] = useState<Action>(products[0])
    const [productTag, showProduct] = useState<string | null>(null)

    const queryHandler = (e:any) => {
        console.log(e.target.value)
    }
    const findProduct = (tag:string):Product|null => {
        return productsData.find(product => product.tag === tag) || null
    }
    const cellHandler:GridEventListener<"cellClick"> = (value) => {
        showProduct(value.row.id)
    }


    if (productTag) {
        const getProduct = findProduct(productTag)
        if (getProduct) return (
            <ProductDetails product={getProduct} />
        )
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
                <DynamicDataTable
                    columns={columns}
                    rows={rows}
                    cellHandler={cellHandler}
                />
            </Grid>
        </Grid>
    )
}