import Featured from '../src/components/featured/Featured';
import HomeComponent from '../src/components/home/Home';
import Navbar from '../src/components/navbar/Navbar';
import Showcase from '../src/components/showcase/Showcase';
import Wrapper from '../src/templates/page_wrapper';

export default function Home() {
  return (
    <Wrapper>
      <Navbar />
      <Showcase />
      <div id='products' />
      <Featured />
      
    </Wrapper>
  )
}
