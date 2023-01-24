import { Label } from "@mui/icons-material";
import { Divider, FormControl, MenuItem, Paper, TextField } from "@mui/material";
import { useState } from "react";
import styles from '../assets/styles/AdminComponents.module.scss'

export default function AddProductForm() {
    const [type, setProductType] = useState<'commingSoon' | 'orderNow' | 'linked' | 'unPublished'>()
    const typeHandler = (e:any) => {
        const value: 'commingSoon' | 'orderNow' | 'linked' | 'unPublished' = e.target.value
        setProductType(value)
    }

    return (
        <Paper
            elevation={0}
            className={styles.addProductForm}
        >
            <FormControl component='form' fullWidth>
                <section>
                    <h2>Name</h2>
                    <br />
                    <TextField 
                        id='name'
                        label='Name'
                        fullWidth
                        size="small"
                    />
                    <Divider sx={{ mt: 2 }} />
                </section>

                <section>

                </section>
                {/* <TextField 
                    id='type' 
                    label='Type of Product' 
                    value={type} select
                    onChange={typeHandler}
                >
                    <MenuItem value='commingSoon'>Comming Soon</MenuItem>
                    <MenuItem value='orderNow'>Order Now</MenuItem>
                    <MenuItem value='linked'>Link to Another Site</MenuItem>
                    <MenuItem value='unPublished'>Make Not Available</MenuItem>
                </TextField>
                <TextField
                    id='price'
                    label='Price'
                />
                {type === 'linked' && ( // ask kyle whether
                    <>
                        <TextField
                            id='link'
                            label='Link To Another Website'
                        />
                        <TextField label='Show Price' />
                    </>
                )}
                <TextField
                /> */}
            </FormControl>
        </Paper>
    )
}

// id: string,
// tag: string,
// name: string,
// solid: boolean,
// solidImage: string,
// fgImageUrl: string,
// bgImageUrl: string,
// sideImages: SideImage[],
// featured: Featured,
// showcase: boolean,
// type: TypeofProduct, // shows the price
// description: string,
// createdAt: string, // actual date time in string
// dateTime: number, // date time in mili second
// timezome: string,
// rating: number