import { Alert } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { PagesContext } from "../contexts/pagesDataContext";
import { PageData } from "../helpers/types";

const FlashMessage = () => {
    const [pageData, passData] = useContext(PagesContext)

    useEffect(() => {
        setTimeout(() => {
            passData({ ...pageData, flashMessage: null })
        }, 3000)
    }, [])

    return (
        <Alert 
            severity={pageData.flashMessage?.severity}
            sx={{
                width: '50ch',
                position: 'fixed',
                top: '5em',
                left: '50%',
                transform: 'translateX(-50%)',
                zIndex: 1000
            }}
        >
            {pageData.flashMessage?.message}
        </Alert>
    )
}

export default function PagesData({ children }: any) {
    const [pageData, passData] = useState<PageData>({})
    
    return (
        <PagesContext.Provider value={[pageData, passData]}>
            {pageData.flashMessage?.show && (
                <FlashMessage />
            )}
            
            {children}
        </PagesContext.Provider>
    )
}