// ==========================HELPER TYPES=======================
type SideImage = {
    solid: true,
    solidImage: string,
    fgImage: string,
    bgImage: string
}
type Featured = {
    isFeatured: boolean,
    parallax: 'zoomIn' | 'zoomOut' | 'normal', // values can only be 'zoomIn', 'zoomOut', 'normal'
    pageOrder: number // order to be shown on the page
}

type Price = {
    whole: number, // example $99.75 becomes whole: 99 decimal 75
    decimal: number
}

type TypeofProduct = {
    value: 'commingSoon' | 'orderNow' | 'linked', // values cna only be 'commmingSoon' | 'orderNOw' | 'linked'
    price: Price,
    link: string
}

// =========================FRONTEND UI TYPES=======================
export type Action = {
    label: string,
    action: string,
    searchable?: boolean
}

export type AdminData = {
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


// =========================DATABASE DATA TYPES======================
/// issues for orders
export type Issue = {
    id: string,
    userId: string,
    orderId: string,
    need: 'refund' | 'not received' | 'problem',
    reason: string,
    resolved: boolean
}

// can be updated
export type Product = {
    id: string,
    tag: string,
    name: string,
    solid: boolean,
    solidImage: string,
    fgImageUrl: string,
    bgImageUrl: string,
    sideImages: SideImage[],
    featured: Featured,
    showcase: boolean,
    type: TypeofProduct, // shows the price
    description: string,
    createdAt: string, // actual date time in string
    dateTime: number, // date time in mili second
    timezome: string,
    rating: number
}

// can be updated. order is created after a purchase was made
export type Order = {
    id: string,
    userId: string,
    productId: string,
    purchaseId: string,
    type: 'new' | 'fulfilled' | 'issue' | 'refunded',
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
export type Purchase = {
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

export type User = {
    id: string,
    first: string,
    last: string,
    fullName: string, // searchable, since it's only lowercased
    email: string,
    accountType: string,
    profileImage: string,
}

export type Review = {
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