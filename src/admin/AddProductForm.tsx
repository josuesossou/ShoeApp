import { Box, Checkbox, Divider, FormControl, FormLabel, Grid, Input, MenuItem, Paper, Select, TextField } from "@mui/material";
import { ChangeEvent, useReducer } from "react";
import styles from '../assets/styles/AdminComponents.module.scss'
import CloudUploadOutlinedIcon from '@mui/icons-material/CloudUploadOutlined';
import AddIcon from "@mui/icons-material/Add";

const UPDATE_NAME = 'update name'
const UPDATE_IS_FEATURED = 'update isfeatured'
const UPDATE_PARALLAX = 'update parallax'
const UPDATE_ORDER = 'update order'
const UPDATE_SHOWCASE = 'update showcase'
const UPDATE_IS_SOLID_IMAGE = 'update is solid image'
const UPDATE_TYPE = 'update type'
const UPDATE_LINK = 'update link'
const UPDATE_PRICE = 'update price'

// Interfaces
interface State {
    name: string,
    isFeatured: boolean,
    parallax?: 'zoomIn' | 'zoomOut' | 'normal' | 'none',
    featuredOrder?: string,
    showcase: boolean,
    isSeparate: boolean,
    type: 'comingSoon' | 'orderNow' | 'linked' | 'unPublished',
    link?: string,
    price: number
}

interface Action {
    type: string,
    value: any
}

// states and reducer
function reducer(state:State, action: Action): State {
    switch (action.type) {
        case UPDATE_NAME:
            return { ...state, name: action.value };
        case UPDATE_IS_FEATURED:
            return { ...state, isFeatured: action.value };
        case UPDATE_PARALLAX:
            return { ...state, parallax: action.value };
        case UPDATE_ORDER:
            return { ...state, featuredOrder: action.value };
        case UPDATE_SHOWCASE:
            return { ...state, showcase: action.value };
        case UPDATE_IS_SOLID_IMAGE:
            return { ...state, isSeparate: action.value };
        case UPDATE_TYPE:
            return { ...state, type: action.value };
        case UPDATE_LINK:
            return { ...state, link: action.value };
        case UPDATE_PRICE:
            return { ...state, price: action.value };
        default:
            return state;
    }
}

const initialState: State = {
    name: '',
    isFeatured: false,
    showcase: false,
    isSeparate: false,
    type: 'orderNow',
    price: 0
}

// Reusable Components
const LineDivider = () => {
    return (
        <Divider sx={{ my: 2, borderWidth: '1px', borderColor:'black' }} />
    )
}
const ImageUploader = ({ onChange, image, multiple }: any) => {
    return (
        <FormLabel
            sx={{
                width: '10em',
                height: '10em',
                backgroundColor: 'white',
                display: 'flex',
                cursor: 'pointer',
                border: '4px solid grey'
            }}
        >
            <input type="file" id="solidImage" style={{ width: 0 }} onChange={onChange} value={image} multiple={multiple} />
            <CloudUploadOutlinedIcon sx={{ fontSize: '3em', margin: 'auto', color: 'grey' }} />
        </FormLabel> 
    )
}

export default function AddProductForm() {
    const [state, dispatch] = useReducer(reducer, initialState)
    // Handlers
    const onChangeHandler = (event:any, type:string, checkBox:boolean) => {
        console.log(event.target.value)
        if (checkBox)
            dispatch({ type, value: event.target.checked })
        else
            dispatch({ type, value: event.target.value })
    }

    return (
        <Paper
            elevation={0}
            className={styles.addProductForm}
        >
            <FormControl component='form' fullWidth>
                <section>
                    <h2>Name</h2>
                    <LineDivider />
                    <TextField 
                        id='name'
                        label='Name'
                        fullWidth
                        size="small"
                        value={state.name}
                        onChange={(e) => onChangeHandler(e, UPDATE_NAME, false)}
                    />
                </section>

                <section>
                    <h2>Featured</h2>
                    <LineDivider />
                    <section>
                        <span>Feature the product on home page?</span>
                        <Checkbox onChange={(e) => onChangeHandler(e, UPDATE_IS_FEATURED, true)} />
                        {state.isFeatured? 'yes' : 'no'}
                    </section>

                    {state.isFeatured && (
                        <Grid container gap={2} position='relative' margin={0}>
                            <Grid flex={1} >
                                <h3>Select Parallax Effect</h3>
                                <TextField 
                                    label='Parallax' 
                                    id='parallax'
                                    value={state.parallax}
                                    size='small'
                                    fullWidth
                                    onChange={(e) => onChangeHandler(e, UPDATE_PARALLAX, false)}
                                    select
                                >
                                    <MenuItem value={'zoomIn'}>Zoom In</MenuItem>
                                    <MenuItem value={'zoomOut'}>Zoom Out</MenuItem>
                                    <MenuItem value={'normal'}>Normal</MenuItem>
                                    <MenuItem value={'none'}>None</MenuItem>
                                </TextField>
                            </Grid>

                            <Grid flex={1}>
                                <h3>Choose Order</h3>
                                <TextField
                                    label='Order' 
                                    id='order'
                                    value={state.featuredOrder}
                                    size='small'
                                    fullWidth
                                    onChange={(e) => onChangeHandler(e, UPDATE_ORDER, false)}
                                    select
                                >
                                    <MenuItem value={'first'}>First</MenuItem>
                                    <MenuItem value={'last'}>Last</MenuItem>
                                </TextField>
                            </Grid>
                        </Grid>
                    )}
                </section>
                <section>
                    <h2>Showcase</h2>
                    <LineDivider />
                    <section>
                        <span>Make this product the first thing a user sees?</span>
                        <Checkbox onChange={(e) => onChangeHandler(e, UPDATE_SHOWCASE, true)} />
                        {state.showcase? 'yes' : 'no'}
                    </section>
                </section>
            
                <section>
                    <h2>Upload Main Image</h2>
                    <LineDivider />
                    <section>
                        <span>Add product image and background separately?</span>
                        <Checkbox onChange={(e) => onChangeHandler(e, UPDATE_IS_SOLID_IMAGE, true)} />
                        {state.isSeparate? 'yes' : 'no'}
                    </section>
                    
                    {state.isSeparate? (
                        <Grid container gap={2}>
                            <Grid item>
                                <h3>Product Image</h3>
                                <ImageUploader onChange={(e:any) => console.log(e)} value={''}  />
                            </Grid>
                            <Grid item>
                                <h3>Background Image</h3>
                                <ImageUploader onChange={(e:any) => console.log(e)} value={''} />
                            </Grid>

                        </Grid>
                    ): (
                        <>
                            <h3>Solid Image</h3>
                            <ImageUploader onChange={(e:any) => console.log(e)} value={''}  />
                        </>
                    )}
                </section>
                <section>
                    <h2>Upload Side Images</h2>
                    <LineDivider />
                    <Grid container gap={2}>
                        <Grid item>
                            <h3>You can upload multiple images at the same time</h3>
                            <ImageUploader onChange={(e:any) => console.log(e)} value={''} multiple />
                        </Grid>
                    </Grid>
                </section>

                <section>
                    <h2>Type of Product</h2>
                    <LineDivider />
                    {/* <section>
                        <span>Feature the product on home page?</span>
                        <Checkbox onChange={(e) => onChangeHandler(e, UPDATE_IS_FEATURED, true)} />
                        {state.isFeatured? 'yes' : 'no'}
                    </section> */}
                    <h3>Select which category this product belongs to</h3>
                    <TextField 
                        label='Type' 
                        id='type'
                        value={state.type}
                        size='small'
                        fullWidth
                        onChange={(e) => onChangeHandler(e, UPDATE_TYPE, false)}
                        select
                    >
                        <MenuItem value={'orderNow'}>Order Now</MenuItem>
                        <MenuItem value={'comingSoon'}>Coming Soon</MenuItem>
                        <MenuItem value={'linked'}>Link To Another Site</MenuItem>
                        <MenuItem value={'unPublished'}>Don't Publish</MenuItem>
                    </TextField>

                    {state.type === 'linked' && (
                        <>
                            <h3>Enter The Site URL</h3>
                            <TextField 
                                label='Site URL' 
                                id='linked'
                                value={state.link}
                                size='small'
                                fullWidth
                                onChange={(e) => onChangeHandler(e, UPDATE_LINK, false)}
                            />
                        </>
                    )}
                </section>
                <section>
                    <h2>Product Price</h2>
                    <LineDivider />
                    <TextField 
                        label='Price' 
                        id='price'
                        value={state.price}
                        size='small'
                        fullWidth
                        onChange={(e) => onChangeHandler(e, UPDATE_PRICE, false)}
                    />
                </section>
                
                <section>
                    <TextField type="submit" fullWidth color="primary" variant="filled" />
                </section>
            </FormControl>
        </Paper>
    )
}

// id: string,
// tag: string,
// name: string,
// solid: boolean,
// solidImage: string,
// fgImageUrl: string,
// bgImageUrl: string,
// sideImages: SideImage[],
// featured: Featured,
// showcase: boolean,
// type: TypeofProduct, // shows the price
// description: string,
// createdAt: string, // actual date time in string
// dateTime: number, // date time in mili second
// timezome: string,
// rating: number