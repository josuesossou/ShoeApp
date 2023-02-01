import { useState } from "react";
import { PagesContext } from "../contexts/pagesDataContext";

export default function PagesData({ children }: any) {
    const [pageData, passData] = useState<any>(null)
    
    return (
        <PagesContext.Provider value={[pageData, passData]}>
            {children}
        </PagesContext.Provider>
    )
}