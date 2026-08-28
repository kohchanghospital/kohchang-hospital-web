import PolicyPage from "@/app/components/PolicyPage";
import { Lang } from "@/i18n";

export default async function Page({ params }: { params: Promise<{ lang: Lang }> }) {
    return <PolicyPage lang={(await params).lang} policyType="cookie_policy" />;
}
