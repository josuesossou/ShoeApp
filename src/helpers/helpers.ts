import { Price } from "./types"

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