import Navbar from '../src/components/navbar/Navbar';
import ProductsComp from '../src/components/products/Products';
import Wrapper from '../src/templates/page_wrapper';

export default function Products() {
  return (
    <Wrapper noShopAll>
        <ProductsComp />
    </Wrapper>
  )
}
