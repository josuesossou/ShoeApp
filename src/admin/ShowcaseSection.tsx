import { Button, CircularProgress, Grid, Input, Paper } from "@mui/material"
import { GridColDef, GridEventListener, GridValueGetterParams } from "@mui/x-data-grid"
import { useContext, useEffect, useState } from "react"
import { AdminContext } from "../contexts/adminPageContext"
import { generateProductData } from "../helpers/testDataGenerator"
import { Action, Product, Product2, Products, Showcase } from "../helpers/types"
import { fetcher } from "../helpers/api/shared"
import { getProductsInCollection } from "../helpers/api/shopify"
import { shopifyDataToProducts } from "../helpers/helpers"
import styles from './AdminComponents.module.scss'
import DynamicDataTable from "./DynamicDataTable"
import DynamicTab from "../components/common/DynamicTab"
import DynamicTextField from "./DynamicTextField"
import useSWR, { SWRResponse } from 'swr'
import Image from "next/image"


type ShowcasePropsType = {
    showcase: Showcase
}
type ProductPropsType = {
    product: Products
}
type AllShowcasePropsType = {
    showcaseData: any
}
//** Cards */
const ShowcaseCard = ({ showcase }: ShowcasePropsType) => {
    return (
        <Paper>
            <h2>{showcase.title}</h2>
            <p>{showcase.handle}</p>
            <p>{showcase.description}</p>
            {showcase.toString()}
            <Button variant="outlined">
                Edit
            </Button>
            <Button variant="contained" color="error">
                Delete
            </Button>
        </Paper>
    )
}

const ProductCard = ({ product }: ProductPropsType) => {
    return (
        <Paper>
            <Grid 
                container 
                my={1} p={2} 
                justifyContent='space-between'
                className={styles.products_card}
            >
                <div style={{ display: 'flex'}}>
                    <Image
                        alt=''
                        src={product.image.url}
                        width={100}
                        height={110}
                    />
                    <div style={{  marginLeft: '1em'}}>
                        <h2>{product.title}</h2>
                        <small>{product.handle}</small>
                    </div>
                    
                </div>
                
                {/* <p>{product.description}</p> */}
                {false? (
                <p style={{ alignSelf: 'center'}}>
                    Added
                </p>
                ) : (
                    <Button variant="outlined">
                        Add
                    </Button>
                )}

            </Grid>
        </Paper>
    )
}

//** Tabs Components */
const AllShowcase = ({ showcaseData }: AllShowcasePropsType) => {
    // const fetchShowcase = useSWR(
    //     {
    //         url: 'http://localhost:1337/api/showcase',
    //     },
    //     fetcher
    // )

    // if (fetchShowcase.isLoading) return (
    //     <CircularProgress />
    // )

    // if (!fetchShowcase.data) return (
    //     <p>
    //         No Poduct was added to showcase
    //     </p>
    // )

    return (
        <Grid container>
            {/* {} */}
            {showcaseData.map((data: any) => (
                <ShowcaseCard showcase={data} />
            ))}
        </Grid>
    )
}

const AddNewShowcase = ({ handles }: any) => {
    const [products, setProducts] = useState<Products[]>([])
    
    useEffect(() => {
        getProductsInCollection()
        .then(res => {
            console.log('Shopify Products', res)
            const prods:Products[] = res.map((node:any): Products => shopifyDataToProducts(node))
            setProducts(prods)
        })
    }, [])

    // if (fetchShowcase.isLoading) return (
    //     <CircularProgress />
    // )
    // console.log(fetchShowcase)

    // if (!fetchShowcase.data) return (
    //     <p>
    //         No Data
    //     </p>
    // )

    return (
        <Grid container>
            {/* {} */}
            {products.map((prod: Products) => (
                <Grid key={prod.handle} item xs={12}>
                    <ProductCard product={prod} />
                </Grid>
            ))}
        </Grid>
    )
}

export default function ShowcaseSection() {
    const tabs = useContext(AdminContext)?.showcase || []
    const [tabValue, setTabValue] = useState<Action>(tabs[0])
    const [handles, setHandles] = useState<any[]>([]) //all showcase handles added in strapi

    const fetchShowcase = useSWR(
        {
            url: 'http://localhost:1337/api/showcase',
        },
        fetcher
    )

    useEffect(() => {
        if (fetchShowcase.data) {
            setHandles(fetchShowcase.data)
        }
    }, [fetchShowcase.isLoading])

    return (
        <Grid container >
            <Grid item xs={12} mb={4}>
                <DynamicTab 
                    orientation="horizontal" 
                    setValue={setTabValue}
                    tabs={tabs} 
                    value={tabValue}
                    hideIndicator
                />
            </Grid>

            <Grid item xs={12} pr={2}>
                {tabValue.action === 'allShowcase' && (
                    fetchShowcase.isLoading?
                        <CircularProgress />
                    :
                    !fetchShowcase.data? (
                        <p>
                            No Poduct was added to showcase
                        </p>
                    )
                    :
                    <AllShowcase showcaseData={fetchShowcase.data}/>
                )}
                {tabValue.action === 'addNew' &&
                    <AddNewShowcase handles={handles} />}
            </Grid>
        </Grid>
    )
}
