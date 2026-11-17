import Link from 'next/link';
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMicrochip, faDesktop, faTv, faGamepad, faKeyboard, faHardDrive, faShieldHalved, faHandshake, faBolt } from "@fortawesome/free-solid-svg-icons";

const MainImages = [
    "https://images.unsplash.com/photo-1587202372775-e229f172b9d7?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1587202372634-32705e3bf49c?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1526738549149-8e07eca6c147?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1606813907291-d86efa9b94db?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=600&q=80"
];

const QuickCategories = [
    { name: "Tarjetas Gráficas", icon: faMicrochip, tag: "GPUs RTX & Radeon" },
    { name: "PCs Completas", icon: faDesktop, tag: "Torres Armadas" },
    { name: "Monitores", icon: faTv, tag: "144Hz & 240Hz OLED" },
    { name: "Periféricos", icon: faKeyboard, tag: "Teclados & Mouse" },
    { name: "Consolas", icon: faGamepad, tag: "PS5, Xbox & Switch" },
    { name: "Componentes", icon: faHardDrive, tag: "RAM, SSD & Fuentes" },
];

export default function Home() {
    return (
        <>
            {/* HERO SECTION */}
            <main className={'bg-main bg-color1 relative action-ui overflow-hidden'}>
                <div className={"bg-main-2 w-full h-full absolute top-0"}></div>
                
                {/* Glow decorativo de fondo */}
                <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-color4/20 blur-[120px] rounded-full pointer-events-none"></div>

                <div className={"w-content text-center py-20 lg:py-28 relative z-[39]"}>
                    <div className={'m-auto max-w-4xl'}>
                        {/* Chip de nicho */}
                        <div className="inline-flex items-center gap-2 bg-color3/10 backdrop-blur-md px-4 py-1.5 rounded-full border border-color3/20 mb-6 shadow-sm">
                            <span className="w-2 h-2 rounded-full bg-color7 animate-pulse"></span>
                            <span className={'text-color7 tracking-[2px] font-bold text-xs uppercase'}>
                                G-SERVICES • HARDWARE & GAMING MARKETPLACE
                            </span>
                        </div>
                        
                        <h1 className={'text-color3 text-3xl sm:text-5xl lg:text-6xl font-extrabold leading-tight mb-8 drop-shadow-sm'}>
                            Compra, vende y actualiza tu <span className="text-transparent bg-clip-text bg-gradient-to-r from-color7 via-color3 to-color6">setup gamer</span>.
                        </h1>
                        
                        <p className={"text-color8 font-normal text-base sm:text-xl lg:text-2xl mb-10 max-w-2xl mx-auto leading-relaxed"}>
                            Encuentra tarjetas gráficas, procesadores, PCs armadas y periféricos nuevos o seminuevos con trato directo y seguro entre usuarios y tiendas.
                        </p>
                        
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                            <Link href={'/create-service'} className={'btn-2 text-base sm:text-lg py-3 px-8 shadow-lg'}>
                                Comenzar a vender
                            </Link>
                            <Link href={'/services'} className={'btn-1 text-base sm:text-lg py-3 px-8 shadow-lg'}>
                                Explorar artículos
                            </Link>
                        </div>

                        {/* Badges de confianza */}
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-16 pt-10 border-t border-color3/10 text-left">
                            <div className="flex items-center gap-3 bg-color3/5 p-4 rounded-xl border border-color3/10">
                                <div className="w-10 h-10 rounded-lg bg-color7/20 all-center text-color7 text-lg">
                                    <FontAwesomeIcon icon={faBolt} />
                                </div>
                                <div>
                                    <h4 className="text-color3 font-bold text-sm">100% Gaming & Tech</h4>
                                    <p className="text-color8 text-xs">Especializado en componentes de PC</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-3 bg-color3/5 p-4 rounded-xl border border-color3/10">
                                <div className="w-10 h-10 rounded-lg bg-color6/20 all-center text-color6 text-lg">
                                    <FontAwesomeIcon icon={faHandshake} />
                                </div>
                                <div>
                                    <h4 className="text-color3 font-bold text-sm">Trato Directo</h4>
                                    <p className="text-color8 text-xs">Contacta sin intermediarios</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-3 bg-color3/5 p-4 rounded-xl border border-color3/10">
                                <div className="w-10 h-10 rounded-lg bg-color4/20 all-center text-color4 text-lg">
                                    <FontAwesomeIcon icon={faShieldHalved} />
                                </div>
                                <div>
                                    <h4 className="text-color3 font-bold text-sm">Nuevos y Seminuevos</h4>
                                    <p className="text-color8 text-xs">Comunidad y tiendas verificadas</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            {/* SECCIÓN DE CATEGORÍAS RÁPIDAS */}
            <section className="py-14 bg-color9">
                <div className="w-content">
                    <div className="text-center mb-10">
                        <span className="text-xs font-bold uppercase tracking-widest text-color5 bg-color5/10 px-3 py-1 rounded-full">
                            Explorar por categoría
                        </span>
                        <h3 className="text-color2 text-2xl sm:text-4xl font-extrabold mt-2">
                            Todo lo que necesitas para tu setup
                        </h3>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                        {QuickCategories.map((cat, idx) => (
                            <Link
                                key={idx}
                                href="/services"
                                className="bg-color3 p-4 rounded-xl border border-color8/20 hover:border-color5 hover:shadow-lg g-transition flex flex-col items-center text-center group"
                            >
                                <div className="w-12 h-12 rounded-xl bg-color9 group-hover:bg-color5 text-color5 group-hover:text-color3 all-center text-xl mb-3 g-transition">
                                    <FontAwesomeIcon icon={cat.icon} />
                                </div>
                                <h4 className="font-bold text-color2 text-sm group-hover:text-color5 g-transition">
                                    {cat.name}
                                </h4>
                                <span className="text-[11px] text-color10 mt-1">
                                    {cat.tag}
                                </span>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>
        
            {/* SECCIÓN CTA PARA VENDEDORES */}
            <section className="py-16 bg-color3">
                <div className={"w-content text-center"}>
                    <div className={"m-auto max-w-4xl"}>
                        <h2 className={"text-color1 text-3xl sm:text-5xl font-bold mb-6 lg:mb-8"}>
                            ¿Tienes hardware que <br/>
                            <span className={"title-section text-4xl sm:text-5xl lg:text-7xl"}>quieres vender?</span>
                        </h2>
                        
                        <p className={"text-color2 text-xl font-light sm:text-2xl max-w-2xl mx-auto mb-8"}>
                            Publica gratis tu tarjeta gráfica, procesador o consola usada y conecta con gamers listos para comprar en tu zona.
                        </p>

                        <Link href={'/create-service'} className={'btn-2 inline-block text-base sm:text-lg py-3 px-10'}>
                            Publicar un artículo ahora
                        </Link>
                    </div>
                </div>
            </section>
            
            {/* GRID DE GALERÍA Y ACCESO A TODOS LOS ARTÍCULOS */}
            <section className="py-12 bg-color9">
                <div className={"w-content relative"}>
                    <div className="text-center mb-8">
                        <h3 className="text-color2 text-2xl sm:text-3xl font-bold">Últimas publicaciones y setups</h3>
                        <p className="text-color10 text-sm mt-1">Explora artículos publicados recientemente por la comunidad</p>
                    </div>

                    <div className={'absolute all-center left-0 bottom-0 z-10 text-center box-border w-full m-auto gradient-grid h-[20vh] md:h-[35vh]'}>
                        <Link href={'/services'} className={'btn-2 shadow-[0px_20px_40px_0px_rgba(28,9,80,0.35)] md:text-xl'}>
                            Ver todos los servicios
                        </Link>
                    </div>
                    
                    <div className={"grid grid-cols-3 grid-rows-3 gap-2 lg:gap-5"}>
                        {MainImages.map((img, index) => (
                            <div key={index} className={"text-center shadow-card relative h-[15vw] max-h-52 rounded-md overflow-hidden group bg-color1"}>
                                <Image
                                    src={img}
                                    alt={"img-hardware-gaming"}
                                    priority
                                    fill
                                    sizes={"70vw"}
                                    className={"rounded-lg object-cover group-hover:scale-110 transition-transform duration-500"}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
}
