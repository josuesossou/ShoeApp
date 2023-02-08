import { GetStaticProps } from 'next';
import AdminPage from '../src/admin/AdminPage';
import Navbar from '../src/components/navbar/Navbar';
import { getAdminData } from '../src/helpers/getLocalData';
import { AdminData } from '../src/helpers/types';
import Wrapper from '../src/templates/page_wrapper';

type PropsType = {
    adminData: AdminData
}
export default function Admin({ adminData }: PropsType) {
  return (
    <Wrapper>
        <AdminPage adminData={adminData}/>
    </Wrapper>
  )
}

export const getStaticProps: GetStaticProps = async () => {
    const adminData = getAdminData()

    return {
        props: {
            adminData
        }
    }
}
