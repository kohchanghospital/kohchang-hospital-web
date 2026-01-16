export default function NotFound() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <h2 className="text-2xl font-bold">ไม่พบหน้านี้ (404)</h2>
            <p>ขออภัย ไม่พบหน้าที่คุณกำลังค้นหา</p>
            <a href="/" className="text-blue-500 underline">กลับหน้าแรก</a>
        </div>
    )
}