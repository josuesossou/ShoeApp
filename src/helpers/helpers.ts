import { BagItem, Price, Product, Products, Showcase } from "./types"

export const lenghtToArray = (length: number) => {
    let arr = []
    for (let i = 0; i < length; i++) {
        arr.push(i)
    }
    return arr
}

export const getPriceString = (price: Price) => {
    return '$' + (price.whole + (price.decimal * 0.01)).toFixed(2)
}

export const shopifyDataToProduct = (res:any):Product => ({
    description: res['description'],
    id: res['id'],
    title: res['title'],
    handle: res['handle'],
    tags: res['tags'],
    options: res['options'],
    images: res['images']['edges'].map(({node}: any) => ({
        url: node['url'],
        altText: node['altText']
    })),
    variants: res['variants']['edges'].map(({node}: any) => ({
        id: node['id'],
        title: node['title'],
        availableForSale: node['availableForSale'],
        image: {
            url: node['image']['url'],
            altText: node['image']['altText']
        },
        price: node['priceV2']['amount'],
        selectedOptions: node['selectedOptions'].map((opt:any) => ({
            name: opt['name'],
            value: opt['value']
        })),
        sku: node['sku']
    })),

})

export const shopifyDataToProducts = ({ node }:any):Products => ({
    title: node['title'],
    handle: node['handle'],
    id: node['id'],
    tags: node['tags'],
    price: node['priceRange']['minVariantPrice']['amount'],
    image: node['images']['edges'][0]['node']
})

/**  for shopify checkout, takes in bagItems and joined the variant and quantity 
 to form a string in this format [{ variantId: shopify variant id, quantity: 1}] */
export const getListItems = (bagItems: BagItem[]) : string => {
    let lineItems = '['

    for (const item of bagItems) {
        lineItems += `{variantId: "${item.variantID}", quantity: ${item.quantity}}`
    }

    lineItems += ']'
    return lineItems
}
/* takes a list of Products, showcase, or Product types and returns a list of handles */
export const getHandles = (list: Products[] | Showcase[] | Product[]):string[] => {
    return list.map(l => l.handle)
}
// takes raw showcase data from strapi and 
// returns a Showcase list

// attributes
// : 
// createdAt
// : 
// "2023-03-14T00:54:21.570Z"
// description
// : 
// ""
// enabled
// : 
// false
// handle
// : 
// "infinity"
// imageURL
// : 
// "https://cdn.shopify.com/s/files/1/0722/7260/9584/products/Image.jpg?v=1676159748"
// publishedAt
// : 
// "2023-03-14T00:54:21.565Z"
// sku
// : 
// ""
// title
// : 
// "Infinity"
// updatedAt
// : 
// "2023-03-14T00:54:21.570Z"
// [[Prototype]]
// : 
// Object
// id
// : 
// 1
export const rawToShowcase = (nodes: any[]):Showcase[] => {
    const newnodes = nodes.map(node => ({
        description: node['attributes']['description'],
        enabled: node['attributes']['enabled'],
        handle: node['attributes']['handle'],
        imageURL: node['attributes']['imageURL'],
        sku: node['attributes']['sku'],
        title: node['attributes']['title']
    }))

    console.log('NewNOdes', newnodes)
    return newnodes
}
export const emailPattern =/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
export const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/
export const namePattern = /^[\w'\-,.][^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{2,}$/