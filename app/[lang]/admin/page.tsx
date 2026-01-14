import AdminGuard from './AdminGuard';
import LogoutButton from './LogoutButton';

export default function AdminPage() {
    return (
        <AdminGuard>
            <div className="p-8">
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-bold">Admin Dashboard</h1>
                    <LogoutButton />
                </div>

                <p className="mt-4 text-gray-600">
                    ยินดีต้อนรับเข้าสู่ระบบ
                </p>
            </div>
        </AdminGuard>
    );
}
