import { createContext, Dispatch } from "react";
import { PageData } from "../helpers/types";

const pagesDefaultData: any = null

export const PagesContext = createContext<[PageData, Dispatch<PageData>]>(pagesDefaultData)
