import { createContext } from "react";
import { AdminData, Action } from "../helpers/types";

const adminContextDefaultValues: AdminData | null = null
const sideBarNavLink:Action | null = null

export const AdminContext = createContext<AdminData | null>(adminContextDefaultValues)
export const SideBarNavContext = createContext<Action | null>(sideBarNavLink)