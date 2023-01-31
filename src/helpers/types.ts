import { ReactNode } from "react"

// ==========================HELPER INTERFACES=======================
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

interface Price {
    whole: number, // example $99.75 becomes whole: 99 decimal 75
    decimal: number
}


// interface interfaceofProduct {
//     value: 'commingSoon' | 'orderNow' | 'linked' | 'unPublished', // values cna only be 'commmingSoon' | 'orderNOw' | 'linked'
//     price: Price,
//     link: string
// }

// =========================FRONTEND UI INTERFACES=======================
export interface NavLink {
    name: string,
    icon: any,
    link: string
}

export interface Action {
    label: string,
    action: string,
    searchable?: boolean
}

export interface AdminData {
    sidebarLinks: Action[],
    orders: Action[],
    products: Action[],
    purchases: Action[],
    users: Action[],
    productReviews: Action[]
}

// sidebarLinks,
// orders,
// productReviews,
// products,
// purchases,
// users


// =========================DATABASE DATA INTERFACES======================
/// issues for orders
export interface Issue {
    id: string,
    userId: string,
    orderId: string,
    need: 'refund' | 'not received' | 'problem',
    reason: string,
    resolved: boolean
}

// can be updated
export interface Product {
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
    rating: number
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

export interface User {
    id: string,
    first: string,
    last: string,
    fullName: string, // searchable, since it's only lowercased
    email: string,
    accountinterface: string,
    profileImage: string,
}

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