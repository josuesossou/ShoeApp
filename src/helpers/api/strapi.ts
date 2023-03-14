import { rawToShowcase } from "../helpers"
import { BagItem, Showcase } from "../types"

// add products to bag
export const addProductToBag = (bagItem: BagItem, token: string) => { 
    fetch('http://localhost:1337/api/bags', {
        headers: { 
            'Content-Type': 'application/json',
            Authorization: 'Bearer '+token,
        },
        method: 'post',
        body: JSON.stringify({
            "data": bagItem
        })
    })
    .catch(e => console.log(e))
}

// add showcase data
export const saveShowcase = async (showcase: Showcase, token: string) => { 

    try {
        await (await fetch('http://localhost:1337/api/showcases', {
            headers: { 
                'Content-Type': 'application/json',
                Authorization: 'Bearer '+token,
            },
            method: 'post',
            body: JSON.stringify({
                "data": showcase
            })
        })).json()

        return { success: true }
    } catch (err) {
        return { success: false }
    }
}

export const getShowcase = async (token?:string) => {
    try {
        const res = await (await fetch(
            'http://localhost:1337/api/showcases', {
                headers: { 
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer '+token,
                },
                method: 'get'
            }
        )).json()

        console.log(res)

        return rawToShowcase(res['data']) 
    } catch (error) {
        return null
    }
}

// export const getProductsInBag = (username: string) => { 
//     return fetch(`http://localhost:1337/api/bags?[username][eq]=${username}`)
//     .then(res => res.json())
//     // .then(items => {
//     //     console.log(items)
//     //     return items
//     // })
// }