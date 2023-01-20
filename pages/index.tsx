import HomeComponent from '../src/components/home/Home';
import Navbar from '../src/components/navbar/Navbar';
import Wrapper from '../src/templates/page_wrapper';

export default function Home() {
  return (
    <Wrapper>
      <Navbar />
      <HomeComponent />

    </Wrapper>
  )
}
