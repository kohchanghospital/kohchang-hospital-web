'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Lang } from '@/i18n';

type PolicyType = 'privacy_policy' | 'cookie_policy' | 'terms_of_service';
type PolicySummary = { policy_type: PolicyType; title_th: string; title_en: string | null };
const slugs: Record<PolicyType, string> = {
    privacy_policy: 'privacy-policy',
    cookie_policy: 'cookie-policy',
    terms_of_service: 'terms-of-service',
};

export function PolicyFooterLinks({ lang }: { lang: Lang }) {
    const [policies, setPolicies] = useState<PolicySummary[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const controller = new AbortController();
        const apiUrl = (process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api').replace(/\/$/, '');
        fetch(`${apiUrl}/policies`, { signal: controller.signal })
            .then((response) => response.ok ? response.json() : Promise.reject())
            .then((json) => setPolicies(json.data || []))
            .catch(() => undefined)
            .finally(() => setLoading(false));
        return () => controller.abort();
    }, []);

    if (loading) return <span className="text-[rgb(var(--color-muted))]" aria-label={lang === 'th' ? 'กำลังโหลดนโยบาย' : 'Loading policies'}>…</span>;

    return (
        <>
            {policies.map((policy, index) => (
                <span key={policy.policy_type}>
                    {index > 0 && <span aria-hidden="true"> | </span>}
                    <Link href={`/${lang}/${slugs[policy.policy_type]}`} className="transition-colors duration-300 hover:text-[rgb(var(--color-primary))]">
                        {lang === 'en' ? policy.title_en || policy.title_th : policy.title_th}
                    </Link>
                </span>
            ))}
        </>
    );
}
