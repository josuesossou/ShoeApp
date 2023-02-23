import CheckoutComp from '../src/components/checkout/Checkout';
import Navbar from '../src/components/navbar/Navbar';
import Wrapper from '../src/templates/page_wrapper';

export default function Checkout() {
    return (
        <Wrapper nonav noShopAll>
            <CheckoutComp />
        </Wrapper>
    )
}
