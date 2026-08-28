'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import api from '../../lib/api';
import { AdminDashboardContentSkeleton } from '@/app/components/PageSkeleton';

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
            } catch {
                router.replace('/login');
            }
        };

        checkAuth();
    }, [router]);

    if (loading) {
        return <AdminDashboardContentSkeleton />;
    }

    return <>{children}</>;
}
