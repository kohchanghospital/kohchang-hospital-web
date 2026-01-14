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
            className="rounded bg-red-500 px-4 py-2 text-white"
        >
            Logout
        </button>
    );
}
