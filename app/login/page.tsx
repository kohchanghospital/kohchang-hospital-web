'use client';

import { useState } from 'react';
import api from '../lib/api';
import { useRouter } from 'next/navigation';
import LoginGuard from './LoginGuard';

export default function LoginPage() {
    const router = useRouter();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            await api.get('/sanctum/csrf-cookie');

            await api.post('/login', {
                email,
                password,
            });

            router.replace('/admin');
        } catch (err: any) {
            if (err.response?.status === 422) {
                setError('Email หรือ Password ไม่ถูกต้อง');
            } else {
                setError('เกิดข้อผิดพลาดในการเข้าสู่ระบบ');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <LoginGuard>
            <div className="flex min-h-screen items-center justify-center bg-gray-100 text-gray-800">
                <form
                    onSubmit={handleLogin}
                    className="w-full max-w-md rounded-2xl bg-white p-8 shadow"
                >
                    <h1 className="mb-6 text-center text-2xl font-bold">
                        เข้าสู่ระบบผู้ดูแล
                    </h1>

                    {error && (
                        <div className="mb-4 rounded bg-red-100 p-2 text-sm text-red-700">
                            {error}
                        </div>
                    )}

                    <input
                        type="email"
                        placeholder="Email"
                        className="mb-3 w-full rounded border px-4 py-2"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    <input
                        type="password"
                        placeholder="Password"
                        className="mb-4 w-full rounded border px-4 py-2"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    <button
                        disabled={loading}
                        className="w-full rounded bg-blue-600 py-2 text-white disabled:opacity-50"
                    >
                        {loading ? 'กำลังเข้าสู่ระบบ...' : 'Login'}
                    </button>
                </form>
            </div>
        </LoginGuard>
    );
}
