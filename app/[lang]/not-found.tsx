'use client'; // ต้องเป็น Client Component เพื่อใช้ useParams

import Link from 'next/link';
import { useParams } from 'next/navigation';
import { languages, Lang } from "@/i18n";

export default function NotFound() {
    const params = useParams();
    // ดึงค่า lang จาก URL, ถ้าไม่มีให้ default เป็น 'th' หรือค่าเริ่มต้นของคุณ
    const lang = (params?.lang as Lang) || 'th'; 
    
    const t = languages[lang];

    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px',
            textAlign: 'center'
        }}>
            <img
                src="/images/el_404.png"
                alt="404 Not Found"
                style={{ maxWidth: '300px', marginBottom: '20px' }}
            />
            <h1 className="text-2xl font-bold">{t.page_not_found}</h1>
            <p className="mb-4">{t.page_not_found_message}</p>
            <Link
                href={`/${lang}/`}
                className="px-4 py-2 bg-[rgb(var(--color-primary))] text-white rounded hover:bg-[rgb(var(--color-primary-light)/0.1)] hover:text-[rgb(var(--color-primary))]"
            >
                {t.return_home}
            </Link>
        </div>
    );
}