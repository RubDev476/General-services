import User from "@/components/page/User";

export default async function UserPage({ params }: {params: Promise<{ id: string }>}) {
    const { id } = await params;

    return <User userId={id} />;
}
