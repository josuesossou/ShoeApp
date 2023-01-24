import { Box, Button, Grid } from "@mui/material";
import { useState } from "react";
import { AdminContext, SideBarNavContext } from "../contexts/adminPageContext";
import { Action, AdminData } from "../helpers/types";
import AddProductForm from "./AddProductForm";
import MainSection from "./MainSection";
import SideNav from "./SideNav";

type PropsType = {
    adminData: AdminData
}

export default function AdminPage({ adminData }: PropsType) {
    const [sidebarLinkValue, setSidebarLinkValue] = useState<Action>(adminData.sidebarLinks[0])
    const [showAddProductForm, toggleShowAddProductForm] = useState<boolean>(false)
    const addNewProductHandler = () => {
        toggleShowAddProductForm(true)
    }
    const closeNewProductHandler = () => {
        toggleShowAddProductForm(false)
    }
    const setSidebarLinkHandler = (value: Action) => {
        setSidebarLinkValue(value)
        toggleShowAddProductForm(false)
    }

    return (
        <AdminContext.Provider value={adminData}>
            <SideBarNavContext.Provider value={sidebarLinkValue}>
                <Grid container marginTop='4em' >
                    <Grid item xs={12} p={4}>
                        <Grid container item justifyContent='space-between' 
                            alignItems='center' ml='auto'
                            minHeight={46} xs={10}
                        >
                            <Grid item>
                                <h1>{sidebarLinkValue.label}</h1>
                            </Grid>

                            <Grid item>
                                {sidebarLinkValue.action === 'products' && 
                                    !showAddProductForm &&
                                    <Button variant="outlined"
                                        onClick={addNewProductHandler}
                                    >
                                        Add New Product
                                    </Button>
                                }
                                {showAddProductForm &&
                                    <Button variant="outlined" onClick={closeNewProductHandler} color='error'>
                                        Close
                                    </Button>
                                }
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={2}>
                        <SideNav setSidebarLinkValue={setSidebarLinkHandler} />
                    </Grid>
                    <Grid item xs={10} pr={4} pl={2}>
                        {showAddProductForm? (
                            <AddProductForm />
                        ): (<MainSection />)}
                        
                    </Grid>
                </Grid>
            </SideBarNavContext.Provider>
        </AdminContext.Provider>
    )
}