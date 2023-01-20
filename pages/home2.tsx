import Home2Component from '../src/components/Home2';
import Navbar from '../src/components/navbar/Navbar';
import Wrapper from '../src/templates/page_wrapper';

export default function Home() {
  return (
    <Wrapper>
      <Navbar />
      <Home2Component />

    </Wrapper>
  )
}
