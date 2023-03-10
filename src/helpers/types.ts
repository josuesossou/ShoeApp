import { MouseEventHandler, ReactNode } from "react"

// ==========================HELPER INTERFACES=======================
export interface Image {
    url: string,
    altText: null | string
}
// =========================FRONTEND UI INTERFACES=======================
export interface AuthCredentials {
    email: string,
    password: string,
    firstName?: string,
    lastName?: string
}

export interface NavLink {
    auth?: boolean, // whether user authenticated or not
    name: string,
    icon: any,
    link: string,
    action?:  MouseEventHandler<HTMLAnchorElement>
}

export interface StateAction {
    type: string,
    value: any
}

export interface Action {
    label: string,
    action: string,
    searchable?: boolean
}
// admin data for the admin page
export interface AdminData {
    sidebarLinks: Action[],
    showcase: Action[],
    users: Action[],
    reviews: Action[]
}
export interface FormValue<T> {
    value: T,
    error: boolean,
    errorMessage?: string
}

// for passing data between pages. find in template
export interface PageData {
    user?: {jwt: string, user: any} | null
    flashMessage?: {
        severity: 'success' | 'error' | 'warning',
        message: string,
        show: boolean
    } | null,
    bag?: BagItem[] | null
}
// sidebarLinks,
// orders,
// productReviews,
// products,
// purchases,
// users



// =========================DATABASE DATA INTERFACES======================
// Interface for Variant
export interface Variant {
    id: string,
    title: string,
    availableForSale: boolean,
    image: Image,
    price: string,
    selectedOptions: {
        name: string,
        value: string
    }[],
    sku: string
}

export interface BagItem {
    username: string,
    productHandle: string,
    productSKU: string,
    productPrice: string,
    productImageUrl: string,
    productTitle: string,
    productVariantTitle: string,
    variantID: string,
    quantity: number
}

// for shopify product data type
export interface Products {
    handle: string,
    id: string,
    image: Image,
    price: string,
    tags: string[],
    title: string
}
// for shopify product data type
export interface Product {
    id: string,
    title:string,
    description: string,
    handle: string,
    images: Image[],
    options: { id:string, name:string, values: any[] }[],
    variants: Variant[],
    tags: string[]
}

export interface Showcase {
    imageURL: string,
    sku: string,
    handle: string,
    description: string,
    title: string,
    enabled: boolean
}

// for admin users from strapi
export interface User {
    id: string,
    first: string,
    last: string,
    fullName: string, // searchable, since it's only lowercased
    email: string,
    accountinterface: string,
    profileImage: string,
}
// for admin from strapi
export interface Review {
    id: string,
    userId: string,
    userFullName: string,
    productId: string,
    productTag: string,
    reviewText: string,
    productRating: number,
    createdAt: string,
    dateTime: number,
    timezome: string,
}


//*******Product2, Issue, Order data types are not being used ****/
// can be updated

export interface Price {
    whole: number, // example $99.75 becomes whole: 99 decimal 75
    decimal: number
}

export interface Product2 {
    id?: string,
    tag: string,
    name: string,
    isSolid: boolean,
    solidImageUrl: string,
    fgImageUrl: string,
    bgImageUrl?: string,
    sideImages: string[],
    price: Price,
    isFeatured: boolean,
    parallax?: 'zoomIn' | 'zoomOut' | 'normal' | 'none', // values can only be 'zoomIn', 'zoomOut', 'normal'
    featuredOrder?: number | string, // order to be shown on the page
    showcase: boolean,
    type: 'comingSoon' | 'orderNow' | 'linked' | 'unPublished', // values cna only be 'commmingSoon' | 'orderNOw' | 'linked'
    link?: string,
    description: string,
    createdAt?: any, // actual date time in string
    dateTime: string, // date time in mili second
    timeZone: string,
    rating: number,
    // productKind: 'shoes' | 'clothes' //for size chart and filtering
}
export interface Issue {
    id: string,
    userId: string,
    orderId: string, // links to order
    need: 'refund' | 'not received' | 'problem',
    reason: string,
    resolved: boolean
}
// can be updated. order is created after a purchase was made
export interface Order {
    id: string,
    userId: string,
    productId: string,
    purchaseId: string,
    interface: 'new' | 'fulfilled' | 'issue' | 'refunded',
    sendTo: string, // address to send the package to
    createdAt: string,
    dateTime: number,
    timezome: string,
    location?: string,
    detail: string, // extra detail from the customer
    pricePaid: Price,
    discount: boolean | number
}
// can't be modified, only Read and Write once. Verifies that the user paid for the product
export interface Purchase {
    id: string,
    tag: string,
    userId: string,
    productId: string,
    orderId: string,
    productTag: string
    userName: string // both first and last
    dateTime: number,
    location?: string,
}

interface SideImage {
    solid: true,
    solidImage: string,
    fgImage: string,
    bgImage: string
}
interface Featured {
    isFeatured: boolean,
    parallax: 'zoomIn' | 'zoomOut' | 'normal', // values can only be 'zoomIn', 'zoomOut', 'normal'
    pageOrder: number // order to be shown on the page
}
