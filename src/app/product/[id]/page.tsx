import Product from '@/components/page/Product';

export default async function UserPage({ params }: {params: Promise<{ id: string }>}) {
    const { id } = await params;

    return <Product idService={id} />
}
