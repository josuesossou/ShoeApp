import '../src/assets/styles/globals.css'
import type { AppProps } from 'next/app'
import PagesData from '../src/templates/page_data'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <PagesData>
      <Component {...pageProps}/>
    </PagesData>
  )
}
