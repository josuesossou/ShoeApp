import * as localAdminData from '../data/admin.json'
import { Action, AdminData } from './types'

const adminData = localAdminData

export function getAdminData():AdminData {
    const { sidebarLinks, tabLinks} = adminData
    const { orders, productReviews, products, purchases, users } = tabLinks

    const data: AdminData = {
        sidebarLinks,
        orders,
        products,
        purchases,
        users,
        productReviews
    }
    
    return data
}