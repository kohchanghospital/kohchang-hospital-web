import { Navbar } from '../components/Navbar';
import Link from 'next/link';


export default function AboutPage() {
    return (
        <div>
            <Navbar />


            <section className="mx-auto max-w-6xl px-6 py-12">
                <h2 className="mb-6 text-3xl font-bold">เกี่ยวกับเรา</h2>


                <ul className="space-y-4">
                    <li>
                        <Link href="/about/history" className="text-blue-600 underline">
                            ประวัติโรงพยาบาล
                        </Link>
                    </li>
                    <li>
                        <Link href="/about/vision" className="text-blue-600 underline">
                            วิสัยทัศน์ พันธกิจ ค่านิยม
                        </Link>
                    </li>
                    <li>
                        <Link href="/about/calendar" className="text-blue-600 underline">
                            ปฏิทินกิจกรรม
                        </Link>
                    </li>
                </ul>
            </section>
        </div>
    );
}