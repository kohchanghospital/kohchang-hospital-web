import AdminGuard from './AdminGuard';
import LogoutButton from './LogoutButton';

export default function AdminPage() {
    return (
        <AdminGuard>
            <div className="mx-auto max-w-6xl">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                        <p className="text-sm font-semibold text-[rgb(var(--color-primary))]">ภาพรวมระบบ</p>
                        <h1 className="mt-1 text-2xl font-bold text-[rgb(var(--color-secondary))] sm:text-3xl">แดชบอร์ด</h1>
                        <p className="mt-2 max-w-2xl text-sm leading-7 text-slate-600">ยินดีต้อนรับเข้าสู่ระบบจัดการเว็บไซต์โรงพยาบาลเกาะช้าง</p>
                    </div>
                    <LogoutButton />
                </div>
                <section className="surface-card mt-7 p-6 sm:p-8">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[rgb(var(--color-primary-light))] text-[rgb(var(--color-primary))]">
                        <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Z" /><path d="M12 8v8M8 12h8" strokeLinecap="round" /></svg>
                    </div>
                    <h2 className="mt-5 text-xl font-semibold text-[rgb(var(--color-secondary))]">ระบบพร้อมใช้งาน</h2>
                    <p className="mt-2 max-w-xl text-sm leading-7 text-slate-600">เลือกเมนูจากแถบด้านข้างเพื่อจัดการข้อมูลที่มีอยู่ในระบบ สิทธิ์การเข้าถึงและการทำงานเดิมยังคงเหมือนเดิม</p>
                </section>
            </div>
        </AdminGuard>
    );
}
