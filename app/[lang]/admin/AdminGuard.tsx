'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import api from '../../lib/api';

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
        return (
            <div className="mx-auto max-w-6xl" role="status" aria-live="polite">
                <span className="sr-only">กำลังตรวจสอบสิทธิ์</span>
                <div className="h-8 w-48 animate-pulse rounded-lg bg-slate-200" />
                <div className="surface-card mt-7 space-y-4 p-8">
                    <div className="h-12 w-12 animate-pulse rounded-xl bg-slate-100" />
                    <div className="h-6 w-56 animate-pulse rounded bg-slate-100" />
                    <div className="h-4 w-full max-w-xl animate-pulse rounded bg-slate-100" />
                </div>
            </div>
        );
    }

    return <>{children}</>;
}
