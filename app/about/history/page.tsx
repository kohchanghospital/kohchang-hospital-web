import { Navbar } from '../../components/Navbar';


export default function HistoryPage() {
    return (
        <div>
            <Navbar />
            <section className="mx-auto max-w-4xl px-6 py-12">
                <h2 className="mb-4 text-2xl font-bold">ประวัติโรงพยาบาล</h2>
                <p className="text-gray-700 leading-relaxed">
                    โรงพยาบาลเกาะช้างก่อตั้งขึ้นเพื่อให้บริการประชาชนในพื้นที่...
                </p>
            </section>
        </div>
    );
}