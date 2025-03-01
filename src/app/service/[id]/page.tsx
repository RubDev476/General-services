import Service from '@/components/page/Service';

export default async function UserPage({ params }: {params: Promise<{ id: string }>}) {
    const { id } = await params;

    return <Service idService={id} />
}
