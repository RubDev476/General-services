'use client';

import { useState, useEffect } from "react";
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { usePathname } from "next/navigation";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faGear, faList, faPlus, faRightFromBracket, faUser, faXmark } from "@fortawesome/free-solid-svg-icons";

import { useAuthActions } from "@/store/hooks/useAuthActions";
import { useAuthSelectors } from "@/store/hooks/useAuthSelectors";

import type { NavItemsInitialProps, NavItemsSessionProps } from "@/types/props";
import { Roles } from "@/types/forms";

import Avatar from "../ui/Avatar";
 
const NoSSR = dynamic(() => import('../no-ssr/NavMobile'), { ssr: false });

export const NavItemsSession = ({ mobileSize, userData }: NavItemsSessionProps) => {
    const { logoutAction } = useAuthActions();

    return (
        <>
            <div className={`w-full text-nowrap ${mobileSize ? 'p-4 bg-color9/80 rounded-2xl border border-color8/20' : 'pb-2 border-b border-color8/20'}`}>
                {mobileSize && (
                    <div className="mb-3" data-testid="avatar-container">
                        <Avatar size={20} urlImg={userData.imagen} pointer={false} />
                    </div>
                )}

                <p className="font-extrabold text-color2 text-base lg:text-lg leading-tight">{userData.nombre}</p>
                <p className="font-normal text-color8 text-xs lg:text-sm mt-0.5 truncate max-w-[200px]">{userData.correo}</p>
            </div>

            <div className={`w-full flex flex-col gap-1.5 ${mobileSize ? 'mt-2' : 'pt-2'}`}>
                <Link
                    href={`/user/${userData.id_usuarios}`}
                    className={'w-full px-3 py-2 rounded-xl text-color2 hover:text-color5 hover:bg-color9 font-semibold text-sm lg:text-base g-transition flex items-center gap-2'}
                >
                    <FontAwesomeIcon icon={faUser} className="text-color5 text-sm" /> Mi perfil
                </Link>

                {userData.roles.some(role => role.tipo.includes(Roles.proveedor)) && (
                    <Link
                        href={'/my-services'}
                        className={'w-full px-3 py-2 rounded-xl text-color2 hover:text-color5 hover:bg-color9 font-semibold text-sm lg:text-base g-transition flex items-center gap-2'}
                    >
                        <FontAwesomeIcon icon={faList} className="text-color5 text-sm" /> Mis servicios
                    </Link>
                )}

                <Link
                    href={'/edit-profile'}
                    className={'w-full px-3 py-2 rounded-xl text-color2 hover:text-color5 hover:bg-color9 font-semibold text-sm lg:text-base g-transition flex items-center gap-2'}
                >
                    <FontAwesomeIcon icon={faGear} className="text-color5 text-sm" /> Editar perfil
                </Link>

                <hr className="text-color8/20 w-full my-1" />

                <button
                    onClick={() => logoutAction()}
                    className="w-full text-left px-3 py-2 rounded-xl text-color6 hover:bg-color6/10 font-bold text-sm lg:text-base g-transition flex items-center gap-2"
                >
                    <FontAwesomeIcon icon={faRightFromBracket} className="text-sm" /> Cerrar sesion
                </button>
            </div>
        </>
    )
}

export const NavItemsInitial = ({ mobileSize }: NavItemsInitialProps) => {
    const { userData } = useAuthSelectors();

    return (
        <>
            {!userData ? (
                <>
                    <Link
                        href={'/login'}
                        className={`font-semibold g-transition px-4 py-2 rounded-full text-color2 hover:text-color5 hover:bg-color9/80  lg:text-base border border-transparent hover:border-color8/20 ${mobileSize ? "w-full text-center" : ""} max-w-[500px] mx-auto`}
                        data-testid="login-link"
                    >
                        Iniciar sesion
                    </Link>

                    <Link
                        href={'/register'}
                        className={`font-semibold g-transition px-4 py-2 rounded-full text-color2 hover:text-color5 hover:bg-color9/80  lg:text-base border border-transparent hover:border-color8/20 ${mobileSize ? "w-full text-center" : ""} max-w-[500px] mx-auto`}
                    >
                        Registro
                    </Link>
                </>
            ) : (
                <>
                    {userData.roles.some(role => role.tipo.includes(Roles.proveedor)) && (
                        <Link
                            href={'/create-service'}
                            className={`font-bold g-transition ${
                                mobileSize
                                    ? 'w-full px-4 py-3 rounded-2xl bg-color5/10 text-color5 border border-color5/30 text-center text-base flex items-center justify-center gap-2'
                                    : 'px-4 py-2 rounded-full bg-color5/10 hover:bg-color5 text-color5 hover:text-color3 border border-color5/30 text-sm lg:text-base flex items-center gap-1.5 shadow-sm'
                            }`}
                        >
                            <FontAwesomeIcon icon={faPlus} className="text-xs" />
                            <span>Crear servicio</span>
                        </Link>
                    )}

                    {mobileSize ? (
                        <>
                            <hr className="text-color8/20 w-full my-2" />
                            <NavItemsSession userData={userData} mobileSize={mobileSize} />
                        </>
                    ) : (
                        <div className="relative avatar-header-container ml-2" data-testid="nav-items-session-desktop">
                            <div className="p-0.5 rounded-full ring-2 ring-color5/30 hover:ring-color6 transition-all cursor-pointer">
                                <Avatar size={11} urlImg={userData.imagen} pointer={true} />
                            </div>

                            <div className="avatar-dropdown">
                                <NavItemsSession userData={userData} mobileSize={mobileSize} />
                            </div>
                        </div>
                    )}
                </>
            )}

            <Link
                href={'/marketplace'}
                className={`font-semibold g-transition btn-2 ${mobileSize ? "w-full text-center" : ""} max-w-[500px] mx-auto`}
            >
                <span>Explorar articulos</span>
            </Link>
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

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 1024) {
                setOpenMenu(false);
            }
        };

        let mql: MediaQueryList | null = null;
        const handleMedia = (e: MediaQueryListEvent) => {
            if (e.matches) {
                setOpenMenu(false);
            }
        };

        if (typeof window !== 'undefined') {
            window.addEventListener('resize', handleResize);
            if (typeof window.matchMedia === 'function') {
                mql = window.matchMedia('(min-width: 1024px)');
                if (mql.addEventListener) {
                    mql.addEventListener('change', handleMedia);
                }
            }
        }

        return () => {
            window.removeEventListener('resize', handleResize);
            if (mql && mql.removeEventListener) {
                mql.removeEventListener('change', handleMedia);
            }
        };
    }, []);

    return (
        <>
            <header className={'sticky top-0 bg-color3/95 backdrop-blur-md border-b border-color8/20 z-[100] transition-all'}>
                <div className={'w-content flex-center-between py-3 md:py-4 lg:h-20'}>
                    {/* BRAND LOGO */}
                    <Link href={'/'} className={'font-bold text-color2 text-xl md:text-2xl flex items-center gap-2.5 group'}>
                        <span className={'text-color3 bg-gradient-to-tr from-color5 via-color6 to-color7 text-lg md:text-xl px-2.5 py-1 rounded-xl font-black shadow-md shadow-color5/20 group-hover:scale-105 transition-transform tracking-tight'}>
                            NL
                        </span>
                        <div className="flex flex-col leading-none">
                            <span className="tracking-tight text-lg md:text-xl font-extrabold text-color2">NEXT LOOT</span>
                            <span className="text-[10px] font-bold text-color6 tracking-wider uppercase mt-0.5">Hardware & Gaming Marketplace</span>
                        </div>
                    </Link>

                    {/* BOTÓN MENÚ MÓVIL */}
                    <button
                        className={'all-center lg:hidden w-10 h-10 rounded-xl bg-color9/80 hover:bg-color9 text-color5 transition-colors border border-color8/20'}
                        onClick={() => setOpenMenu(!openMenu)}
                        title={"menu-button"}
                    >
                        <FontAwesomeIcon className={'text-xl'} icon={openMenu ? faXmark : faBars} />
                    </button>

                    {/* MENÚ DESKTOP */}
                    <nav className={'hidden lg:flex gap-3 xl:gap-5 items-center font-medium text-base'} data-testid="nav-desktop">
                        {authLoading ? (
                            <>
                                <div className="w-24 h-6 skeleton rounded-lg"></div>
                                <div className="w-24 h-6 skeleton rounded-lg"></div>
                                <div className="w-24 h-6 skeleton rounded-lg"></div>
                                <div className="w-10 h-10 skeleton-circle"></div>
                            </>
                        ) : (
                            <NavItemsInitial mobileSize={false} />
                        )}
                    </nav>
                </div>
            </header>

            {/* MENÚ MÓVIL DESPLEGABLE */}
            <nav className={`fixed bg-color3/98 backdrop-blur-xl w-full h-[calc(100vh-56px)] top-[56px] g-transition ${openMenu ? 'left-0' : 'left-[-100%]'} z-40 w-content py-6 flex items-start gap-3 flex-col lg:hidden overflow-y-auto border-t border-color8/20 shadow-2xl`} data-testid="nav-mobile">
                <NavItemsInitial mobileSize={true} />
            </nav>

            <NoSSR openMenu={openMenu} />
        </>
    )
}
