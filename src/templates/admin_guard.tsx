import Wrapper from "./page_wrapper";
import useSWR from 'swr'

import { ReactNode, useContext, useEffect, useState } from "react";
import { PagesContext } from "../contexts/pagesDataContext";
import { fetcher } from "../helpers/api/shared";
import { getShowcase } from "../helpers/api/strapi";
import { ShowcaseContext } from "../contexts/adminPageContext";
import { Showcase } from "../helpers/types";


export default function AdminGuard ({ children }: { children: ReactNode }) {
    const [pageData, _] = useContext(PagesContext)
    const [isAdmin, setisAdmin] = useState<boolean>(false)
    const [showcaseData, setData] = useState<Showcase[]>([])

    useEffect(() => {
        setisAdmin(false)

        getShowcase(pageData.user?.jwt).then((data) => {
            console.log('Showcases', data)
            if (data) {
                setisAdmin(true)
                setData(data)
            }
        })

    }, [pageData.user])

    if (!isAdmin) return (
        <Wrapper noShopAll>
            <p>You need authorization, try going somewhere else</p>
        </Wrapper>
    )

    return (
        <Wrapper noShopAll>
            <ShowcaseContext.Provider value={showcaseData}>
                {children}
            </ShowcaseContext.Provider>
        </Wrapper>
    )
}