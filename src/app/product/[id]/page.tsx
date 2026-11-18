import Product from '@/components/page/Product';

export default async function ProductPage({ params }: {params: Promise<{ id: string }>}) {
    const { id } = await params;

    return <Product idProduct={id} />
}
