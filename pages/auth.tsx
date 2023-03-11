import { useContext, useEffect } from 'react';
import AuthComp from '../src/components/auth/Auth';
import { PagesContext } from '../src/contexts/pagesDataContext';
import Wrapper from '../src/templates/page_wrapper';

export default function Auth() {
  const [pageData, _] = useContext(PagesContext)
  useEffect(() => {
    if (pageData.user) location.replace('/')
  }, [])
  return (
    <Wrapper noShopAll>
        <AuthComp />
    </Wrapper>
  )
}
