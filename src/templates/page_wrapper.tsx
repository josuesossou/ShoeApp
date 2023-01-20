import Head from 'next/head'
import styles from '../assets/styles/Templates.module.css'
import { Orbitron } from '@next/font/google'

const orbitron = Orbitron({ subsets: ['latin'] })


export default function Wrapper({ children }: any) {
  return (
    <div className={`${orbitron.className} ${styles.wrapper}`}>
        <Head>
            <title>Create Next App</title>
            <meta name="description" content="Generated by create next app" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <link rel="icon" href="/favicon.ico" media="(prefered-color-scheme: light)" />
            {/* <link rel="icon" href="/favicon.ico" media="(prefered-color-scheme: dark)" /> */}
        </Head>
            {children}
    </div>
  )
}