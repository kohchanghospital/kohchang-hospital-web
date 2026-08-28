import { notFound } from "next/navigation";
import { EmptyState, PublicHero } from "@/app/components/PublicUI";
import { apiUrl } from "@/app/lib/api";
import { Lang } from "@/i18n";

export type PolicyType = "privacy_policy" | "cookie_policy" | "terms_of_service";

type Policy = {
    policy_type: PolicyType;
    title_th: string;
    title_en: string | null;
    content_th: string | null;
    content_en: string | null;
    updated_at: string;
};

async function getPolicy(policyType: PolicyType): Promise<{ policy: Policy | null; unavailable: boolean }> {
    try {
        const response = await fetch(apiUrl(`/policies/${policyType}`), { cache: "no-store" });
        if (response.status === 404) return { policy: null, unavailable: true };
        if (!response.ok) return { policy: null, unavailable: false };
        const json = await response.json();
        return { policy: json.data || null, unavailable: false };
    } catch {
        return { policy: null, unavailable: false };
    }
}

export default async function PolicyPage({ lang, policyType }: { lang: Lang; policyType: PolicyType }) {
    const result = await getPolicy(policyType);
    if (result.unavailable) notFound();

    const fallbackTitles: Record<PolicyType, { th: string; en: string }> = {
        privacy_policy: { th: "นโยบายการคุ้มครองข้อมูลส่วนบุคคล", en: "Privacy Policy" },
        cookie_policy: { th: "นโยบายคุกกี้", en: "Cookie Policy" },
        terms_of_service: { th: "ข้อกำหนดการให้บริการ", en: "Terms of Service" },
    };
    const policy = result.policy;
    const title = policy ? (lang === "en" ? policy.title_en || policy.title_th : policy.title_th) : fallbackTitles[policyType][lang];
    const content = policy ? (lang === "en" ? policy.content_en || policy.content_th : policy.content_th) : null;

    return (
        <>
            <PublicHero title={title} eyebrow={lang === "th" ? "ข้อมูลและข้อกำหนดของเว็บไซต์" : "Website information and terms"} />
            <div className="container-page max-w-5xl py-10 sm:py-14">
                {!policy ? (
                    <EmptyState title={lang === "th" ? "ไม่สามารถโหลดข้อมูลนโยบายได้" : "Unable to load this policy"} description={lang === "th" ? "กรุณาลองใหม่อีกครั้งในภายหลัง" : "Please try again later."} />
                ) : (
                    <article className="surface-card p-5 sm:p-8 lg:p-10">
                        <p className="border-b border-[rgb(var(--color-border))] pb-5 text-sm text-[rgb(var(--color-muted))]">
                            {lang === "th" ? "ปรับปรุงล่าสุด" : "Last updated"}: {new Intl.DateTimeFormat(lang === "th" ? "th-TH" : "en-GB", { dateStyle: "long" }).format(new Date(policy.updated_at))}
                        </p>
                        {content ? (
                            <div className="prose prose-slate mt-7 max-w-none leading-8 prose-headings:text-[rgb(var(--color-secondary))] prose-a:text-[rgb(var(--color-primary))] prose-li:my-1" dangerouslySetInnerHTML={{ __html: content }} />
                        ) : (
                            <div className="mt-7"><EmptyState title={lang === "th" ? "ยังไม่มีเนื้อหานโยบาย" : "Policy content is not available yet"} /></div>
                        )}
                    </article>
                )}
            </div>
        </>
    );
}
