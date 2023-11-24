import AdminNav from "@/app/components/navigation/adminNav";
import AdminTopNav from "@/app/components/navigation/adminTopNav";

export default function View ({ params }) {
    return (
        <>
            <AdminTopNav />
            <AdminNav />
            <main className="absolute w-full md:w-4/5 top-24 right-0 p-6">
                
            </main>
        </>
    )
}