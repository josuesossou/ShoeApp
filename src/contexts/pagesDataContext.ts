import { createContext, Dispatch } from "react";

const pagesDefaultData: any = null

export const PagesContext = createContext<[any, Dispatch<any>]>(pagesDefaultData)
