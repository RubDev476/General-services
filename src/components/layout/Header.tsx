'use client';

import {useState} from "react";
import Link from 'next/link';

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBars,faXmark} from "@fortawesome/free-solid-svg-icons";

const NavItems = () => {
    return(
        <>
            <Link href={'/'} className={'text-link'}>Servicios</Link>
            <Link href={'/'} className={'text-link'}>Publicar</Link>
            <Link href={'/'} className={'text-link'}>Inciar sesion</Link>
            
            <Link href={'/'} className={'btn-1'}>Registro</Link>
        </>
    )
}

export default function Header() {
    const [openMenu, setOpenMenu] = useState(false);

    return(
        <>
            <header className={'sticky top-0 header-shadow bg-color3 z-50'}>
                <div className={'w-content flex-center-between py-3 md:py-5'}>
                    <Link href={'/'} className={'font-bold text-color2 text-xl md:text-2xl'}><span className={'text-color3 bg-color5 text-2xl md:text-3xl px-2 rounded'}>G</span> SERVICIOS</Link>
                    
                    <button
                        className={'all-center lg:hidden'}
                        onClick={() => setOpenMenu(!openMenu)}
                        name={'toggle-menu'}
                    >
                        <FontAwesomeIcon className={'text-2xl text-color5'} icon={openMenu ? faXmark : faBars} />
                    </button>
                    
                    <nav className={'hidden lg:flex gap-6 items-center font-[400] text-lg'}>
                        <NavItems />
                    </nav>
                </div>
            </header>
            
            <nav className={`fixed bg-color3 w-full h-[calc(100vh-56px)] top-[56px] g-transition ${openMenu ? 'left-0' : 'left-[-100%]'} z-40 w-content py-14 flex items-start gap-5 flex-col text-xl font-bold lg:hidden`}>
                <NavItems />
            </nav>
        </>
    )
}
