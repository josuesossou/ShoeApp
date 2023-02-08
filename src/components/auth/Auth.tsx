import styles from './Auth.module.scss'
import { Button, FormControl, Grid, IconButton, InputAdornment, TextField } from "@mui/material";
import { LineDivider } from "../common/Common";
import { Facebook, Google, Twitter, Visibility, VisibilityOff } from '@mui/icons-material';
import { FormEvent, useContext, useReducer, useState } from 'react';
import { FormValue, StateAction } from '../../helpers/types';
// import { emailPattern, namePattern, passwordPattern } from '../../helpers/helpers';
// import { loginUserLocal, registerUserLocal } from '../../helpers/api/auth';
// import { useRouter } from 'next/router';
// import { PagesContext } from '../../contexts/pagesDataContext';

import formHandler, { 
    UPDATE_EMAIL, 
    UPDATE_PASSWORD,
    UPDATE_CHECK_PASSWORD,
    UPDATE_FIRST_NAME,
    UPDATE_LAST_NAME
} from './AuthLogic';
import { useRouter } from 'next/router';
import { PagesContext } from '../../contexts/pagesDataContext';



interface State {
    email: FormValue<string>,
    password: FormValue<string>,
    checkPassword: FormValue<string>,
    firstName: FormValue<string>,
    lastName: FormValue<string>,
}

function reducer(state:State, action: StateAction): State {
    switch (action.type) {
        case UPDATE_EMAIL:
            return { ...state, email: action.value }
        case UPDATE_PASSWORD:
            return { ...state, password: action.value }
        case UPDATE_CHECK_PASSWORD:
            return { ...state, checkPassword: action.value }
        case UPDATE_FIRST_NAME:
            return { ...state, firstName: action.value }
        case UPDATE_LAST_NAME:
            return { ...state, lastName: action.value }
        // case UPDATE_SHOW_PASSWORD:
        //     return { ...state, showPassword: action.value }
        default:
            return state
    }
}
const defaultValueString: FormValue<string> = {
    value: '',
    error: false
}
const initialState: State = {
    email: defaultValueString,
    password: defaultValueString,
    firstName: defaultValueString,
    lastName: defaultValueString,
    checkPassword: defaultValueString
    // showPassword: false
}

export default function AuthComp() {
    const [state, dispatch] = useReducer(reducer, initialState)
    const [isLogin, toggleIsLogin] = useState(true)
    const [pageData, passData] = useContext(PagesContext)
    const router = useRouter()
    const {email, password, checkPassword, firstName, lastName} = state



    const toggleLogin = () => {
        toggleIsLogin(!isLogin)
    }
    const onChangeHandler = (e:any, type:string) => {
        dispatch({ type, value: { value: e.target.value, error: false } })
    }

    const formSubmitHandler = (e: FormEvent<HTMLFormElement>) => {
        formHandler(e, state, dispatch, isLogin, router, pageData, passData)
    }

    return (
        <Grid container flexDirection='column' alignItems='center' justifyContent='center' className={styles.auth}>
            <Grid item sx={{ width: '25em' }}>
                <h2>{isLogin? 'Login' : 'New Account'}</h2>
                <br />
                <FormControl component='form' fullWidth onSubmit={formSubmitHandler}>
                    <section>
                        <TextField 
                            id='email'
                            label='Email'
                            fullWidth
                            size='small'
                            variant='standard'
                            value={email.value}
                            error={email.error}
                            aria-errormessage={email.errorMessage}
                            helperText={email.errorMessage}
                            onChange={(e) => onChangeHandler(e, UPDATE_EMAIL)}
                        />
                    </section>
                    <br />
                    <section>
                        <TextField 
                            id='password'
                            label='Password'
                            fullWidth
                            size='small'
                            variant='standard'
                            type='password'
                            value={password.value}
                            error={password.error}
                            aria-errormessage={password.errorMessage}
                            helperText={password.errorMessage}
                            onChange={(e) => onChangeHandler(e, UPDATE_PASSWORD)}
                        />
                    </section>
                    <br />
                    {!isLogin && (
                        <>
                        <section>
                            <TextField 
                                id='check-password'
                                label='Check Password'
                                fullWidth
                                size='small'
                                variant='standard'
                                type='password'
                                value={checkPassword.value}
                                error={checkPassword.error}
                                aria-errormessage={checkPassword.errorMessage}
                                helperText={checkPassword.errorMessage}
                                onChange={(e) => onChangeHandler(e, UPDATE_CHECK_PASSWORD)}
                            />
                        </section>
                        <br />
                        <Grid container gap={4}>
                            <section style={{ flex: 1}}>
                                <TextField 
                                    id='first'
                                    label='First Name'
                                    size='small'
                                    variant='standard'
                                    fullWidth
                                    value={firstName.value}
                                    error={firstName.error}
                                    aria-errormessage={firstName.errorMessage}
                                    helperText={firstName.errorMessage}
                                    onChange={(e) => onChangeHandler(e, UPDATE_FIRST_NAME)}
                                />
                            </section>
                            
                            <section style={{ flex: 1}}>
                                <TextField 
                                    id='last'
                                    label='Last Name'
                                    size='small'
                                    variant='standard'
                                    fullWidth
                                    value={lastName.value}
                                    error={lastName.error}
                                    aria-errormessage={lastName.errorMessage}
                                    helperText={lastName.errorMessage}
                                    onChange={(e) => onChangeHandler(e, UPDATE_LAST_NAME)}
                                />
                            </section>
                        </Grid>
                        </>
                    )}
                    
                    <br />                    
                    <section>
                        <Button 
                            variant="contained" 
                            type="submit" fullWidth 
                            sx={{ marginTop: '1em' }}
                        >
                        {isLogin? 'Sign In' : 'Register'}
                        </Button>
                    </section>
                </FormControl>
                {isLogin? (
                    <Button sx={{ marginTop: '1em' }} onClick={toggleLogin}>
                        Regiser
                    </Button>
                ) : (
                    <Button sx={{ marginTop: '1em' }} onClick={toggleLogin}>
                        Login
                    </Button>
                )}
                
                <LineDivider thickness={0.5}>
                or
                </LineDivider>
                <Grid container justifyContent='space-between' className={styles.providers}>
                    <Button 
                        variant='outlined'
                        startIcon={<Google />}
                    >
                        Google
                    </Button>
                    <Button 
                        variant='outlined'
                        startIcon={<Twitter />}
                    >
                        Twitter
                    </Button>
                    <Button 
                        variant='outlined'
                        startIcon={<Facebook />}
                    >
                        Facebook
                    </Button>
                </Grid>
                
            </Grid>
        </Grid>
    )
}