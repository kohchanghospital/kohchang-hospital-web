'use client'; // Error components must be Client Components

import { useEffect } from 'react';
import { useParams } from 'next/navigation';
import { languages, Lang } from '@/i18n';

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    const params = useParams();
    const lang = (params?.lang as Lang) || 'th'; 
    const t = languages[lang];

    useEffect(() => {
        // คุณสามารถ Log error ไปยัง Service ภายนอกได้ที่นี่
        console.error(error);
    }, [error]);

    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '50vh',
            padding: '20px',
            textAlign: 'center'
        }}>
            <img
                src="/images/el_error.png"
                alt="404 Not Found"
                style={{ maxWidth: '300px', marginBottom: '20px' }}
            />
            <h2 className="text-2xl font-bold mb-4">
                {t.error_occurred}
            </h2>
            <p className="mb-6">
                {t.error_message}
            </p>

            <div className="flex gap-4">
                <button
                    onClick={() => reset()} // พยายามโหลดหน้านี้ใหม่อีกครั้ง
                className="px-4 py-2 bg-[rgb(var(--color-primary))] text-white rounded hover:bg-[rgb(var(--color-primary-light)/0.2)] hover:text-[rgb(var(--color-primary))]"
                >
                    {t.try_again}
                </button>

                <a
                    href={`/${lang}`}
                    className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-100"
                >
                    {t.return_home}
                </a>
            </div>
        </div>
    );
}