

import { Product } from "./types"


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
    let products: Product[] = []

    for (let i=0; i < amount; i++) {
        let solid = getRandomFromList([false, true])
        let featured = getRandomFromList([false, true])
        let showcase = getRandomFromList([false, true])
        let type: 'commingSoon' | 'orderNow' | 'linked' | 'disabled' = getRandomFromList(['commingSoon', 'orderNow', 'linked', 'disabled'])
        let parallax: 'zoomIn' | 'zoomOut' | 'normal' = getRandomFromList(['zoomIn', 'zoomOut', 'normal'])
        let date = new Date()
        const product:Product = {
            id: i.toString(),
            tag: i.toString(),
            solid,
            solidImage: solid? '':'',
            bgImageUrl: !solid? '':'',
            fgImageUrl: !solid? '':'',
            sideImages: [],
            featured: {
                isFeatured: featured,
                pageOrder: 2,
                parallax 
            },
            showcase, 
            type: {
                value: type,
                link: '',
                price: getRandomPrice()
            },
            description: 'lorem',
            createdAt: date.toLocaleTimeString() + ' ' + date.toLocaleDateString(),
            dateTime: date.getMilliseconds(),
            name: getRandomName(),
            rating: getRandomFromList([1,2,3,4,5]),
            timezome: Intl.DateTimeFormat().resolvedOptions().timeZone
        }
        products.push(product)
    }

    return products
}