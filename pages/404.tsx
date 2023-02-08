import ErrorPage from '../src/components/404/404';
import Navbar from '../src/components/navbar/Navbar';
import Wrapper from '../src/templates/page_wrapper';

export default function NotFound() {
  return (
    <Wrapper>
        <ErrorPage />
    </Wrapper>
  )
}
