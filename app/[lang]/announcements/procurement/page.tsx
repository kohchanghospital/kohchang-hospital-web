import { Navbar } from '../../../components/Navbar';


export default function ProcurementPage() {
    return (
        <div>
            <Navbar />
            <section className="mx-auto max-w-6xl px-6 py-12">
                <h2 className="mb-6 text-3xl font-bold">จัดซื้อจัดจ้าง</h2>
                <div className="space-y-4">
                    <div className="rounded border p-4">ประกาศ TOR</div>
                    <div className="rounded border p-4">ผลการจัดซื้อจัดจ้าง</div>
                </div>
            </section>
        </div>
    );
}