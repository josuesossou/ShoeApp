import { BagItem } from "../types"

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

// export const getProductsInBag = (username: string) => { 
//     return fetch(`http://localhost:1337/api/bags?[username][eq]=${username}`)
//     .then(res => res.json())
//     // .then(items => {
//     //     console.log(items)
//     //     return items
//     // })
// }