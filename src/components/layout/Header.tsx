'use client';

import { useState, useEffect } from "react";
import Link from 'next/link';
import Image from "next/image";
import { usePathname } from "next/navigation";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faGear, faList, faRightFromBracket, faUser, faXmark } from "@fortawesome/free-solid-svg-icons";

import { useAuthActions } from "@/store/hooks/useAuthActions";
import { useAuthSelectors } from "@/store/hooks/useAuthSelectors";

import type { NavItemsInitialProps, NavItemsSessionProps } from "@/types/props";
import { Roles } from "@/types/forms";

import { IMAGE_DEFAULT } from "@/utils/global-vars";

const NavItemsSession = ({ nombre, correo, id_usuarios }: NavItemsSessionProps) => {
    const { logoutAction } = useAuthActions();
    const { userData } = useAuthSelectors();

    return (
        <>
            <>
                <div className="font-bold text-color2 close-ui-action">
                    <p className="close-ui-action">{nombre}</p>
                    <p className="close-ui-action">{correo}</p>
                </div>

                <hr className="text-color10 w-full" />

                <Link href={`/user/${id_usuarios}`} className={'text-link'}><FontAwesomeIcon icon={faUser} className="mr-1" /> Mi perfil</Link>
                {userData?.roles.some(role => role.tipo.includes(Roles.proveedor)) && <Link href={'/my-services'} className={'text-link'}><FontAwesomeIcon icon={faList} className="mr-1" /> Mis servicios</Link>}
                <Link href={'/edit-profile'} className={'text-link'}><FontAwesomeIcon icon={faGear} className="mr-1" /> Editar perfil</Link>

                <button onClick={() => logoutAction()} className="text-color6">
                    <FontAwesomeIcon icon={faRightFromBracket} className="mr-1" /> Cerrar sesion
                </button>
            </>
        </>
    )
}

const NavItemsInitial = ({ mobileSize }: NavItemsInitialProps) => {
    const { userData } = useAuthSelectors();

    return (
        <>
            <Link href={'/services'} className={'text-link'}>Servicios</Link>

            {!userData ? (
                <>
                    <Link href={'/login'} className={'text-link'}>Inciar sesion</Link>
                    <Link href={'/register'} className={'btn-1'}>Registro</Link>
                </>
            ) : (
                <>
                    {userData?.roles.some(role => role.tipo.includes(Roles.proveedor)) && <Link href={'/create-service'} className={'text-link'}>Crear servicio</Link>}

                    {mobileSize ? (
                        <>
                            <hr className="text-color10 w-full" />

                            <NavItemsSession id_usuarios={userData.id_usuarios} nombre={userData.nombre} correo={userData.correo} />
                        </>
                    ) : (
                        <div className="relative avatar-header-container">
                            <div className="w-11 h-11 rounded-full cursor-pointer object-cover relative">
                                <Image src={userData.imagen ?? IMAGE_DEFAULT} alt="user-img" fill priority className="rounded-full cursor-pointer object-cover" sizes="11vw" />
                            </div>

                            <div className="avatar-dropdown">
                                <NavItemsSession id_usuarios={userData.id_usuarios} nombre={userData.nombre} correo={userData.correo} />
                            </div>
                        </div>
                    )}
                </>
            )}
        </>
    )
}

export default function Header() {
    const [openMenu, setOpenMenu] = useState(false);

    const pathname = usePathname();

    const { validateSessionAction } = useAuthActions();
    const { authLoading } = useAuthSelectors();

    useEffect(() => {
        validateSessionAction();
    }, []); // eslint-disable-line

    useEffect(() => {
        setOpenMenu(false);
    }, [pathname]);

    return (
        <>
            <header className={'sticky top-0 header-shadow bg-color3 z-[100]'}>
                <div className={'w-content flex-center-between py-3 md:py-5 lg:h-20'}>
                    <Link href={'/'} className={'font-bold text-color2 text-xl md:text-2xl'}><span className={'text-color3 bg-color5 text-2xl md:text-3xl px-2 rounded'}>G</span> SERVICIOS</Link>

                    <button
                        className={'all-center lg:hidden'}
                        onClick={() => setOpenMenu(!openMenu)}
                        title={"menu-button"}
                    >
                        <FontAwesomeIcon className={'text-2xl text-color5'} icon={openMenu ? faXmark : faBars} />
                    </button>

                    <nav className={'hidden lg:flex gap-6 items-center font-[400] text-lg'}>
                        {authLoading ? (
                            <>
                                <div className="w-24 h-5 skeleton"></div>
                                <div className="w-24 h-5 skeleton"></div>
                                <div className="w-24 h-5 skeleton"></div>
                                <div className="w-11 h-11 skeleton-circle"></div>
                            </>
                        ) : (
                            <NavItemsInitial mobileSize={false} />
                        )}
                    </nav>
                </div>
            </header>

            <nav className={`fixed bg-color3 w-full h-[calc(100vh-56px)] top-[56px] g-transition ${openMenu ? 'left-0' : 'left-[-100%]'} z-40 w-content py-14 flex items-start gap-5 flex-col text-xl font-bold lg:hidden`}>
                <NavItemsInitial mobileSize={true} />
            </nav>
        </>
    )
}
