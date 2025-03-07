'use client';

import { useState, useEffect } from "react";
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { usePathname } from "next/navigation";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faGear, faList, faRightFromBracket, faUser, faXmark } from "@fortawesome/free-solid-svg-icons";

import { useAuthActions } from "@/store/hooks/useAuthActions";
import { useAuthSelectors } from "@/store/hooks/useAuthSelectors";

import type { NavItemsInitialProps, NavItemsSessionProps } from "@/types/props";
import { Roles } from "@/types/forms";

import Avatar from "../ui/Avatar";
 
const NoSSR = dynamic(() => import('../no-ssr/NavMobile'), { ssr: false });

const NavItemsSession = ({ mobileSize, userData }: NavItemsSessionProps) => {
    const { logoutAction } = useAuthActions();

    return (
        <>
            <div className="text-nowrap">
                {mobileSize && (
                    <div className="mb-4">
                        <Avatar size={20} urlImg={userData.imagen} pointer={false} />
                    </div>
                )}

                <p className="font-bold text-color5 text-lg">{userData.nombre}</p>
                <p className="font-normal text-color8 text-sm lg:text-[16px]">{userData.correo}</p>
            </div>

            <hr className="text-color10 w-full" />

            <Link href={`/user/${userData.id_usuarios}`} className={'text-link'}><FontAwesomeIcon icon={faUser} className="mr-1" /> Mi perfil</Link>
            {userData.roles.some(role => role.tipo.includes(Roles.proveedor)) && <Link href={'/my-services'} className={'text-link'}><FontAwesomeIcon icon={faList} className="mr-1" /> Mis servicios</Link>}
            <Link href={'/edit-profile'} className={'text-link'}><FontAwesomeIcon icon={faGear} className="mr-1" /> Editar perfil</Link>

            <button onClick={() => logoutAction()} className="text-color6">
                <FontAwesomeIcon icon={faRightFromBracket} className="mr-1" /> Cerrar sesion
            </button>
        </>
    )
}

export const NavItemsInitial = ({ mobileSize }: NavItemsInitialProps) => {
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
                    {userData.roles.some(role => role.tipo.includes(Roles.proveedor)) && <Link href={'/create-service'} className={'text-link'}>Crear servicio</Link>}

                    {mobileSize ? (
                        <>
                            <hr className="text-color10 w-full" />

                            <NavItemsSession userData={userData} mobileSize={mobileSize} />
                        </>
                    ) : (
                        <div className="relative avatar-header-container">
                            <Avatar size={11} urlImg={userData.imagen} pointer={true} />

                            <div className="avatar-dropdown">
                                <NavItemsSession userData={userData} mobileSize={mobileSize} />
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

            <nav className={`fixed bg-color3 w-full h-[calc(100vh-56px)] top-[56px] g-transition ${openMenu ? 'left-0' : 'left-[-100%]'} z-40 w-content py-7 flex items-start gap-4 flex-col text-lg font-bold lg:hidden overflow-y-auto`}>
                <NavItemsInitial mobileSize={true} />
            </nav>

            <NoSSR openMenu={openMenu} />
        </>
    )
}
