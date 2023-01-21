import { useContext } from "react"
import { SideBarNavContext } from "../contexts/adminPageContext"
import OrderSection from "./OrderSection";
import ProductReviewSection from "./ProductReviewSection";
import ProductSection from "./ProductSection";
import PurchaseSection from "./PurchaseSection";
import UserSection from "./UserSection";

export default function MainSection() {
    const sidebarValue = useContext(SideBarNavContext)

    switch (sidebarValue?.action) {
        case 'orders':
            return (
                <>
                    <OrderSection />
                </>
            );
        case 'products':
            return (
                <>
                    <ProductSection />
                </>
            );
        case 'purchases':
            return (
                <>
                    <PurchaseSection />
                </>
            );
        case 'users':
            return (
                <>
                    <UserSection />
                </>
            );
        case 'productReviews':
            return (
                <>
                    <ProductReviewSection />
                </>
            );
        default:
            return (
                <>
                    Section Unavailable
                </>
            )
    }
}