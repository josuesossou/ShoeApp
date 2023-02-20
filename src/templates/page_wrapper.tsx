import Head from 'next/head'
import styles from './Templates.module.scss'
import useSWR from 'swr'
import Navbar from '../components/navbar/Navbar'

import { Orbitron } from '@next/font/google'
import { ReactNode, useContext, useEffect } from 'react'
import { PagesContext } from '../contexts/pagesDataContext'
import { fetcher } from '../helpers/api/shared'

const orbitron = Orbitron({ subsets: ['latin'] })

export default function Wrapper({ children, nonav }: any) {
  const [pageData, passData] = useContext(PagesContext)
  const swrFetchUser = useSWR(
    {
      url: '/api/user', 
    },
  
    fetcher
  )
  const swrFetchBag = useSWR(
    !pageData.user? null :
    {
      url: `http://localhost:1337/api/bags?where={"username":{"$eq":"${pageData.user?.user.username}"}}`,
      headers: {Authorization: 'Bearer ' + pageData.user?.jwt},
    },
    fetcher
  )

  useEffect(() => {
    const user = swrFetchUser.data
    const bag = swrFetchBag.data

    if (user && !user['user']['confirmed']) {
      console.log(user)
      location.replace(`/non-verified-user/${user['user']['email']}`)
      return
    }

    passData({ 
      ...pageData, 
      user, 
      bag: bag? bag['data'] : []
    })

    // if (swrFetchBag.data) passData({ 
    //   ...pageData, 
    //   bag: swrFetchBag.data 
    // })
    console.log('USEr', swrFetchUser.data)
    console.log('BAg', swrFetchBag.data)

    // fetch('/api/user')
    // .then(res => res.json())
    // .then(user => {
    //     console.log(user)
    //     passData({ ...pageData, user })
    // })
    // .catch(() => passData({ ...pageData, user: null }))
  }, [swrFetchUser.isLoading, swrFetchBag.isLoading])

  return (
    <div className={`${orbitron.className} ${styles.wrapper}`}>
        <Head>
            <title>Create Next App</title>
            <meta name="description" content="Generated by create next app" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <link rel="icon" href="/favicon.ico" media="(prefered-color-scheme: light)" />
            {/* <link rel="icon" href="/favicon.ico" media="(prefered-color-scheme: dark)" /> */}
        </Head>
          {!nonav && <Navbar />}
          {children}
    </div>
  )
}