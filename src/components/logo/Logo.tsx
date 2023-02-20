import Link from "next/link";
import Image from "next/image";
import LogoImg from '../../assets/images/logo/Logo.png'

export default function Logo({ width=50, height=50}:{width?: number, height?: number}) {
    return (
        <Link href='/'>
            <Image alt='' src={LogoImg} width={width} height={height}  />
        </Link>
    )
}