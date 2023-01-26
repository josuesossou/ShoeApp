// const fetcher = (...args) => fetch(...args).then(res => res.json())

import { lenghtToArray } from "./helpers"
import { Product } from "./types"

export const uploadImage = (file: FileList, name:string) => { 
    const form = new FormData()
    form.append('files', file[0], name)

    fetch('http://localhost:1337/api/upload', {
        // headers: { 'Content-Type': 'multipart/form-data' },
        method: 'post',
        body: form
    })
}
export const uploadImages = (files: FileList, name:string) => { 
    const form = new FormData()
    // form.append('files', file[0], file[0].name)
    lenghtToArray(files.length).forEach(i => {
        form.append('files', files[i], `${name}-${i}`)
    })

    fetch('http://localhost:1337/api/upload', {
        // headers: { 'Content-Type': 'multipart/form-data' },
        method: 'post',
        body: form
    })
}

export const addProduct = (product: Product) => { 
    fetch('http://localhost:1337/api/products', {
        headers: { 'Content-Type': 'application/json' },
        method: 'post',
        body: JSON.stringify({
            "data": product
        })
    })
    .catch(e => console.log(e))
}
