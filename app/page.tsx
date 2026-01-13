import { Navbar } from './components/Navbar';


export default function HomePage() {
  return (
    <div>
      <Navbar />


      <header className="bg-blue-50 py-20 text-center">
        <h2 className="text-3xl font-bold text-blue-800">โรงพยาบาลเกาะช้าง</h2>
        <p className="mt-4 text-gray-600">ให้บริการด้วยหัวใจ ดูแลด้วยมาตรฐาน</p>
      </header>


      <section className="mx-auto max-w-6xl px-6 py-12">
        <h3 className="mb-6 text-2xl font-semibold">ข่าวสาร / ประกาศล่าสุด</h3>
        <div className="grid gap-6 md:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="rounded-lg border p-4 shadow-sm">
              <h4 className="font-semibold">ประกาศที่ {i}</h4>
              <p className="mt-2 text-sm text-gray-600">
                รายละเอียดประกาศโดยย่อ สามารถเชื่อม API ภายหลังได้
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}