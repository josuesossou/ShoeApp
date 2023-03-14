import { Button, CircularProgress, Grid, Input, Paper } from "@mui/material"
import { GridColDef, GridEventListener, GridValueGetterParams } from "@mui/x-data-grid"
import { useContext, useEffect, useState } from "react"
import { AdminContext, ShowcaseContext } from "../contexts/adminPageContext"
import { generateProductData } from "../helpers/testDataGenerator"
import { Action, Products, Showcase } from "../helpers/types"
import { fetcher } from "../helpers/api/shared"
import { getProductsInCollection } from "../helpers/api/shopify"
import { getHandles, shopifyDataToProducts } from "../helpers/helpers"
import styles from './AdminComponents.module.scss'
import DynamicDataTable from "./DynamicDataTable"
import DynamicTab from "../components/common/DynamicTab"
import DynamicTextField from "./DynamicTextField"
import useSWR, { SWRResponse } from 'swr'
import Image from "next/image"
import { saveShowcase } from "../helpers/api/strapi"
import { PagesContext } from "../contexts/pagesDataContext"


type ShowcasePropsType = {
    showcase: Showcase
}
type ProductPropsType = {
    product: Products,
    token: string,
    status: boolean
}
type AllShowcasePropsType = {
    showcaseData: Showcase[]
}

/** API interaction Functions */
const addShowcase = (product: Products, token: string) => {
    const showcase: Showcase = {
        description: '',
        enabled: false,
        handle: product.handle,
        imageURL: product.image.url,
        sku: '',
        title: product.title
    }

    return saveShowcase(showcase, token)
}

//** Cards */
const ShowcaseCard = ({ showcase }: ShowcasePropsType) => {
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
                        src={showcase.imageURL}
                        width={100}
                        height={110}
                    />
                    <div style={{  marginLeft: '1em'}}>
                        <h2>{showcase.title}</h2>
                        <small>{showcase.handle}</small>
                    </div>
                    
                </div>
                <div>
                    <Button 
                        variant="outlined"
                        // onClick={}
                    >
                        Enable
                    </Button>
                    <br /><br />
                    <Button 
                        variant="contained"
                        color="error"
                        // onClick={}
                    >
                        Remove
                    </Button>
                </div>
            </Grid>
        </Paper>
    )
}

const ProductCard = ({ product, token, status }: ProductPropsType) => {
    const [isAdded, isAddedHandler] = useState(status)

    const addNew = () => {
        addShowcase(product, token).then(res => {
            isAddedHandler(res.success)
        })
    }

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
                
                {isAdded? (
                    <p style={{ alignSelf: 'center'}}>
                        Added
                    </p>
                ) : (
                    <Button 
                        variant="outlined"
                        onClick={addNew}
                    >
                        Add
                    </Button>
                )}

            </Grid>
        </Paper>
    )
}

//** Tabs Components */
const AllShowcase = ({ showcaseData }: AllShowcasePropsType) => {
    return (
        <Grid container>
            {showcaseData.map((showcase) => (
                <Grid key={showcase.handle} item xs={12}>
                    <ShowcaseCard showcase={showcase} />
                </Grid>
            ))}
        </Grid>
    )
}

const AddNewShowcase = ({ handles, token }: 
        { handles: string[], token: string}) => {
    const [products, setProducts] = useState<Products[]>([])
    
    useEffect(() => {
        getProductsInCollection()
        .then(res => {
            console.log('Shopify Products', res)
            const prods:Products[] = res.map((node:any): Products => shopifyDataToProducts(node))
            setProducts(prods)
        })
    }, [])

    return (
        <Grid container>
            {products.map((prod: Products) => (
                <Grid key={prod.handle} item xs={12}>
                    <ProductCard 
                        product={prod} 
                        token={token} 
                        status={handles.includes(prod.handle)} 
                    />
                </Grid>
            ))}
        </Grid>
    )
}

export default function ShowcaseSection() {
    const tabs = useContext(AdminContext)?.showcase || []
    const [tabValue, setTabValue] = useState<Action>(tabs[0])
    const [handles, setHandles] = useState<any[]>([]) //all showcase handles added in strapi
    const [pageData, _] = useContext(PagesContext)
    const showcaseData = useContext(ShowcaseContext)

    useEffect(() => {
        console.log(handles, 'Handles')
        console.log(showcaseData, 'ShowcaseData')
        setHandles(getHandles(showcaseData))
    }, [showcaseData])

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
                    showcaseData.length === 0? (
                        <p>
                            No Poduct was added to showcase
                        </p>
                    )
                    :
                    <AllShowcase showcaseData={showcaseData}/>
                )}
                {tabValue.action === 'addNew' &&
                    <AddNewShowcase 
                        handles={handles} 
                        token={pageData.user?.jwt || ''}
                    />
                }
            </Grid>
        </Grid>
    )
}
