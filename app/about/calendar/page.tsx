import { Navbar } from '../../components/Navbar';


export default function CalendarPage() {
    return (
        <div>
            <Navbar />
            <section className="mx-auto max-w-4xl px-6 py-12">
                <h2 className="mb-4 text-2xl font-bold">ปฏิทินกิจกรรม</h2>
                <p className="text-gray-700">จะแสดงกิจกรรมต่าง ๆ ของโรงพยาบาล</p>
            </section>
        </div>
    );
}