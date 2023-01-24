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
        toggleShowAddProductForm(!showAddProductForm)
    }

    return (
        <AdminContext.Provider value={adminData}>
            <SideBarNavContext.Provider value={sidebarLinkValue}>
                <Grid container marginTop='4em'>
                    <Grid item xs={12} p={4}>
                        <Grid container justifyContent='space-between' 
                            alignItems='center' ml='auto'
                            minHeight={46}
                        >
                            <Grid item>{sidebarLinkValue.label}</Grid>

                            <Grid item>
                                {sidebarLinkValue.action === 'products' && 
                                    <Button variant="outlined"
                                        onClick={addNewProductHandler}
                                    >
                                        Add New Product
                                    </Button>
                                }
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={2}>
                        <SideNav setSidebarLinkValue={setSidebarLinkValue} />
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