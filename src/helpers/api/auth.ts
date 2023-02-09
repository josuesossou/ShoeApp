import { AuthCredentials } from "../types";

export const registerUserLocal = async ({ 
        email, password, firstName, lastName 
    }: AuthCredentials) => { 
    
    const username = email.split('@')[0]

    try {

        const res = await (await fetch('http://localhost:1337/api/auth/local/register', {
            headers: { 'Content-Type': 'application/json' },
            method: 'post',
            body: JSON.stringify({
                username,
                email,
                password,
                firstName,
                lastName
            })
        })).json()

        if (res.error) {
            return Promise.resolve({
                success: false,
                message: res.error.message === 'Invalid identifier or password' ?
                'Invalid email or password' : 'something went wrong'
            })
        }
    
        // api session , moderates the session
        await fetch('/api/login', {
            method: 'post',
            body: JSON.stringify(res)
        })

        return Promise.resolve({
            success: true,
            message: 'success'
        })

    } catch (error) {
        return Promise.resolve({
            success: false,
            message: 'something went wrong'
        })
    }

}

export const loginUserLocal = async ({ 
    email, password
}: AuthCredentials) : Promise<{success: boolean, message: string}> => { 

    const username = email.split('@')[0]

    try {

        const res = await (await fetch('http://localhost:1337/api/auth/local', {
            headers: { 'Content-Type': 'application/json' },
            method: 'post',
            body: JSON.stringify({
                identifier: username,
                password,
            })
        })).json()


        if (res.error) {
            return Promise.resolve({
                success: false,
                message: res.error.message === 'Invalid identifier or password' ?
                            'Invalid email or password' : 'something went wrong'
            })
        }

        // api session , moderates the session
        await fetch('/api/login', {
            method: 'post',
            body: JSON.stringify(res)
        })

        return Promise.resolve({
            success: true,
            message: 'success'
        })

    } catch (error) {
        return Promise.resolve({
            success: false,
            message: 'something went wrong'
        })
    }

}

// sending request as authenticated user
// const { data } = await axios.get('http://localhost:1337/articles', {
//     headers: {
//       Authorization:
//         'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNTc2OTM4MTUwLCJleHAiOjE1Nzk1MzAxNTB9.UgsjjXkAZ-anD257BF7y1hbjuY3ogNceKfTAQtzDEsU',
//     },
//   });