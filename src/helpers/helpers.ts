import { Price, Product, Products } from "./types"

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

export const emailPattern =/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
export const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/
export const namePattern = /^[\w'\-,.][^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{2,}$/