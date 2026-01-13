'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import api from '../lib/api';

export default function AdminGuard({
    children,
}: {
    children: React.ReactNode;
}) {
    const router = useRouter();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkAuth = async () => {
            try {
                await api.get('/api/user'); // เช็ก session
                setLoading(false);
            } catch (error) {
                router.replace('/login');
            }
        };

        checkAuth();
    }, [router]);

    if (loading) {
        return <div className="p-8">กำลังตรวจสอบสิทธิ์...</div>;
    }

    return <>{children}</>;
}
