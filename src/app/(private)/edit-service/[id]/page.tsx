import EditService from "@/components/page/EditService";

export default async function Page({ params }: {params: Promise<{ id: string }>}) {
    const { id } = await params;

    return <EditService id={id} />
}
