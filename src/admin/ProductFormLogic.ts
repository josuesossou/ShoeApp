import { nanoid } from "nanoid"
import { NextRouter, useRouter } from "next/router"
import { Dispatch, FormEvent, useContext } from "react"
import { addProduct, uploadImage, uploadImages } from "../helpers/api/products"
import { lenghtToArray } from "../helpers/helpers"
import { Product2 } from "../helpers/types"

export const UPDATE_NAME = 'update name'
export const UPDATE_IS_FEATURED = 'update isfeatured'
export const UPDATE_PARALLAX = 'update parallax'
export const UPDATE_ORDER = 'update order'
export const UPDATE_SHOWCASE = 'update showcase'
export const UPDATE_IS_SOLID_IMAGE = 'update is solid image'
export const UPDATE_TYPE = 'update type'
export const UPDATE_LINK = 'update link'
export const UPDATE_PRICE = 'update price'
export const UPDATE_PRODUCT_IMAGE = 'update product image'
export const UPDATE_BACKGROUND_IMAGE = 'update background image'
export const UPDATE_SOLID_IMAGE = 'update solid image'
export const UPDATE_SIDE_IMAGES = 'update side images'
export const UPDATE_HIDE_PRICE = 'update hide price'
export const UPDATE_DESCRIPTION = 'update description'

export default function formSubmitHandler (
    e: FormEvent<HTMLFormElement>,
    state: any, 
    dispatch: any,
) {
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
    } = state

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
    const product: Product2 = {
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