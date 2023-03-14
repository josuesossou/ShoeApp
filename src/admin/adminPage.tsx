import { Box, Button } from "@mui/material";
import { useState } from "react";
import { AdminContext, SideBarNavContext } from "../contexts/adminPageContext";
import { Action, AdminData } from "../helpers/types";
import Grid from "@mui/material/Unstable_Grid2";
// import AddProductForm from "./AddProductForm";
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
                <Grid container pt={10}>
                    <Grid xs={2}>
                        <SideNav setSidebarLinkValue={setSidebarLinkHandler} />
                    </Grid>
                    <Grid xs={10} pl={2}>
                        <h1>{sidebarLinkValue.label}</h1>
                        <br />
                        <MainSection />
                    </Grid>
                </Grid>
            </SideBarNavContext.Provider>
        </AdminContext.Provider>
    )
}

// {/* <Grid item> */}
//     {/* {sidebarLinkValue.action === 'products' && 
//         !showAddProductForm &&
//         <Button variant="outlined"
//             onClick={addNewProductHandler}
//         >
//             Add New Product
//         </Button>
//     } */}
//     {/* {showAddProductForm &&
//         <Button variant="outlined" onClick={closeNewProductHandler} color='error'>
//             Close
//         </Button>
//     } */}
// {/* </Grid> */}