import { AvailabilityService, CategoriesService, Roles, UserType } from "@/types/forms";

export const MOCK_USERS = [
    {
        id_usuarios: 1,
        nombre: 'Somewhere Sport Bar',
        correo: 'user@user.com',
        telefono: '769696996',
        imagen: "https://res.cloudinary.com/dkav9fvlo/image/upload/v1738363930/Cocktail-categories-api/s4nuknxwnlv6rjptqrne.avif",
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
        id_usuarios: 2,
        nombre: 'Fabrica de vasos',
        correo: 'user@user.com',
        telefono: '769696996',
        imagen: "https://res.cloudinary.com/dkav9fvlo/image/upload/v1736274200/Starbucks-API/Sub%20categories/merchandise/mugs/hpiijfoa7qxd1bkjcn4i.avif",
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
        nombre: 'Dark Studios',
        correo: 'user@user.com',
        telefono: '769696996',
        imagen: "https://res.cloudinary.com/dkav9fvlo/image/upload/v1721401674/eusyvpeq3yx6go664smv.jpg",
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
        id_usuarios: 4,
        nombre: 'Venta de coches usados',
        correo: 'user@user.com',
        telefono: '769696996',
        imagen: "https://res.cloudinary.com/dkav9fvlo/image/upload/v1725550384/Venta%20de%20autos%20-%20Proyecto/wntwdb8takltr48cxyzk.jpg",
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
        nombre: 'Tocinos burgers',
        correo: 'user@user.com',
        telefono: '769696996',
        imagen: "https://res.cloudinary.com/dkav9fvlo/image/upload/v1735322742/Starbucks-API/products/food/hot%20breakfast/breakfast%20sandwich%20and%20wraps/vekvm6wywutth1ihkgmk.avif",
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
    }
]

export const MOCK_SERVICES = [
    {
        descripcion: 'Los mejores cockteles y bebidas',
        disponibilidad_servicio: {
            estado: AvailabilityService.DISPONIBLE,
            id_disponibilidad_servicio: 1
        },
        id_servicios: 1,
        imagen: 'https://res.cloudinary.com/dkav9fvlo/image/upload/v1738363930/Cocktail-categories-api/s4nuknxwnlv6rjptqrne.avif',
        nombre: 'Sport bar',
        precio: 200,
        tipos_servicio: {
            id_tipos_servicio: 8,
            tipo: CategoriesService.OTROS
        },
        ubicacion: 'mexico',
        usuarios_proveedores: MOCK_USERS[0]
    },
    {
        descripcion: 'Vasos de platico',
        disponibilidad_servicio: {
            estado: AvailabilityService.DISPONIBLE,
            id_disponibilidad_servicio: 1
        },
        id_servicios: 2,
        imagen: 'https://res.cloudinary.com/dkav9fvlo/image/upload/v1736274200/Starbucks-API/Sub%20categories/merchandise/mugs/hpiijfoa7qxd1bkjcn4i.avif',
        nombre: 'Fabrica de vasos',
        precio: 88,
        tipos_servicio: {
            id_tipos_servicio: 8,
            tipo: CategoriesService.OTROS
        },
        ubicacion: 'mexico',
        usuarios_proveedores: MOCK_USERS[1]
    },
    {
        descripcion: 'Fotos y videos profesionales',
        disponibilidad_servicio: {
            estado: AvailabilityService.DISPONIBLE,
            id_disponibilidad_servicio: 1
        },
        id_servicios: 3,
        imagen: 'https://res.cloudinary.com/dkav9fvlo/image/upload/v1721401674/eusyvpeq3yx6go664smv.jpg',
        nombre: 'Dark studios',
        precio: 100,
        tipos_servicio: {
            id_tipos_servicio: 8,
            tipo: CategoriesService.OTROS
        },
        ubicacion: 'mexico',
        usuarios_proveedores: MOCK_USERS[2]
    },
    {
        descripcion: 'Venta de coches usados',
        disponibilidad_servicio: {
            estado: AvailabilityService.DISPONIBLE,
            id_disponibilidad_servicio: 1
        },
        id_servicios: 4,
        imagen: 'https://res.cloudinary.com/dkav9fvlo/image/upload/v1725550079/Venta%20de%20autos%20-%20Proyecto/x2jyxnus9zzv3cqroqew.webp',
        nombre: 'Venta de coches usados',
        precio: 100,
        tipos_servicio: {
            id_tipos_servicio: 8,
            tipo: CategoriesService.OTROS
        },
        ubicacion: 'mexico',
        usuarios_proveedores: MOCK_USERS[3]
    },
    {
        descripcion: 'Las mejores hamburguesas con tocino',
        disponibilidad_servicio: {
            estado: AvailabilityService.DISPONIBLE,
            id_disponibilidad_servicio: 1
        },
        id_servicios: 5,
        imagen: 'https://res.cloudinary.com/dkav9fvlo/image/upload/v1735322742/Starbucks-API/products/food/hot%20breakfast/breakfast%20sandwich%20and%20wraps/vekvm6wywutth1ihkgmk.avif',
        nombre: 'Tocinos burgers',
        precio: 140,
        tipos_servicio: {
            id_tipos_servicio: 8,
            tipo: CategoriesService.OTROS
        },
        ubicacion: 'mexico',
        usuarios_proveedores: MOCK_USERS[4]
    }
]
