import { useContext, useEffect } from 'react';
import BagComp from '../src/components/bag/Bag';
import { PagesContext } from '../src/contexts/pagesDataContext';
import Wrapper from '../src/templates/page_wrapper';

export default function Bag() {
  const [pageData, _] = useContext(PagesContext)
  useEffect(() => {
    if (!pageData.user) location.replace('/auth')
  }, [])

  return (
    <Wrapper>
      <BagComp />
    </Wrapper>
  )
}
