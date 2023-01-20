import styles from '../../assets/styles/Components.module.css'
import image1 from '../../assets/images/shoe12x.png'
import image2 from '../../assets/images/shoe4.png'
import image3 from '../../assets/images/shoe2.png'
import image4 from '../../assets/images/shoe4.png'

import Image from 'next/image'
import { useEffect, useRef } from 'react'

type Item = {
    img: any,
    name: string
}

const observeElements = () => {
    const sections = document.querySelectorAll(`.${styles.hm_section}`)
    // const options = { margin: '10em' }
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            // if (!entry.isIntersecting) {
            //     entry.target.classList.remove(styles.hm_active)
                
            // } else {

            //     entry.target.classList.add(styles.hm_active)
            
            //     console.log(entry.target.childNodes.item(1))
            // }
            entry.target.classList.toggle(styles.hm_active, entry.isIntersecting)

        })
    }, { 
        threshold: .7,
        rootMargin: '0px'
    })
    
    sections.forEach(section => {
        observer.observe(section)
    })
}

export default function HomeComponent() {

    useEffect(() => {
        observeElements()
    }, [])

    const featuredItems: Item[] = [
        {
            img: image1,
            name: "Shoes Name 1"
        },
        {
            img: image2,
            name: "Shoes Name 2"
        },
        {
            img: image3,
            name: "Shoes Name 3"
        },
        {
            img: image4,
            name: "Shoes Name 4"
        }
    ]

    return (
        <div className={styles.home} dir="ltr">
            {featuredItems.map(item => (
                <section key={item.name} className={styles.hm_section}>
                    {/* <div className={styles.hm_img}> */}
                    <Image alt="" src={item.img} width={600} />
                        
                    {/* </div> */}
                    <span>{item.name}</span>
                </section>
            ))}
        </div>
    )
}