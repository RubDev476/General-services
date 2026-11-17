import { AvailabilityService, CategoriesService, Roles, UserType } from "@/types/forms";

export const MOCK_USERS = [
    {
        id_usuarios: 1,
        nombre: 'Nexus Tech Hardware',
        correo: 'contacto@nexustech.io',
        telefono: '+52 55 4912 8841',
        imagen: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80",
        tipo_usuario: {
            id_tipos_usuarios: 1,
            tipo: UserType.empresa
        },
        roles: [
            {
                id_roles: 2,
                tipo: Roles.proveedor
            }
        ]
    },
    {
        id_usuarios: 2,
        nombre: 'Alejandro PC Builder',
        correo: 'alex.modder@gmail.com',
        telefono: '+52 33 1290 4455',
        imagen: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80",
        tipo_usuario: {
            id_tipos_usuarios: 2,
            tipo: UserType.particular
        },
        roles: [
            {
                id_roles: 2,
                tipo: Roles.proveedor
            }
        ]
    },
    {
        id_usuarios: 3,
        nombre: 'Pixel Gear Store',
        correo: 'soporte@pixelgear.shop',
        telefono: '+52 81 8345 7712',
        imagen: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80",
        tipo_usuario: {
            id_tipos_usuarios: 1,
            tipo: UserType.empresa
        },
        roles: [
            {
                id_roles: 2,
                tipo: Roles.proveedor
            }
        ]
    },
    {
        id_usuarios: 4,
        nombre: 'David Hardware & Custom',
        correo: 'david.gamer@outlook.com',
        telefono: '+52 55 6734 9918',
        imagen: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=300&q=80",
        tipo_usuario: {
            id_tipos_usuarios: 2,
            tipo: UserType.particular
        },
        roles: [
            {
                id_roles: 2,
                tipo: Roles.proveedor
            }
        ]
    },
    {
        id_usuarios: 5,
        nombre: 'Retro & Next-Gen Zone',
        correo: 'ventas@retrozone.mx',
        telefono: '+52 44 2198 3340',
        imagen: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=300&q=80",
        tipo_usuario: {
            id_tipos_usuarios: 1,
            tipo: UserType.empresa
        },
        roles: [
            {
                id_roles: 2,
                tipo: Roles.proveedor
            }
        ]
    }
];

export const MOCK_SERVICES = [
    {
        id_servicios: 1,
        nombre: 'NVIDIA GeForce RTX 4070 Ti Super 16GB ASUS TUF',
        descripcion: 'Tarjeta gráfica en estado impecable con 4 meses de uso moderado para gaming 1440p. Nunca usada para minería. Temperaturas excelentes, pasta térmica de fábrica en perfecto estado. Incluye caja original, manuales, soporte anti-sag y garantía vigente.',
        precio: 749,
        ubicacion: 'Ciudad de México, Benito Juárez',
        imagen: 'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?auto=format&fit=crop&w=800&q=80',
        tipos_servicio: {
            id_tipos_servicio: 1,
            tipo: CategoriesService.TARJETAS_GRAFICAS
        },
        disponibilidad_servicio: {
            id_disponibilidad_servicio: 1,
            estado: AvailabilityService.DISPONIBLE
        },
        usuarios_proveedores: MOCK_USERS[0]
    },
    {
        id_servicios: 2,
        nombre: 'Torre Gamer Completa: Ryzen 7 7800X3D + 32GB DDR5 + RTX 4080',
        descripcion: 'Ensamble custom de alto rendimiento. Procesador AMD Ryzen 7 7800X3D, enfriamiento líquido Lian Li 360mm, 32GB RAM Corsair Vengeance 6000MHz RGB, SSD NVMe Samsung 990 Pro 2TB, fuente Corsair 850W 80+ Gold. Gabinete NZXT H9 Flow con 10 ventiladores ARGB. Listo para jugar a 4K en ultra.',
        precio: 1850,
        ubicacion: 'Guadalajara, Zapopan',
        imagen: 'https://images.unsplash.com/photo-1587202372634-32705e3bf49c?auto=format&fit=crop&w=800&q=80',
        tipos_servicio: {
            id_tipos_servicio: 3,
            tipo: CategoriesService.PCS_GAMING_COMPLETAS
        },
        disponibilidad_servicio: {
            id_disponibilidad_servicio: 1,
            estado: AvailabilityService.DISPONIBLE
        },
        usuarios_proveedores: MOCK_USERS[1]
    },
    {
        id_servicios: 3,
        nombre: 'Monitor Gaming OLED 27" LG UltraGear 240Hz 0.03ms QHD',
        descripcion: 'Panel OLED con negros puros y respuesta instantánea de 0.03ms. Resolución 2560x1440, compatible con G-Sync y FreeSync Premium Pro. Excelente para shooters competitivos (Valorant, CS2, Warzone). Sin píxeles muertos ni retención de imagen. Incluye caja y cable DisplayPort original.',
        precio: 580,
        ubicacion: 'Monterrey, San Pedro',
        imagen: 'https://images.unsplash.com/photo-1526738549149-8e07eca6c147?auto=format&fit=crop&w=800&q=80',
        tipos_servicio: {
            id_tipos_servicio: 4,
            tipo: CategoriesService.MONITORES_Y_PANTALLAS
        },
        disponibilidad_servicio: {
            id_disponibilidad_servicio: 1,
            estado: AvailabilityService.DISPONIBLE
        },
        usuarios_proveedores: MOCK_USERS[2]
    },
    {
        id_servicios: 4,
        nombre: 'Teclado Mecánico Custom GMMK Pro 75% + Switches Banana Split',
        descripcion: 'Teclado de aluminio mecanizado anodizado en negro. Placa de policarbonato, estabilizadores Durock V2 lubricados con Krytox 205g0. Keycaps PBT perfil Cherry doble inyección y perilla de volumen de metal. Conexión USB-C con cable aviador trenzado incluido.',
        precio: 165,
        ubicacion: 'Ciudad de México, Coyoacán',
        imagen: 'https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?auto=format&fit=crop&w=800&q=80',
        tipos_servicio: {
            id_tipos_servicio: 5,
            tipo: CategoriesService.PERIFERICOS_Y_ACCESORIOS
        },
        disponibilidad_servicio: {
            id_disponibilidad_servicio: 1,
            estado: AvailabilityService.DISPONIBLE
        },
        usuarios_proveedores: MOCK_USERS[3]
    },
    {
        id_servicios: 5,
        nombre: 'PlayStation 5 Slim 1TB + 2 Controles DualSense + Juegos Físicos',
        descripcion: 'Consola PS5 Slim versión con lector de discos en excelente estado cosmético y operativo. Se entrega con 2 controles DualSense (blanco y negro medianoche), base vertical, cables HDMI 2.1 y de alimentación, más 2 juegos físicos (Spider-Man 2 y God of War Ragnarök). Factura y caja original.',
        precio: 460,
        ubicacion: 'Querétaro, Juriquilla',
        imagen: 'https://images.unsplash.com/photo-1606813907291-d86efa9b94db?auto=format&fit=crop&w=800&q=80',
        tipos_servicio: {
            id_tipos_servicio: 6,
            tipo: CategoriesService.CONSOLAS_Y_VIDEOJUEGOS
        },
        disponibilidad_servicio: {
            id_disponibilidad_servicio: 1,
            estado: AvailabilityService.DISPONIBLE
        },
        usuarios_proveedores: MOCK_USERS[4]
    }
];
