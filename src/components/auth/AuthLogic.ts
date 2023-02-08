import { NextRouter, useRouter } from "next/router"
import { Dispatch, FormEvent, useContext } from "react"
import { PagesContext } from "../../contexts/pagesDataContext"
import { loginUserLocal, registerUserLocal } from "../../helpers/api/auth"
import { emailPattern, namePattern, passwordPattern } from "../../helpers/helpers"
import { PageData } from "../../helpers/types"

export const UPDATE_EMAIL = 'email'
export const UPDATE_PASSWORD = 'password'
export const UPDATE_CHECK_PASSWORD = 'check password'
export const UPDATE_FIRST_NAME = 'first name'
export const UPDATE_LAST_NAME = 'last name'
export const UPDATE_SHOW_PASSWORD = 'show password'

export default function formHandler(
    e: FormEvent<HTMLFormElement>, 
    state: any, dispatch: any, 
    isLogin: boolean,
    router: NextRouter,
    pageData: PageData,
    passData: Dispatch<PageData>
) {
    e.preventDefault()

    const {email, password, checkPassword, firstName, lastName} = state

    let error: boolean = false

    if (!email.value || email.value === '' || !email.value.match(emailPattern)) {
        dispatch({ 
            type: UPDATE_EMAIL, 
            value: { 
                value: email.value, 
                error: true, 
                errorMessage: 'Email Field required and must be formated properly' 
            } 
        })

        error = true
    }

    if (!password.value || password.value === '' || !password.value.match(passwordPattern)) {
        dispatch({
            type: UPDATE_PASSWORD,
            value: {
                value: password.value,
                error: true,
                errorMessage: `Password field required and must be minimum eight characters, 
                at least one letter, one number and one special character`
            }
        })
        error = true
    }

    if (!isLogin) {
        if (checkPassword.value !== password.value) {
            dispatch({
                type: UPDATE_CHECK_PASSWORD,
                value: {
                    value: checkPassword.value,
                    error: true,
                    errorMessage: `Password does not match`
                }
            })
            error = true
        }

        if (!firstName.value || firstName.value === '' || !firstName.value.match(namePattern)) {
            dispatch({
                type: UPDATE_FIRST_NAME,
                value: {
                    value: firstName.value,
                    error: true,
                    errorMessage: `First name required`
                }
            })
            error = true
        }

        if (!lastName.value || lastName.value === '' || !lastName.value.match(namePattern)) {
            dispatch({
                type: UPDATE_LAST_NAME,
                value: {
                    value: lastName.value,
                    error: true,
                    errorMessage: `last name required`
                }
            })
            error = true
        }
    }

    if (error) return

    if (!isLogin) {
        registerUserLocal({
            email: email.value,
            password: password.value,
            firstName: firstName.value,
            lastName: lastName.value
        }).then(auth => {

            if (auth.success) {
                passData({ ...pageData, flashMessage: {
                    severity: 'success',
                    show: true,
                    message: 'Account Successfully Registered'
                } })
                return router.back()
            }

            passData({ ...pageData, flashMessage: {
                severity: 'error',
                show: true,
                message: auth.message
            } })
        })
    } else {
        loginUserLocal({
            email: email.value, 
            password: password.value
        }).then(auth => {
            if (auth.success) {
                passData({ ...pageData, flashMessage: {
                    severity: 'success',
                    show: true,
                    message: 'Login Successfull'
                } })
                return router.back()
            }

            passData({ ...pageData, flashMessage: {
                severity: 'error',
                show: true,
                message: auth.message
            } })
        })
    }
}
