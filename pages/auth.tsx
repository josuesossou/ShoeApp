import AuthComp from '../src/components/auth/Auth';
import Navbar from '../src/components/navbar/Navbar';
import Wrapper from '../src/templates/page_wrapper';

export default function Auth() {
  return (
    <Wrapper>
        <Navbar />
        <AuthComp />
    </Wrapper>
  )
}
