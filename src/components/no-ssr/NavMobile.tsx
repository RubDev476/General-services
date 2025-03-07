import { NavItemsInitial } from "../layout/Header"

export default function NavMobile({openMenu}: {openMenu: boolean}) {
    return (
        <nav className={`fixed bg-color3 w-full h-[calc(100vh-56px)] top-[56px] g-transition ${openMenu ? 'left-0' : 'left-[-100%]'} z-40 w-content py-7 flex items-start gap-4 flex-col text-lg font-bold lg:hidden overflow-y-auto`}>
            <NavItemsInitial mobileSize={true} />
        </nav>
    )
}