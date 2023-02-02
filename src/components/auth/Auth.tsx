import styles from './Auth.module.scss'
import { Button, FormControl, Grid, TextField } from "@mui/material";
import { LineDivider } from "../common/Common";
import { Facebook, Google, Twitter } from '@mui/icons-material';
import { useState } from 'react';

interface AuthState {
    email: string,
    password: string,

}


export default function AuthComp() {
    const [isLogin, toggleIsLogin] = useState(true)

    const toggleLogin = () => {
        toggleIsLogin(!isLogin)
    }

    return (
        <Grid container flexDirection='column' alignItems='center' className={styles.auth}>
            <Grid item sx={{ width: '25em' }}>
                <h2>{isLogin? 'Login' : 'New Account'}</h2>
                <br />
                <FormControl fullWidth>
                    <section>
                        <TextField 
                            id='email'
                            label='Email'
                            fullWidth
                            size='small'
                            variant='standard'
                            // value={name.value}
                            // error={name.error}
                            // aria-errormessage={name.errorMessage}
                            // helperText={name.errorMessage}
                            // onChange={(e) => onChangeHandler(e, UPDATE_NAME)}
                        />
                    </section>
                    <br />
                    <section>
                        <TextField 
                            id='password'
                            label='Passwod'
                            fullWidth
                            size='small'
                            variant='standard'
                            type='password'
                            // value={name.value}
                            // error={name.error}
                            // aria-errormessage={name.errorMessage}
                            // helperText={name.errorMessage}
                            // onChange={(e) => onChangeHandler(e, UPDATE_NAME)}
                        />
                    </section>
                    <br />
                    {!isLogin && (
                        <Grid container gap={4}>
                            <section style={{ flex: 1}}>
                                <TextField 
                                    id='first'
                                    label='First Name'
                                    size='small'
                                    variant='standard'
                                    fullWidth
                                    // value={name.value}
                                    // error={name.error}
                                    // aria-errormessage={name.errorMessage}
                                    // helperText={name.errorMessage}
                                    // onChange={(e) => onChangeHandler(e, UPDATE_NAME)}
                                />
                            </section>
                        
                            <section style={{ flex: 1}}>
                                <TextField 
                                    id='last'
                                    label='Last Name'
                                    size='small'
                                    variant='standard'
                                    fullWidth
                                    // value={name.value}
                                    // error={name.error}
                                    // aria-errormessage={name.errorMessage}
                                    // helperText={name.errorMessage}
                                    // onChange={(e) => onChangeHandler(e, UPDATE_NAME)}
                                />
                            </section>
                        </Grid>
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