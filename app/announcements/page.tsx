import { Navbar } from '../components/Navbar';
import Link from 'next/link';


export default function AnnouncementsPage() {
    return (
        <div>
            <Navbar />
            <section className="mx-auto max-w-6xl px-6 py-12">
                <h2 className="mb-6 text-3xl font-bold">ประกาศ</h2>


                <div className="grid gap-6 md:grid-cols-2">
                    <Link
                        href="/announcements/news"
                        className="rounded-lg border p-6 shadow hover:bg-blue-50"
                    >
                        <h3 className="text-xl font-semibold">ข่าวสาร / ประชาสัมพันธ์</h3>
                        <p className="mt-2 text-gray-600">
                            ข่าวกิจกรรม ข่าวประชาสัมพันธ์ของโรงพยาบาล
                        </p>
                    </Link>


                    <Link
                        href="/announcements/procurement"
                        className="rounded-lg border p-6 shadow hover:bg-blue-50"
                    >
                        <h3 className="text-xl font-semibold">จัดซื้อจัดจ้าง</h3>
                        <p className="mt-2 text-gray-600">
                            ประกาศจัดซื้อจัดจ้าง TOR และผลการจัดซื้อ
                        </p>
                    </Link>
                </div>
            </section>
        </div>
    );
}