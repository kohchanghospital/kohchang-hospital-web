export default function KnowledgePage() {
    return (
        <div>
            <section className="mx-auto max-w-6xl px-6 py-12">
                <h2 className="mb-6 text-3xl font-bold">สาระความรู้</h2>
                <div className="grid gap-6 md:grid-cols-3">
                    <div className="rounded-lg border p-4 shadow-sm">
                        <h4 className="font-semibold">การดูแลสุขภาพเบื้องต้น</h4>
                        <p className="mt-2 text-sm text-gray-600">
                            ความรู้ด้านสุขภาพที่ประชาชนควรรู้
                        </p>
                    </div>
                    <div className="rounded-lg border p-4 shadow-sm">
                        <h4 className="font-semibold">โรคตามฤดูกาล</h4>
                        <p className="mt-2 text-sm text-gray-600">
                            การป้องกันและการดูแลตนเอง
                        </p>
                    </div>
                    <div className="rounded-lg border p-4 shadow-sm">
                        <h4 className="font-semibold">คำแนะนำจากแพทย์</h4>
                        <p className="mt-2 text-sm text-gray-600">
                            บทความสุขภาพจากแพทย์ผู้เชี่ยวชาญ
                        </p>
                    </div>
                </div>
            </section>
        </div>
    );
}