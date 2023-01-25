// const fetcher = (...args) => fetch(...args).then(res => res.json())

export const uploadImages = (file: FormData) => { 
    fetch('http://localhost:1337/api/upload', {
        method: 'post',
        body: file
    })
}

// new FormData().a