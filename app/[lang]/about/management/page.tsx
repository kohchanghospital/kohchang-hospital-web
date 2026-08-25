"use client";

import { use, useEffect, useState } from "react";
import { languages, Lang } from "@/i18n";
import { Icons } from '@/app/icons/icons';
import { apiUrl, publicStorageUrl } from '@/app/lib/api';

type Person = { id: number; name: string; position: string; image: string | null };

type DepartmentResponse = {
    id: number;
    name_th: string;
    name_en: string | null;
    order_no: number;
    is_active: boolean | number;
};

type ExecutiveResponse = {
    id: number;
    name_th: string;
    name_en: string | null;
    position_th: string;
    position_en: string | null;
    department_id: number;
    image_path: string | null;
    order_no: number;
    is_active: boolean | number;
};

type ManagementGroup = { id: number; title: string; members: Person[] };

export default function ManagementTeam({ params }: { params: Promise<{ lang: string }> }) {
    const { lang } = use(params);
    const t = languages[lang as Lang];
    const [selected, setSelected] = useState<Person | null>(null);
    const [groups, setGroups] = useState<ManagementGroup[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        const controller = new AbortController();

        async function loadManagement() {
            setLoading(true);
            setError(false);

            try {
                const [departmentsResponse, executivesResponse] = await Promise.all([
                    fetch(apiUrl('/departments'), { cache: 'no-store', signal: controller.signal }),
                    fetch(apiUrl('/executives'), { cache: 'no-store', signal: controller.signal }),
                ]);

                if (!departmentsResponse.ok || !executivesResponse.ok) throw new Error('Management request failed');

                const departments = await departmentsResponse.json() as DepartmentResponse[];
                const executives = await executivesResponse.json() as ExecutiveResponse[];
                const activeExecutives = executives
                    .filter((executive) => Boolean(executive.is_active))
                    .sort((a, b) => a.order_no - b.order_no);

                setGroups(
                    departments
                        .filter((department) => Boolean(department.is_active))
                        .sort((a, b) => a.order_no - b.order_no)
                        .map((department) => ({
                            id: department.id,
                            title: lang === 'en' && department.name_en ? department.name_en : department.name_th,
                            members: activeExecutives
                                .filter((executive) => executive.department_id === department.id)
                                .map((executive) => ({
                                    id: executive.id,
                                    name: lang === 'en' && executive.name_en ? executive.name_en : executive.name_th,
                                    position: lang === 'en' && executive.position_en ? executive.position_en : executive.position_th,
                                    image: executive.image_path ? publicStorageUrl(executive.image_path) : null,
                                })),
                        }))
                );
            } catch (requestError) {
                if ((requestError as Error).name !== 'AbortError') setError(true);
            } finally {
                if (!controller.signal.aborted) setLoading(false);
            }
        }

        loadManagement();
        return () => controller.abort();
    }, [lang]);

    const hasMembers = groups.some((group) => group.members.length > 0);

    return (
        <>
            <div
                className="relative overflow-hidden bg-cover bg-center px-4 py-20 text-center sm:py-24 lg:py-28"
                style={{ backgroundImage: "url('/images/management.png')", backgroundPosition: "center 25%" }}
            >
                <div className="absolute inset-0 bg-gradient-to-r from-[rgb(var(--color-secondary))]/95 via-[rgb(var(--color-primary-dark))]/90 to-[rgb(var(--color-primary))]/75" />
                <div className="relative z-10 mx-auto max-w-4xl animate-soft-reveal text-white">
                    <span className="inline-flex rounded-lg border border-white/20 bg-white/10 px-4 py-2 text-sm font-medium text-teal-100">Koh Chang Hospital</span>
                    <h1 className="mt-6 text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-5xl">{t.management_team}</h1>
                    <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-slate-200">{t.hos_name}</p>
                </div>
                <div className="absolute bottom-0 left-0 h-px w-full bg-teal-300/50" />
            </div>

            <section className="mx-auto max-w-7xl px-4 py-12 text-center sm:px-6 lg:px-8 lg:py-16">
                {loading && <ManagementLoadingState lang={lang} />}

                {!loading && error && (
                    <div className="surface-card mx-auto max-w-2xl px-6 py-10" role="alert">
                        <Icons.Close className="mx-auto text-3xl text-red-500" />
                        <h2 className="mt-4 text-xl font-semibold text-[rgb(var(--color-secondary))]">
                            {lang === 'th' ? 'ไม่สามารถโหลดข้อมูลคณะผู้บริหารได้' : 'Unable to load the management team'}
                        </h2>
                        <p className="mt-2 text-sm leading-7 text-[rgb(var(--color-muted))]">
                            {lang === 'th' ? 'กรุณารีเฟรชหน้าเพื่อลองอีกครั้ง' : 'Please refresh the page and try again.'}
                        </p>
                    </div>
                )}

                {!loading && !error && !hasMembers && (
                    <div className="surface-card mx-auto max-w-2xl px-6 py-10">
                        <h2 className="text-xl font-semibold text-[rgb(var(--color-secondary))]">
                            {lang === 'th' ? 'ยังไม่มีข้อมูลคณะผู้บริหาร' : 'No management team information yet'}
                        </h2>
                    </div>
                )}

                {!loading && !error && hasMembers && groups.map((group) => (
                    <section key={group.id} className="mb-12 animate-soft-reveal last:mb-0">
                        <div className="mx-auto mb-8 inline-flex max-w-full items-center justify-center rounded-xl border border-[rgb(var(--color-border))] bg-white px-6 py-3 text-xl font-semibold text-[rgb(var(--color-secondary))] shadow-sm">
                            <span className="mr-3 h-2 w-2 rounded-full bg-[rgb(var(--color-primary))]" />
                            {group.title}
                        </div>

                        {group.members.length > 0 ? (
                            <div className="flex flex-wrap justify-center gap-10">
                                {group.members.map((person) => (
                                    <Card key={person.id} person={person} onClick={() => setSelected(person)} />
                                ))}
                            </div>
                        ) : (
                            <p className="text-sm text-[rgb(var(--color-muted))]">
                                {lang === 'th' ? 'ยังไม่มีรายชื่อในฝ่ายนี้' : 'No team members in this department yet.'}
                            </p>
                        )}
                    </section>
                ))}
            </section>

            {selected && (
                <div
                    className="fixed inset-0 z-50 flex items-end justify-center bg-slate-950/45 p-0 backdrop-blur-sm animate-[fadeIn_.25s_ease] md:items-center md:p-6"
                    onClick={() => setSelected(null)}
                >
                    <div
                        className="relative w-full max-w-md animate-[slideUp_.35s_ease] rounded-t-3xl border border-[#E5E7EB] bg-white p-6 text-center shadow-2xl shadow-slate-950/20 md:rounded-3xl"
                        onClick={(event) => event.stopPropagation()}
                    >
                        <button
                            className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-[#F8FAFC] text-[#64748B] transition-all duration-300 hover:scale-105 hover:bg-red-50 hover:text-red-600 active:scale-95"
                            onClick={() => setSelected(null)}
                            aria-label={lang === 'th' ? 'ปิด' : 'Close'}
                        >
                            <Icons.Close className="text-2xl" />
                        </button>
                        <PersonImage person={selected} className="mb-5 h-96 w-full rounded-2xl" />
                        <h3 className="text-xl font-bold text-[#1E293B]">{selected.name}</h3>
                        <p className="mt-2 whitespace-pre-line text-sm leading-7 text-[#64748B]">{selected.position}</p>
                    </div>
                </div>
            )}
        </>
    );
}

function Card({ person, onClick }: { person: Person; onClick: () => void }) {
    return (
        <button
            type="button"
            onClick={onClick}
            className="group w-72 cursor-pointer overflow-hidden rounded-xl border border-[rgb(var(--color-border))] bg-white text-center shadow-sm transition duration-200 hover:-translate-y-0.5 hover:border-teal-200 hover:shadow-[var(--shadow-md)]"
        >
            <div className="relative overflow-hidden bg-teal-50">
                <PersonImage person={person} className="h-80 w-full transition-transform duration-500 group-hover:scale-105" />
                <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-slate-950/25 to-transparent" />
            </div>
            <div className="p-5">
                <h3 className="text-base font-semibold leading-7 text-[rgb(var(--color-secondary))] transition-colors group-hover:text-[rgb(var(--color-primary-dark))]">{person.name}</h3>
                <p className="mt-2 whitespace-pre-line text-sm leading-7 text-[#64748B]">{person.position}</p>
            </div>
        </button>
    );
}

function PersonImage({ person, className }: { person: Person; className: string }) {
    if (!person.image) {
        return (
            <div className={`flex items-center justify-center bg-teal-50 text-7xl text-teal-200 ${className}`} aria-label={person.name}>
                <i className="bi bi-person-fill" aria-hidden="true" />
            </div>
        );
    }

    return <img src={person.image} alt={person.name} className={`object-cover object-top ${className}`} />;
}

function ManagementLoadingState({ lang }: { lang: string }) {
    return (
        <div role="status" aria-live="polite">
            <span className="sr-only">{lang === 'th' ? 'กำลังโหลดข้อมูล' : 'Loading management data'}</span>
            <div className="mx-auto mb-8 h-12 w-56 animate-pulse rounded-xl bg-slate-200" />
            <div className="flex flex-wrap justify-center gap-10">
                {[1, 2, 3].map((item) => (
                    <div key={item} className="w-72 overflow-hidden rounded-xl border border-[rgb(var(--color-border))] bg-white">
                        <div className="h-80 animate-pulse bg-slate-100" />
                        <div className="space-y-3 p-5">
                            <div className="mx-auto h-5 w-40 animate-pulse rounded bg-slate-100" />
                            <div className="mx-auto h-4 w-52 animate-pulse rounded bg-slate-100" />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
