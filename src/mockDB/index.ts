import { AvailabilityProduct, CategoriesProduct, Roles, UserType } from "@/types/forms";

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

export const MOCK_PRODUCTS = [
    {
        id_productos: 1,
        nombre: 'NVIDIA GeForce RTX 4070 Ti Super 16GB ASUS TUF',
        descripcion: 'Tarjeta gráfica en estado impecable con 4 meses de uso moderado para gaming 1440p. Nunca usada para minería. Temperaturas excelentes, pasta térmica de fábrica en perfecto estado. Incluye caja original, manuales, soporte anti-sag y garantía vigente.',
        precio: 749,
        ubicacion: 'Ciudad de México, Benito Juárez',
        imagen: 'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?auto=format&fit=crop&w=800&q=80',
        tipos_producto: {
            id_tipos_producto: 1,
            tipo: CategoriesProduct.TARJETAS_GRAFICAS
        },
        disponibilidad_producto: {
            id_disponibilidad_producto: 1,
            estado: AvailabilityProduct.DISPONIBLE
        },
        usuarios_proveedores: MOCK_USERS[0]
    },
    {
        id_productos: 2,
        nombre: 'Torre Gamer Completa: Ryzen 7 7800X3D + 32GB DDR5 + RTX 4080',
        descripcion: 'Ensamble custom de alto rendimiento. Procesador AMD Ryzen 7 7800X3D, enfriamiento líquido Lian Li 360mm, 32GB RAM Corsair Vengeance 6000MHz RGB, SSD NVMe Samsung 990 Pro 2TB, fuente Corsair 850W 80+ Gold. Gabinete NZXT H9 Flow con 10 ventiladores ARGB. Listo para jugar a 4K en ultra.',
        precio: 1850,
        ubicacion: 'Guadalajara, Zapopan',
        imagen: 'https://images.unsplash.com/photo-1587202372634-32705e3bf49c?auto=format&fit=crop&w=800&q=80',
        tipos_producto: {
            id_tipos_producto: 3,
            tipo: CategoriesProduct.PCS_GAMING_COMPLETAS
        },
        disponibilidad_producto: {
            id_disponibilidad_producto: 1,
            estado: AvailabilityProduct.DISPONIBLE
        },
        usuarios_proveedores: MOCK_USERS[1]
    },
    {
        id_productos: 3,
        nombre: 'Monitor Gaming OLED 27" LG UltraGear 240Hz 0.03ms QHD',
        descripcion: 'Panel OLED con negros puros y respuesta instantánea de 0.03ms. Resolución 2560x1440, compatible con G-Sync y FreeSync Premium Pro. Excelente para shooters competitivos (Valorant, CS2, Warzone). Sin píxeles muertos ni retención de imagen. Incluye caja y cable DisplayPort original.',
        precio: 580,
        ubicacion: 'Monterrey, San Pedro',
        imagen: 'https://images.unsplash.com/photo-1526738549149-8e07eca6c147?auto=format&fit=crop&w=800&q=80',
        tipos_producto: {
            id_tipos_producto: 4,
            tipo: CategoriesProduct.MONITORES_Y_PANTALLAS
        },
        disponibilidad_producto: {
            id_disponibilidad_producto: 1,
            estado: AvailabilityProduct.DISPONIBLE
        },
        usuarios_proveedores: MOCK_USERS[2]
    },
    {
        id_productos: 4,
        nombre: 'Teclado Mecánico Custom GMMK Pro 75% + Switches Banana Split',
        descripcion: 'Teclado de aluminio mecanizado anodizado en negro. Placa de policarbonato, estabilizadores Durock V2 lubricados con Krytox 205g0. Keycaps PBT perfil Cherry doble inyección y perilla de volumen de metal. Conexión USB-C con cable aviador trenzado incluido.',
        precio: 165,
        ubicacion: 'Ciudad de México, Coyoacán',
        imagen: 'https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?auto=format&fit=crop&w=800&q=80',
        tipos_producto: {
            id_tipos_producto: 5,
            tipo: CategoriesProduct.PERIFERICOS_Y_ACCESORIOS
        },
        disponibilidad_producto: {
            id_disponibilidad_producto: 1,
            estado: AvailabilityProduct.DISPONIBLE
        },
        usuarios_proveedores: MOCK_USERS[3]
    },
    {
        id_productos: 5,
        nombre: 'PlayStation 5 Slim 1TB + 2 Controles DualSense + Juegos Físicos',
        descripcion: 'Consola PS5 Slim versión con lector de discos en excelente estado cosmético y operativo. Se entrega con 2 controles DualSense (blanco y negro medianoche), base vertical, cables HDMI 2.1 y de alimentación, más 2 juegos físicos (Spider-Man 2 y God of War Ragnarök). Factura y caja original.',
        precio: 460,
        ubicacion: 'Querétaro, Juriquilla',
        imagen: 'https://images.unsplash.com/photo-1606813907291-d86efa9b94db?auto=format&fit=crop&w=800&q=80',
        tipos_producto: {
            id_tipos_producto: 6,
            tipo: CategoriesProduct.CONSOLAS_Y_VIDEOJUEGOS
        },
        disponibilidad_producto: {
            id_disponibilidad_producto: 1,
            estado: AvailabilityProduct.DISPONIBLE
        },
        usuarios_proveedores: MOCK_USERS[4]
    },
    {
        id_productos: 6,
        nombre: 'AMD Radeon RX 7900 XTX 24GB Sapphire Nitro+ Vapor-X',
        descripcion: 'Tope de gama de AMD con 24GB VRAM GDDR6. Cámara de vapor integrada, disipador triple fan con iluminación ARGB continua. Rinde a la par de la RTX 4080 Super en rasterizado puro. Solo 3 meses de uso para edición de video y render 3D. Se entrega con soporte y caja original.',
        precio: 890,
        ubicacion: 'Ciudad de México, Miguel Hidalgo',
        imagen: 'https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?auto=format&fit=crop&w=800&q=80',
        tipos_producto: {
            id_tipos_producto: 1,
            tipo: CategoriesProduct.TARJETAS_GRAFICAS
        },
        disponibilidad_producto: {
            id_disponibilidad_producto: 1,
            estado: AvailabilityProduct.DISPONIBLE
        },
        usuarios_proveedores: MOCK_USERS[0]
    },
    {
        id_productos: 7,
        nombre: 'Procesador Intel Core i7-14700K 20 Núcleos 28 Hilos hasta 5.6GHz',
        descripcion: 'Procesador LGA1700 ideal para gaming competitivo y creación de contenido pesada. 8 P-Cores y 12 E-Cores. Nunca se le hizo delid ni overclock extremo, siempre refrigerado con AIO de 360mm por debajo de 68 grados. Pines de socket impecables, se entrega con caja.',
        precio: 340,
        ubicacion: 'Guadalajara, Providencia',
        imagen: 'https://images.unsplash.com/photo-1555680202-c86f0e12f086?auto=format&fit=crop&w=800&q=80',
        tipos_producto: {
            id_tipos_producto: 2,
            tipo: CategoriesProduct.PROCESADORES_Y_CPUS
        },
        disponibilidad_producto: {
            id_disponibilidad_producto: 1,
            estado: AvailabilityProduct.DISPONIBLE
        },
        usuarios_proveedores: MOCK_USERS[1]
    },
    {
        id_productos: 8,
        nombre: 'Monitor Curvo Ultrawide 34" Samsung Odyssey OLED G8 175Hz',
        descripcion: 'Pantalla curva 1800R con resolución UWQHD (3440 x 1440). Procesador Neo Quantum para colores vibrantes y negros absolutos con tiempo de respuesta de 0.03ms. Incluye control remoto Smart TV integrado, cable micro-HDMI y base de aluminio original.',
        precio: 799,
        ubicacion: 'Monterrey, Valle Oriente',
        imagen: 'https://images.unsplash.com/photo-1547119957-637f8679db1e?auto=format&fit=crop&w=800&q=80',
        tipos_producto: {
            id_tipos_producto: 4,
            tipo: CategoriesProduct.MONITORES_Y_PANTALLAS
        },
        disponibilidad_producto: {
            id_disponibilidad_producto: 1,
            estado: AvailabilityProduct.DISPONIBLE
        },
        usuarios_proveedores: MOCK_USERS[2]
    },
    {
        id_productos: 9,
        nombre: 'Mouse Gaming Wireless Logitech G Pro X Superlight 2 Lightspeed',
        descripcion: 'Mouse profesional de esports con peso pluma de solo 60 gramos. Sensor HERO 2 con 32,000 DPI y switches óptico-mecánicos híbridos Lightforce. Duración de batería de hasta 95 horas continuas. Skates de PTFE cambiados por unos Tiger Ice v2 para deslizamiento superior.',
        precio: 115,
        ubicacion: 'Ciudad de México, Tlalpan',
        imagen: 'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?auto=format&fit=crop&w=800&q=80',
        tipos_producto: {
            id_tipos_producto: 5,
            tipo: CategoriesProduct.PERIFERICOS_Y_ACCESORIOS
        },
        disponibilidad_producto: {
            id_disponibilidad_producto: 1,
            estado: AvailabilityProduct.DISPONIBLE
        },
        usuarios_proveedores: MOCK_USERS[3]
    },
    {
        id_productos: 10,
        nombre: 'Nintendo Switch OLED Edición Especial Zelda Tears of the Kingdom',
        descripcion: 'Consola edición de colección con diseño dorado hyliano en dock y Joy-Cons temáticos. Pantalla OLED de 7 pulgadas con mica de cristal templado instalada desde el primer día. Incluye cargador original, dock con puerto LAN y estuche rígido de viaje.',
        precio: 310,
        ubicacion: 'Querétaro, Centro',
        imagen: 'https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?auto=format&fit=crop&w=800&q=80',
        tipos_producto: {
            id_tipos_producto: 6,
            tipo: CategoriesProduct.CONSOLAS_Y_VIDEOJUEGOS
        },
        disponibilidad_producto: {
            id_disponibilidad_producto: 1,
            estado: AvailabilityProduct.DISPONIBLE
        },
        usuarios_proveedores: MOCK_USERS[4]
    },
    {
        id_productos: 11,
        nombre: 'Kit Memoria RAM Corsair Dominator Titanium DDR5 64GB (2x32GB) 6000MHz',
        descripcion: 'Módulos de alta gama en color blanco mate con barras superiores intercambiables e iluminación ARGB individualmente direccionable. Perfil XMP 3.0 / EXPO con latencias CL30 optimizadas para procesadores Ryzen 7000/9000 e Intel 14va gen.',
        precio: 220,
        ubicacion: 'Ciudad de México, Cuauhtémoc',
        imagen: 'https://images.unsplash.com/photo-1562976540-1502c2145186?auto=format&fit=crop&w=800&q=80',
        tipos_producto: {
            id_tipos_producto: 7,
            tipo: CategoriesProduct.COMPONENTES_Y_ALMACENAMIENTO
        },
        disponibilidad_producto: {
            id_disponibilidad_producto: 1,
            estado: AvailabilityProduct.DISPONIBLE
        },
        usuarios_proveedores: MOCK_USERS[0]
    },
    {
        id_productos: 12,
        nombre: 'Mini PC Gamer SFF: Ryzen 5 7600X + RTX 4060 Ti 16GB en Gabinete ITX',
        descripcion: 'Ensamble ultra compacto de solo 11 litros de volumen (Gabinete Fractal Terra Jade). Placa base B650I AORUS Ultra, 32GB DDR5, disipador Noctua NH-L9a, fuente SFX Corsair SF750 Platinum. Máxima portabilidad para llevar a torneos o colocar discretamente en tu escritorio.',
        precio: 980,
        ubicacion: 'Guadalajara, Chapultepec',
        imagen: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=800&q=80',
        tipos_producto: {
            id_tipos_producto: 3,
            tipo: CategoriesProduct.PCS_GAMING_COMPLETAS
        },
        disponibilidad_producto: {
            id_disponibilidad_producto: 1,
            estado: AvailabilityProduct.DISPONIBLE
        },
        usuarios_proveedores: MOCK_USERS[1]
    },
    {
        id_productos: 13,
        nombre: 'Auriculares Inalámbricos SteelSeries Arctis Nova Pro Wireless',
        descripcion: 'Audio espacial 360 con cancelación activa de ruido (ANC). Sistema dual de batería intercambiable para juego ininterrumpido. Estación base OLED para ecualización en tiempo real y conexión simultánea a PC y consola por Bluetooth y 2.4GHz.',
        precio: 240,
        ubicacion: 'Monterrey, Cumbres',
        imagen: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=800&q=80',
        tipos_producto: {
            id_tipos_producto: 5,
            tipo: CategoriesProduct.PERIFERICOS_Y_ACCESORIOS
        },
        disponibilidad_producto: {
            id_disponibilidad_producto: 1,
            estado: AvailabilityProduct.DISPONIBLE
        },
        usuarios_proveedores: MOCK_USERS[2]
    },
    {
        id_productos: 14,
        nombre: 'Gabinete Gamer Lian Li O11 Dynamic EVO RGB Blanco + 9 Fans ARGB',
        descripcion: 'Chasis de doble cámara con paneles de cristal templado sin pilares frontales para vista panorámica. Tiras RGB duales difusas. Se entrega con kit de 9 ventiladores Lian Li UNI FAN SL-Infinity 120mm con controlador de efectos L-Connect.',
        precio: 175,
        ubicacion: 'Ciudad de México, Polanco',
        imagen: 'https://images.unsplash.com/photo-1587202372634-32705e3bf49c?auto=format&fit=crop&w=800&q=80',
        tipos_producto: {
            id_tipos_producto: 7,
            tipo: CategoriesProduct.COMPONENTES_Y_ALMACENAMIENTO
        },
        disponibilidad_producto: {
            id_disponibilidad_producto: 1,
            estado: AvailabilityProduct.DISPONIBLE
        },
        usuarios_proveedores: MOCK_USERS[3]
    },
    {
        id_productos: 15,
        nombre: 'Consola Portátil Steam Deck OLED 1TB + Dock Oficial 4K + Estuche',
        descripcion: 'Pantalla OLED HDR de 7.4 pulgadas a 90Hz con colores espectaculares. Almacenamiento NVMe de 1TB de alta velocidad y cristal grabado antirreflejos. Incluye estación de acoplamiento Steam Deck Docking Station oficial con salida HDMI 2.0 y DisplayPort.',
        precio: 520,
        ubicacion: 'Querétaro, El Campanario',
        imagen: 'https://images.unsplash.com/photo-1592840496694-26d035b52b48?auto=format&fit=crop&w=800&q=80',
        tipos_producto: {
            id_tipos_producto: 6,
            tipo: CategoriesProduct.CONSOLAS_Y_VIDEOJUEGOS
        },
        disponibilidad_producto: {
            id_disponibilidad_producto: 1,
            estado: AvailabilityProduct.DISPONIBLE
        },
        usuarios_proveedores: MOCK_USERS[4]
    }
];
