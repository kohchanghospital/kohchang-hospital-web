'use client';

import api from '../../lib/api';
import { useRouter } from 'next/navigation';

export default function LogoutButton() {
    const router = useRouter();

    const handleLogout = async () => {
        try {
            await api.post('/logout'); // 🔥 สำคัญ
            router.replace('/login');
        } catch (error) {
            console.error('Logout failed', error);
        }
    };

    return (
        <button
            onClick={handleLogout}
            className="btn-outline !border-red-200 !text-red-700 hover:!bg-red-50"
        >
            ออกจากระบบ
        </button>
    );
}
