import * as localAdminData from '../data/admin.json'
import { AdminData } from './types'

const adminData: AdminData = localAdminData

export const getSideNavAdminData = () => {
    return adminData.sidebarLinks
}

export const getTabLinks = () => {
    return adminData.tabLinks
}