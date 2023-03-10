

import { Product, Product2 } from "./types"


const getRandomFromList = (list:any[]) => {
    const randi = Math.floor(Math.random() * list.length)

    return list[randi]
}

const getRandomPrice = () => {
    const randWhole = Math.floor(Math.random()*1000)
    const randDecimal = Math.floor(Math.random()*100)

    return {
        whole: randWhole,
        decimal: randDecimal
    }
}

const getRandomName = () => {
    const length =  Math.ceil(Math.random()*10) + 3
    let name = ''
    let consonant:string[] = [ "b", "c", "d",  "f", "g", "h", 
                     "j", "k", "l", "m", "n",  "p", 
                    "q", "r", "s", "t",  "v", "w", "x", 
                    "y", "z"] 
    let vowels:string[] = ["a","e","i","o","u"]

    for (let i = 0; i<length; i++) {
        let char:string

        if (i%2 === 0) char = getRandomFromList(consonant)
        else char = getRandomFromList(vowels)

        if (i===0) char = char.toLocaleUpperCase()

        name += char
    }

    return name
}


export const generateProductData = (amount:number) => {
    let products: Product2[] = []

    for (let i=0; i < amount; i++) {
        const bools = [false, true]
        let solid = getRandomFromList(bools)
        let featured = getRandomFromList(bools)
        let showcase = getRandomFromList(bools)
        let type: 'comingSoon' | 'orderNow' | 'linked' | 'unPublished' = getRandomFromList(['comingSoon', 'orderNow', 'linked'])
        let parallax: 'zoomIn' | 'zoomOut' | 'normal' | 'none' = getRandomFromList(['zoomIn', 'zoomOut', 'normal', 'none'])
        let date = new Date()
        const product:Product2 = {
            // id: i.toString(),
            tag: i.toString(),
            isSolid: solid,
            solidImageUrl: solid? '':'',
            bgImageUrl: !solid? '':'',
            fgImageUrl: !solid? '':'',
            sideImages: [],
            isFeatured: featured,
            featuredOrder: 2,
            parallax,
            showcase, 
            type,
            price: getRandomPrice(),
            description: `Lorem ipsum dolor sit, 
                amet consectetur adipisicing elit. 
                Tenetur at voluptas nulla ea error 
                aspernatur cum quis incidunt in! 
                Corporis id quaerat blanditiis debitis illo.
            `,
            dateTime: date.toLocaleTimeString() + ' ' + date.toLocaleDateString(),
            name: getRandomName(),
            rating: getRandomFromList([1,2,3,4,5]),
            timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone
        }
        products.push(product)
    }

    return products
}