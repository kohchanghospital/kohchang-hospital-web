'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import api from '../../lib/api';

export default function LoginGuard({
    children,
}: {
    children: React.ReactNode;
}) {
    const router = useRouter();
    const [checking, setChecking] = useState(true);

    useEffect(() => {
        const checkAuth = async () => {
            try {
                // ถ้าเรียกได้ แปลว่า login แล้ว
                await api.get('/api/user');
                router.replace('/admin');
            } catch {
                // ยังไม่ login → แสดงหน้า login
                setChecking(false);
            }
        };

        checkAuth();
    }, [router]);

    if (checking) {
        return (
            <div className="flex min-h-screen items-center justify-center">
                กำลังตรวจสอบสิทธิ์...
            </div>
        );
    }

    return <>{children}</>;
}
