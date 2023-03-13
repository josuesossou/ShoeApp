import * as localAdminData from '../data/admin.json'
import { Action, AdminData } from './types'

const adminData = localAdminData

export function getAdminData():AdminData {
    const { sidebarLinks, tabLinks} = adminData
    const { reviews, showcase, users } = tabLinks

    const data: AdminData = {
        sidebarLinks,
        showcase,
        users,
        reviews
    }
    
    return data
}