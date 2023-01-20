import { GetStaticProps } from 'next';
import AdminPage from '../src/admin/adminPage';
import Navbar from '../src/components/navbar/Navbar';
import { getSideNavAdminData, getTabLinks } from '../src/helpers/getLocalData';
import Wrapper from '../src/templates/page_wrapper';

export default function Admin() {
  return (
    <Wrapper>
        <Navbar />
        <AdminPage />
    </Wrapper>
  )
}

export const getStaticProps: GetStaticProps = async () => {
    const sideNavAdminData = getSideNavAdminData()
    const { orders, products, productReviews, purchases, users } = getTabLinks()

    return {
        props: {
            sideNavAdminData,
            orders,
            products,
            productReviews,
            purchases,
            users
        }
    }
}
