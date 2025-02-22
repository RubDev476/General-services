import Link from 'next/link';
import Image from "next/image";

export default function Home() {
    return (
        <>
            <main className={'bg-main relative action-ui'}>
                <div className={"bg-main-2 w-full h-full absolute top-0"}></div>
                <div className={"w-content text-center py-20 lg:py-24 relative z-[39] sm:text-xl lg:text-2xl"}>
                    <div className={'m-auto max-w-3xl'}>
                        <p className={'text-color6 tracking-[3px] font-medium mb-5'}>SERVICIOS GENERALES</p>
                        
                        <h1 className={'text-color3 text-3xl sm:text-5xl lg:text-6xl font-extrabold leading-none mb-12'}>Multiples servicios en un solo lugar, para todo tipo de trabajo.</h1>
                        
                        <p className={"text-color3 font-normal mb-9"}>Si eres proveedor o profesional, crea un servicio para que miles de clientes puedan encontrarte.</p>
                        
                        <Link href={'/'} className={'btn-2'}>Comenzar</Link>
                    </div>
                </div>
            </main>
        
            <section>
                <div className={"w-content text-center py-16"}>
                    <div className={"m-auto max-w-4xl"}>
                        <h2 className={"text-color1 text-3xl sm:text-5xl font-bold mb-7 lg:mb-12"}>¿Que <br/><span className={"title-section text-4xl sm:text-5xl lg:text-7xl"}>servicio</span><br/> te gustaria ofrecer?</h2>
                        
                        <p className={"text-color2 text-2xl font-light sm:text-3xl"}>Puedes ofrecer cualquier tipo de servicio, ya sea de tu microempresa, negocio, emprendimiento o freelancer.</p>
                    </div>
                </div>
            </section>
            
            <section className={""}>
                <div className={"w-content relative"}>
                    <div className={'absolute all-center left-0 bottom-0 z-10 text-center box-border w-full m-auto gradient-grid h-[15vh] md:h-[35vh]'}>
                        <Link href={'/'} className={'btn-2 shadow-[0px_20px_40px_0px_rgba(28,9,80,0.35)] md:text-xl'}>Ver todos los servicios</Link>
                    </div>
                    
                    <div className={"grid grid-cols-3 grid-rows-3 gap-2 lg:gap-5"}>
                        <div className={"bg-color4 text-center relative h-[15vw] max-h-52 rounded-md"}>
                            <Image src={"/service.webp"} alt={"img-service"} fill={true} className={"rounded-lg object-cover"} />
                        </div>
                        <div className={"bg-color4 text-center relative img-g rounded-md"}>
                            <Image src={"/service.webp"} alt={"img-service"} fill={true} className={"relative rounded-lg object-cover"} />
                        </div>
                        <div className={"bg-color4 text-center relative img-g rounded-md"}>
                            <Image src={"/service.webp"} alt={"img-service"} fill={true} className={"relative rounded-lg object-cover"} />
                        </div>
                        <div className={"bg-color4 text-center relative img-g rounded-md"}>
                            <Image src={"/service.webp"} alt={"img-service"} fill={true} className={"relative rounded-lg object-cover"} />
                        </div>
                        <div className={"bg-color4 text-center relative img-g rounded-md"}>
                            <Image src={"/service.webp"} alt={"img-service"} fill={true} className={"relative rounded-lg object-cover"} />
                        </div>
                        <div className={"bg-color4 text-center relative img-g rounded-md"}>
                            <Image src={"/service.webp"} alt={"img-service"} fill={true} className={"relative rounded-lg object-cover"} />
                        </div>
                        <div className={"bg-color4 text-center relative img-g rounded-md"}>
                            <Image src={"/service.webp"} alt={"img-service"} fill={true} className={"relative rounded-lg object-cover"} />
                        </div>
                        <div className={"bg-color4 text-center relative img-g rounded-md"}>
                            <Image src={"/service.webp"} alt={"img-service"} fill={true} className={"relative rounded-lg object-cover"} />
                        </div>
                        <div className={"bg-color4 text-center relative img-g rounded-md"}>
                            <Image src={"/service.webp"} alt={"img-service"} fill={true} className={"relative rounded-lg object-cover"} />
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
