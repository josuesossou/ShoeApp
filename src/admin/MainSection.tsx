import { useContext } from "react"
import { SideBarNavContext } from "../contexts/adminPageContext"
// import OrderSection from "./OrderSection";
import ProductReviewSection from "./ProductReviewSection";
import ShowcaseSection from "./ShowcaseSection";
// import ProductSection from "./ProductSection";
// import PurchaseSection from "./PurchaseSection";
import UserSection from "./UserSection";

export default function MainSection() {
    const sidebarValue = useContext(SideBarNavContext)

    switch (sidebarValue?.action) {
        // case 'orders':
        //     return (
        //         <>
        //             <OrderSection />
        //         </>
        //     );
        //     case 'purchases':
        //         return (
        //             <>
        //                 <PurchaseSection />
        //             </>
        //         );
        case 'showcase':
            return <ShowcaseSection />;
        case 'users':
            return <UserSection />;
        case 'reviews':
            return <ProductReviewSection />;
        default:
            return (
                <>
                    Section Unavailable
                </>
            )
    }
}