
import styles from './AdminComponents.module.scss'
import CloudUploadOutlinedIcon from '@mui/icons-material/CloudUploadOutlined';
import Image from "next/image";
import { Box, Button, Checkbox, Divider, FormControl, FormLabel, Grid, MenuItem, Paper, TextField } from "@mui/material";
import { FormEvent, useReducer } from "react";
import { lenghtToArray } from "../helpers/helpers";
import { Product } from "../helpers/types";
import { addProduct, uploadImage, uploadImages } from "../helpers/api";
import { nanoid } from 'nanoid';
import { LineDivider } from '../components/common/Common';

const UPDATE_NAME = 'update name'
const UPDATE_IS_FEATURED = 'update isfeatured'
const UPDATE_PARALLAX = 'update parallax'
const UPDATE_ORDER = 'update order'
const UPDATE_SHOWCASE = 'update showcase'
const UPDATE_IS_SOLID_IMAGE = 'update is solid image'
const UPDATE_TYPE = 'update type'
const UPDATE_LINK = 'update link'
const UPDATE_PRICE = 'update price'
const UPDATE_PRODUCT_IMAGE = 'update product image'
const UPDATE_BACKGROUND_IMAGE = 'update background image'
const UPDATE_SOLID_IMAGE = 'update solid image'
const UPDATE_SIDE_IMAGES = 'update side images'
const UPDATE_HIDE_PRICE = 'update hide price'
const UPDATE_DESCRIPTION = 'update description'

// name: string,
// isFeatured: boolean,
// parallax?: 'zoomIn' | 'zoomOut' | 'normal' | 'none',
// featuredOrder?: string,
// showcase: boolean,
// isSeparate: boolean, // for isSolid Image 
// type: 'comingSoon' | 'orderNow' | 'linked' | 'unPublished',
// link?: string,
// fgImage: string,
// bgImage: string,
// solidImage: string,
// price: number
// Interfaces
interface FormValue<T> {
    value: T,
    error: boolean,
    errorMessage?: string
}
// interface FormValueString<T> extends FormValue {
//     value: T,
// }
// interface FormValueBool extends FormValue {
//     value: boolean,
// }
// interface FormValueNumber extends FormValue {
//     value: number,
// }

interface State {
    name: FormValue<string>,
    description: FormValue<string>,
    isFeatured: boolean,
    parallax?: FormValue<'zoomIn' | 'zoomOut' | 'normal' | 'none'>,
    featuredOrder?: FormValue<string>,
    showcase: boolean,
    isSeparate: boolean, // for isSolid Image 
    type: FormValue<'comingSoon' | 'orderNow' | 'linked' | 'unPublished'>,
    link?: FormValue<string>,
    fgImage: FormValue<FileList | null>,
    bgImage: FormValue<FileList | null>,
    solidImage: FormValue<FileList | null>,
    sideImages: FormValue<FileList | null>,
    price: FormValue<number>,
    hidePrice?: boolean
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
        case UPDATE_DESCRIPTION:
            return { ...state, description: action.value };
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
        case UPDATE_SOLID_IMAGE:
            return { ...state, solidImage: action.value };
        case UPDATE_BACKGROUND_IMAGE:
            return { ...state, bgImage: action.value };
        case UPDATE_PRODUCT_IMAGE:
            return { ...state, fgImage: action.value };
        case UPDATE_TYPE:
            return { ...state, type: action.value };
        case UPDATE_LINK:
            return { ...state, link: action.value };
        case UPDATE_PRICE:
            return { ...state, price: action.value };
        case UPDATE_SIDE_IMAGES:
            return { ...state, sideImages: action.value };
        case UPDATE_HIDE_PRICE:
            return { ...state, hidePrice: action.value };
        default:
            return state;
    }
}
const defaultValueString: FormValue<string> = {
    value: '',
    error: false
}
const defaultValueNull: FormValue<null> = {
    value: null,
    error: false
}
const defaultValueNumber: FormValue<number> = {
    value: 0,
    error: false
}

const initialState: State = {
    name: defaultValueString,
    description:defaultValueString,
    isFeatured: false,
    showcase: false,
    isSeparate: false,
    type: {
        value: 'orderNow',
        error: false
    },
    price: defaultValueNumber,
    fgImage: defaultValueNull,
    bgImage: defaultValueNull,
    solidImage: defaultValueNull,
    sideImages: defaultValueNull
}

// Handlers
const getFileURL = (file: File | null): string => {
    if (file) return URL.createObjectURL(file)
    return ''
}

// Reusable Components

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
            <input 
                type="file" 
                id="solidImage" 
                style={{ width: 0 }} 
                onChange={onChange}
                multiple={multiple} 
                accept='image/*'
            />
            <CloudUploadOutlinedIcon sx={{ fontSize: '3em', margin: 'auto', color: 'grey' }} />
        </FormLabel> 
    )
}


export default function AddProductForm() {
    const [state, dispatch] = useReducer(reducer, initialState)
    const {
        name,
        description,
        isFeatured,
        parallax,
        featuredOrder,
        showcase,
        isSeparate,
        type,
        link,
        fgImage,
        bgImage,
        solidImage,
        sideImages,
        price,
        hidePrice
    } = state

    const formSubmitHandler = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        let error:boolean = false

        // error handlers
        if (!name.value) {
            dispatch({ 
                type: UPDATE_NAME, 
                value: { 
                    value: name.value, 
                    error: true, 
                    errorMessage: 'Name of Product is required' 
                } 
                
            })
            error = true
        }

        if (isFeatured && (!parallax?.value || !featuredOrder?.value)) {
            dispatch({ 
                type: UPDATE_PARALLAX, 
                value: { 
                    value: parallax?.value, 
                    error: true, 
                    errorMessage: 'Parallax value is required when the product is featured' 
                } 
            })
            dispatch({ 
                type: UPDATE_ORDER, 
                value: { 
                    value: featuredOrder?.value, 
                    error: true, 
                    errorMessage: `Order at which product to be show is required 
                                    when the product is featured` 
                } 
            })
            error = true
        }

        if (type.value ==='linked' && !link?.value) {
            dispatch({ 
                type: UPDATE_LINK, 
                value: { 
                    value: link?.value, 
                    error: true, 
                    errorMessage: 'The other site link is required' 
                } 
            })
            error = true
        }

        if (isSeparate && !fgImage.value) {
            dispatch({ 
                type: UPDATE_PRODUCT_IMAGE, 
                value: { 
                    value: fgImage.value, 
                    error: true, 
                    errorMessage: `Product image is required when uploading the
                                    product and background separately` 
                } 
            })
            dispatch({ 
                type: UPDATE_BACKGROUND_IMAGE, 
                value: { 
                    value: bgImage.value, 
                    error: true, 
                    errorMessage: `Background image is required when uploading the
                                    product and background separately` 
                } 
            })
            error = true
        }

        if (!isSeparate && !solidImage.value) {
            dispatch({ 
                type: UPDATE_SOLID_IMAGE, 
                value: { 
                    value: solidImage.value, 
                    error: true, 
                    errorMessage: `A product image is required` 
                } 
            })
            error = true
        }

        if (price.value < 0) {
            dispatch({ 
                type: UPDATE_PRICE, 
                value: { 
                    value: price.value, 
                    error: true, 
                    errorMessage: `A product image is required` 
                } 
            })
            error = true
        }

        if (error) return

        const solidImageName = `${name.value}-main-solid`
        const fgImageName = `${name.value}-main-fg`
        const bgImageName = `${name.value}-main-bg`
        const sideImagesName = `${name.value}-side`
        const priceVal = price.value.toString().split(/\D/)
        const date = new Date()

        // Uploading images first
        if (isSeparate) {
            uploadImage(fgImage.value!, fgImageName)
            bgImage.value? uploadImage(bgImage.value, bgImageName) : null
        } else {
            uploadImage(solidImage.value!, solidImageName)
        }
        
        if (sideImages.value) uploadImages(sideImages.value, sideImagesName)

        // constructing product data
        const product: Product = {
            tag: nanoid(8),
            name: name.value,
            description: description.value,
            isSolid: !isSeparate,
            solidImageUrl: solidImageName,
            fgImageUrl: fgImageName,
            bgImageUrl: bgImageName,
            price: {
                whole: parseInt(priceVal[0]),
                decimal: parseInt(priceVal[1]) || 0
            },
            type: type.value,
            sideImages: lenghtToArray(sideImages.value?.length || 0).map(i => `${sideImagesName}-${i}`),
            parallax: parallax?.value,
            featuredOrder: featuredOrder?.value!,
            isFeatured,
            showcase,
            timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
            rating: 5,
            dateTime: date.toLocaleTimeString() + ' ' + date.toLocaleDateString(),
        }

        addProduct(product)
    }

    const onChangeHandler = (
        event:any, 
        type:string, inputType: string = 'text'
    ) => {
        if (inputType === 'checkbox')
            return dispatch({ type, value: event.target.checked })
        console.log(event.target.files)
        if (inputType === 'file')
            return dispatch({ type, value: { value: event.target.files, error: false } })
        
        return dispatch({ type, value: { value: event.target.value, error: false } })
    }

    return (
        <Paper
            elevation={0}
            className={styles.addProductForm}
        >
            <FormControl component='form' fullWidth onSubmit={formSubmitHandler}>
                <section>
                    <h2>Name</h2>
                    <LineDivider />

                    <TextField 
                        id='name'
                        label='Name'
                        fullWidth
                        size="small"
                        value={name.value}
                        error={name.error}
                        aria-errormessage={name.errorMessage}
                        helperText={name.errorMessage}
                        onChange={(e) => onChangeHandler(e, UPDATE_NAME)}
                    />
                </section>

                <section>
                    <h2>Description</h2>
                    <LineDivider />

                    <TextField 
                        id='desc'
                        label='Description'
                        fullWidth
                        size="small"
                        value={description.value}
                        error={description.error}
                        aria-errormessage={description.errorMessage}
                        helperText={name.errorMessage}
                        onChange={(e) => onChangeHandler(e, UPDATE_DESCRIPTION)}
                        multiline
                        rows={4}
                    />
                </section>

                <section>
                    <h2>Featured</h2>
                    <LineDivider />

                    <section>
                        <span>Feature the product on home page?</span>
                        <Checkbox onChange={(e) => onChangeHandler(e, UPDATE_IS_FEATURED, 'checkbox')} />
                        {isFeatured? 'yes' : 'no'}
                    </section>

                    {isFeatured && (
                        <Grid container gap={2} position='relative' margin={0}>
                            <Grid flex={1} >
                                <h3>Select Parallax Effect</h3>
                                <TextField 
                                    label='Parallax' 
                                    id='parallax'
                                    value={parallax?.value}
                                    size='small'
                                    fullWidth
                                    error={parallax?.error}
                                    aria-errormessage={parallax?.errorMessage}
                                    helperText={parallax?.errorMessage}
                                    onChange={(e) => onChangeHandler(e, UPDATE_PARALLAX)}
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
                                    value={featuredOrder?.value}
                                    error={featuredOrder?.error}
                                    aria-errormessage={featuredOrder?.errorMessage}
                                    helperText={featuredOrder?.errorMessage}
                                    size='small'
                                    fullWidth
                                    onChange={(e) => onChangeHandler(e, UPDATE_ORDER)}
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
                        <Checkbox onChange={(e) => onChangeHandler(e, UPDATE_SHOWCASE, 'checkbox')} />
                        {showcase? 'yes' : 'no'}
                    </section>
                </section>
            
                <section>
                    <h2>Upload Main Image</h2>
                    <LineDivider />

                    <section>
                        <span>Add product image and background separately?</span>
                        <Checkbox onChange={(e) => onChangeHandler(e, UPDATE_IS_SOLID_IMAGE, 'checkbox')} />
                        {isSeparate? 'yes' : 'no'}
                    </section>
                    
                    {isSeparate? (
                        <Grid container gap={2}>
                            <Grid item>
                                <h3>Product Image</h3>
                                <ImageUploader 
                                    onChange={(e:any) => onChangeHandler(e, UPDATE_PRODUCT_IMAGE, 'file')} 
                                    value={fgImage.value} 
                                />
                                <br />
                                {fgImage.value && 
                                    <Box width='10em' 
                                        sx={{ width: '10em', height: '10em', position: 'relative'}}
                                    >
                                        <Image 
                                            src={getFileURL(fgImage.value[0])} 
                                            alt='image' 
                                            fill
                                            style={{ objectFit: 'cover'}}
                                            className={styles.image} 
                                        />
                                    </Box>
                                }
                            </Grid>

                            <Grid item>
                                <h3>Background Image</h3>
                                <ImageUploader 
                                    onChange={(e:any) => onChangeHandler(e, UPDATE_BACKGROUND_IMAGE, 'file')}
                                    value={bgImage.value}
                                />
                                <br />
                                {bgImage.value && 
                                    <Box width='10em' 
                                        sx={{ maxWidth: '10em', flex: 1, height: '10em', position: 'relative'}}
                                    >
                                        <Image 
                                            src={getFileURL(bgImage.value[0])} 
                                            alt='image' 
                                            fill
                                            style={{ objectFit: 'cover'}}
                                            className={styles.image} 
                                        />
                                    </Box>
                                }
                            </Grid>
                        </Grid>
                    ): (
                        <>
                            <h3>Solid Image</h3>
                            <ImageUploader 
                                onChange={(e:any) => onChangeHandler(e, UPDATE_SOLID_IMAGE, 'file')} 
                                value={solidImage.value}  
                            />
                            <br />
                            {solidImage.value && 
                                <Box width='10em' 
                                    sx={{ width: '10em', height: '10em', position: 'relative'}}
                                >
                                    <Image 
                                        src={getFileURL(solidImage.value[0])} 
                                        alt='image' 
                                        fill
                                        style={{ objectFit: 'cover'}}
                                        className={styles.image} 
                                    />
                                </Box>
                            }
                        </>
                    )}
                </section>

                <section>
                    <h2>Upload Side Images</h2>
                    <LineDivider />

                    <Grid container gap={2}>
                        <Grid item>
                            <h3>You can upload multiple images at the same time</h3>
                            <ImageUploader 
                                onChange={(e:any) => onChangeHandler(e, UPDATE_SIDE_IMAGES, 'file')} 
                                value={sideImages.value} 
                                multiple 
                            />
                            <br />
                            <Grid container flexDirection={'row'} gap={2}>
                                {sideImages.value && 
                                    lenghtToArray(sideImages.value.length).map(i => (
                                        <Box width='10em' 
                                            sx={{ maxWidth: '10em', height: '10em', position: 'relative'}}>
                                            <Image 
                                                src={getFileURL(sideImages.value? sideImages.value[i] : null)} 
                                                alt='image'
                                                fill
                                                style={{ objectFit: 'cover'}}
                                                className={styles.image} 
                                            />
                                        </Box>
                                    ))
                                }
                            </Grid>
                        </Grid>
                    </Grid>
                </section>

                <section>
                    <h2>Type of Product</h2>
                    <LineDivider />

                    <h3>Select which category this product belongs to</h3>
                    <TextField 
                        label='Type' 
                        id='type'
                        value={type.value}
                        error={type.error}
                        aria-errormessage={type.errorMessage}
                        helperText={type.errorMessage}
                        size='small'
                        fullWidth
                        onChange={(e) => onChangeHandler(e, UPDATE_TYPE)}
                        select
                    >
                        <MenuItem value={'orderNow'}>Order Now</MenuItem>
                        <MenuItem value={'comingSoon'}>Coming Soon</MenuItem>
                        <MenuItem value={'linked'}>Link To Another Site</MenuItem>
                        <MenuItem value={'unPublished'}>Don't Publish</MenuItem>
                    </TextField>

                    {type.value === 'linked' && (
                        <>
                            <h3>Enter The Site URL</h3>
                            <TextField 
                                label='Site URL' 
                                id='linked'
                                value={link?.value}
                                error={link?.error}
                                aria-errormessage={link?.errorMessage}
                                helperText={link?.errorMessage}
                                size='small'
                                fullWidth
                                onChange={(e) => onChangeHandler(e, UPDATE_LINK)}
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
                        value={price.value}
                        error={price.error}
                        aria-errormessage={price.errorMessage}
                        helperText={price.errorMessage}
                        size='small'
                        type='number'
                        fullWidth
                        onChange={(e) => onChangeHandler(e, UPDATE_PRICE)}
                    />
                    {type.value !== 'orderNow' &&
                        <section>
                            <span>Hide product price?</span>
                            <Checkbox onChange={(e) => onChangeHandler(e, UPDATE_HIDE_PRICE, 'checkbox')} />
                            {hidePrice? 'yes' : 'no'}
                        </section>
                    }
                </section>
                
                <section>
                    <Button variant="contained" type="submit" fullWidth>ADD PRODUCT</Button>
                </section>
            </FormControl>
        </Paper>
    )
}
