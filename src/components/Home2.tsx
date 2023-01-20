import styles from './home2.module.css'
import image1 from '../assets/images/shoe12x.png'
import image2 from '../assets/images/shoe4.png'

import Image from 'next/image'
import { useEffect, useRef } from 'react'

type Item = {
    img: any,
    name: string
}

const observeElements = () => {
    const sections = document.querySelectorAll(`.${styles.hm_section}`)
    const options = { threshold: 1 }
    const observer = new IntersectionObserver(function (entries, obser) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                entry.target.classList.remove(styles.hm_active)
                return
            }

            entry.target.classList.add(styles.hm_active)
            
            console.log(entry.target.childNodes.item(1))
        })
    }, options)
    
    sections.forEach(section => {
        observer.observe(section)
    })
}

export default function Home2Component() {

    // useEffect(() => {
    //     observeElements()
    // }, [])

    // const featuredItems: Item[] = [
    //     {
    //         img: image1,
    //         name: "Shoes Name 1"
    //     },
    //     {
    //         img: image2,
    //         name: "Shoes Name 2"
    //     },
    //     // {
    //     //     img: image3,
    //     //     name: "Shoes Name 3"
    //     // },
    //     {
    //         img: image4,
    //         name: "Shoes Name 4"
    //     }
    // ]

    return (
        <div className={styles.home} dir="ltr">
            {/* {featuredItems.map(item => (
                <section key={item.name} className={styles.hm_section}>
                    <div className={styles.hm_img}>
                        <Image alt="" src={item.img} width={600} />
                        
                    </div>
                    <span>{item.name}</span>
                </section>
            ))} */}
            <section className={styles.hm_img}>
                <picture>
                    <source srcSet={image2} media='(min-width: 10em)' />
                    <Image alt="" src={image1} width={600} className="img" />
                </picture>
            </section>
            <section>
                Section 2
            </section>
            <section>
                Section 3
            </section>
            <section>
                Section 4
            </section>
        </div>
    )
}