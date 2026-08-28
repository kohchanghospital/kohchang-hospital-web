export function Skeleton({ className = '' }: { className?: string }) {
    return <div aria-hidden="true" className={`animate-pulse rounded-lg bg-slate-200 ${className}`} />;
}

function LoadingShell({ children }: { children: React.ReactNode }) {
    return (
        <div className="bg-[rgb(var(--color-background))]" role="status" aria-live="polite" aria-busy="true">
            <span className="sr-only">Loading</span>
            {children}
        </div>
    );
}

function PublicHeroSkeleton({ description = false }: { description?: boolean }) {
    return (
        <header className="relative isolate overflow-hidden border-b border-[rgb(var(--color-border))] bg-[rgb(var(--color-secondary))]">
            <div className="absolute inset-0 -z-10 bg-[linear-gradient(110deg,#211A3A_0%,#352650_45%,#4C2A6A_100%)]" />
            <div className="container-page py-14 sm:py-16 lg:py-20">
                <div className="max-w-3xl">
                    <Skeleton className="h-4 w-40 !bg-white/15" />
                    <Skeleton className="mt-3 h-9 w-72 max-w-full !bg-white/20 sm:h-10 sm:w-96 lg:h-12" />
                    {description && (
                        <div className="mt-4 max-w-2xl space-y-3">
                            <Skeleton className="h-4 w-full !bg-white/15" />
                            <Skeleton className="h-4 w-4/5 !bg-white/15" />
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
}

function HomeHeroSkeleton() {
    return (
        <header className="relative isolate overflow-hidden bg-[rgb(var(--color-secondary))]">
            <div className="absolute inset-0 -z-10 bg-[linear-gradient(110deg,#211A3A_0%,#352650_45%,#4C2A6A_100%)]" />
            <div className="container-page py-16 sm:py-20 lg:py-24">
                <div className="max-w-3xl">
                    <Skeleton className="h-8 w-40 !bg-white/15" />
                    <Skeleton className="mt-5 h-9 w-72 max-w-full !bg-white/20 sm:h-10 sm:w-96 lg:h-12" />
                    <div className="mt-5 max-w-2xl space-y-3">
                        <Skeleton className="h-4 w-full !bg-white/15" />
                        <Skeleton className="h-4 w-4/5 !bg-white/15" />
                    </div>
                    <Skeleton className="mt-7 h-12 w-36 !bg-white/20" />
                </div>
            </div>
        </header>
    );
}

function ArticleCardSkeleton() {
    return (
        <div className="surface-card h-full p-5">
            <div className="flex items-start gap-4">
                <Skeleton className="h-12 w-12 shrink-0 rounded-xl" />
                <div className="min-w-0 flex-1">
                    <Skeleton className="h-4 w-11/12" />
                    <Skeleton className="mt-2.5 h-4 w-7/12" />
                    <Skeleton className="mt-2 h-3 w-24" />
                </div>
            </div>
        </div>
    );
}

function SectionHeadingSkeleton() {
    return (
        <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
                <Skeleton className="mb-2 h-1 w-10 rounded-full" />
                <Skeleton className="h-7 w-56 max-w-full" />
            </div>
            <Skeleton className="h-10 w-28 rounded-lg" />
        </div>
    );
}

export function HomePageSkeleton() {
    return (
        <LoadingShell>
            <HomeHeroSkeleton />
            <section className="container-page space-y-12 py-10 sm:py-14">
                {Array.from({ length: 3 }).map((_, sectionIndex) => (
                    <div key={sectionIndex}>
                        <SectionHeadingSkeleton />
                        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
                            {Array.from({ length: 6 }).map((_, index) => <ArticleCardSkeleton key={index} />)}
                        </div>
                    </div>
                ))}
            </section>
        </LoadingShell>
    );
}

export function HubPageSkeleton({ cards = 5, heroDescription = false }: { cards?: number; heroDescription?: boolean }) {
    const constrained = cards <= 2;
    return (
        <LoadingShell>
            <PublicHeroSkeleton description={heroDescription} />
            <section className="container-page py-10 sm:py-14">
                <div className={`${constrained ? 'mx-auto max-w-5xl md:grid-cols-2' : 'sm:grid-cols-2 lg:grid-cols-3'} grid gap-5`}>
                    {Array.from({ length: cards }).map((_, index) => (
                        <div key={index} className="surface-card flex min-h-40 flex-col p-5 sm:p-6">
                            <div className="flex items-start justify-between gap-4">
                                <Skeleton className="h-11 w-11 rounded-xl" />
                                <Skeleton className="h-5 w-5 rounded-full" />
                            </div>
                            <Skeleton className="mt-5 h-5 w-3/5" />
                            <Skeleton className="mt-3 h-3.5 w-full" />
                            <Skeleton className="mt-2 h-3.5 w-4/5" />
                        </div>
                    ))}
                </div>
            </section>
        </LoadingShell>
    );
}

export function ListPageSkeleton() {
    return (
        <LoadingShell>
            <PublicHeroSkeleton />
            <section className="container-page max-w-4xl py-10 sm:py-14">
                <div className="space-y-4">
                    {Array.from({ length: 10 }).map((_, index) => (
                        <div key={index} className="surface-card p-4">
                            <div className="flex items-start gap-4">
                                <Skeleton className="h-[35px] w-[35px] shrink-0 rounded-md" />
                                <div className="min-w-0 flex-1">
                                    <Skeleton className={`h-4 ${index % 3 === 0 ? 'w-11/12' : index % 3 === 1 ? 'w-3/4' : 'w-5/6'}`} />
                                    <Skeleton className="mt-2.5 h-3 w-24" />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="mt-8 flex flex-wrap justify-center gap-1.5">
                    {Array.from({ length: 5 }).map((_, index) => <Skeleton key={index} className="h-10 w-10" />)}
                </div>
            </section>
        </LoadingShell>
    );
}

export function ContentPageSkeleton({ withImage = false }: { withImage?: boolean }) {
    return (
        <LoadingShell>
            <PublicHeroSkeleton />
            {withImage ? <HistoryContentSkeleton /> : <VisionContentSkeleton />}
        </LoadingShell>
    );
}

function HistoryContentSkeleton() {
    return (
        <section className="container-page max-w-5xl py-10 sm:py-14">
            <div className="surface-card grid items-center gap-8 p-5 sm:p-8 md:grid-cols-2">
                <TextSection lines={5} />
                <Skeleton className="aspect-[4/3] w-full rounded-xl" />
            </div>
            {[4, 5].map((lines, index) => <div key={index} className="surface-card mt-6 p-5 sm:p-8"><TextSection lines={lines} /></div>)}
        </section>
    );
}

function VisionContentSkeleton() {
    return (
        <section className="container-page max-w-4xl space-y-5 py-10 sm:py-14">
            {[4, 5, 4].map((lines, index) => <article key={index} className="surface-card p-5 sm:p-8"><TextSection lines={lines} /></article>)}
        </section>
    );
}

function TextSection({ lines }: { lines: number }) {
    return (
        <div>
            <Skeleton className="h-7 w-56 max-w-full" />
            <div className="mt-4 space-y-3">
                {Array.from({ length: lines }).map((_, index) => <Skeleton key={index} className={`h-4 ${index === lines - 1 ? 'w-7/12' : index % 2 ? 'w-11/12' : 'w-full'}`} />)}
            </div>
        </div>
    );
}

export function ManagementPageSkeleton() {
    return (
        <LoadingShell>
            <ManagementHeroSkeleton />
            <ManagementContentSkeleton />
        </LoadingShell>
    );
}

function ManagementHeroSkeleton() {
    return (
        <header className="relative overflow-hidden bg-[rgb(var(--color-secondary))] px-4 py-20 text-center sm:py-24 lg:py-28">
            <div className="relative mx-auto flex max-w-4xl flex-col items-center">
                <Skeleton className="h-9 w-40 !bg-white/15" />
                <Skeleton className="mt-6 h-10 w-72 max-w-full !bg-white/20 sm:h-12 sm:w-96" />
                <Skeleton className="mt-5 h-4 w-64 !bg-white/15" />
            </div>
        </header>
    );
}

export function ManagementContentSkeleton() {
    return (
        <div className="mx-auto max-w-7xl px-4 py-12 text-center sm:px-6 lg:px-8 lg:py-16" role="status" aria-busy="true">
            <span className="sr-only">Loading</span>
            {[1, 4].map((count, groupIndex) => (
                <section key={groupIndex} className="mb-12 last:mb-0">
                    <Skeleton className="mx-auto mb-8 h-12 w-64 max-w-full rounded-xl" />
                    <div className="flex flex-wrap justify-center gap-10">
                        {Array.from({ length: count }).map((_, index) => (
                            <div key={index} className="w-64 overflow-hidden rounded-xl border border-[rgb(var(--color-border))] bg-white shadow-md">
                                <Skeleton className="h-80 w-full rounded-none" />
                                <div className="space-y-3 p-5"><Skeleton className="mx-auto h-5 w-40" /><Skeleton className="mx-auto h-4 w-48" /></div>
                            </div>
                        ))}
                    </div>
                </section>
            ))}
        </div>
    );
}

export function CalendarPageSkeleton() {
    return (
        <LoadingShell>
            <PublicHeroSkeleton />
            <section className="container-page max-w-6xl py-10 sm:py-14">
                <div className="surface-card overflow-x-auto p-3 sm:p-6">
                    <div className="min-h-96 min-w-[42rem] sm:min-w-0">
                        <div className="relative mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                            <div className="flex gap-2">
                                <Skeleton className="h-10 w-11" />
                                <Skeleton className="h-10 w-11" />
                                <Skeleton className="h-10 w-20" />
                            </div>
                            <Skeleton className="h-7 w-44 sm:order-first sm:absolute sm:left-1/2 sm:-translate-x-1/2" />
                            <span className="hidden sm:block" />
                        </div>
                        <div className="grid grid-cols-7 border-l border-t border-[rgb(var(--color-border))]">
                            {Array.from({ length: 7 }).map((_, index) => (
                                <div key={`weekday-${index}`} className="flex h-10 items-center justify-center border-b border-r border-[rgb(var(--color-border))] bg-slate-50 px-2"><Skeleton className="h-3 w-14" /></div>
                            ))}
                            {Array.from({ length: 42 }).map((_, index) => (
                                <div key={index} className="h-20 border-b border-r border-[rgb(var(--color-border))] p-2 sm:h-24 lg:h-28">
                                    <Skeleton className="ml-auto h-3 w-5" />
                                    {index % 8 === 2 && <Skeleton className="mt-3 h-5 w-full rounded-md" />}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>
        </LoadingShell>
    );
}

export function DetailPageSkeleton({ rows = 5 }: { rows?: number }) {
    const metadataCards = rows > 5 ? 4 : 2;
    const detailRows = rows > 5 ? 4 : 3;
    return (
        <LoadingShell>
            <section className="container-page max-w-5xl py-10 sm:py-14">
                <Skeleton className="mb-6 h-6 w-56 max-w-full" />
                <div className="mb-6">
                    <Skeleton className="h-4 w-32" />
                    <Skeleton className="mt-2 h-8 w-72 max-w-full sm:h-9" />
                </div>
                <article className="surface-card overflow-hidden shadow-[var(--shadow-md)]">
                    <div className="border-b border-[rgb(var(--color-border))] bg-gradient-to-br from-[rgb(var(--color-primary-light))] to-white p-6 sm:p-8">
                        <Skeleton className="h-8 w-3/4 sm:h-9" />
                        <div className="mt-6 grid gap-3 sm:grid-cols-2">
                            {Array.from({ length: metadataCards }).map((_, index) => (
                                <div key={index} className="flex items-center gap-4 rounded-2xl border border-[rgb(var(--color-primary-border))] bg-white/90 p-4">
                                    <Skeleton className="h-11 w-11 shrink-0 rounded-xl" />
                                    <div className="flex-1 space-y-2"><Skeleton className="h-3 w-16" /><Skeleton className="h-4 w-32 max-w-full" /></div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="space-y-8 p-6 sm:p-8">
                        <section>
                            <Skeleton className="h-6 w-28" />
                            <div className="mt-4 space-y-3">
                                {Array.from({ length: detailRows }).map((_, index) => (
                                    <div key={index} className="flex gap-4 rounded-xl bg-[rgb(var(--color-background))] p-4">
                                        <Skeleton className="h-8 w-8 shrink-0 rounded-full" />
                                        <div className="flex-1 space-y-2 pt-1"><Skeleton className="h-4 w-full" />{index % 2 === 0 && <Skeleton className="h-4 w-3/4" />}</div>
                                    </div>
                                ))}
                            </div>
                        </section>
                        <section className="border-t border-[rgb(var(--color-border))] pt-7"><Skeleton className="h-6 w-24" /><Skeleton className="mt-3 h-4 w-2/3" /></section>
                    </div>
                </article>
            </section>
        </LoadingShell>
    );
}

export function CashDonationPageSkeleton() {
    return (
        <LoadingShell>
            <PublicHeroSkeleton />
            <section className="container-page max-w-5xl space-y-8 py-10 sm:py-14">
                <div className="mx-auto max-w-3xl text-center">
                    <Skeleton className="mx-auto h-7 w-3/4" />
                    <div className="mt-4 space-y-3"><Skeleton className="h-4 w-full" /><Skeleton className="mx-auto h-4 w-4/5" /></div>
                </div>
                <DonationCard lines={2} columns />
                <div className="surface-card p-5 text-center sm:p-8">
                    <Skeleton className="mx-auto h-6 w-64 max-w-full" />
                    <Skeleton className="mx-auto mt-5 aspect-square w-full max-w-72 rounded-xl" />
                    <Skeleton className="mx-auto mt-5 h-11 w-36" />
                </div>
                <div className="surface-card border-l-4 !border-l-slate-200 p-5 sm:p-7"><TextSection lines={4} /></div>
                <DonationCard lines={5} />
                <div className="surface-card overflow-hidden"><Skeleton className="h-72 w-full rounded-none" /></div>
            </section>
        </LoadingShell>
    );
}

function DonationCard({ lines, columns = false }: { lines: number; columns?: boolean }) {
    return (
        <div className="surface-card p-5 sm:p-7">
            <Skeleton className="h-6 w-56 max-w-full" />
            <div className={`mt-5 grid gap-3 ${columns ? 'sm:grid-cols-2' : ''}`}>
                {Array.from({ length: lines }).map((_, index) => <Skeleton key={index} className={`h-4 ${index === lines - 1 ? 'w-2/3' : 'w-full'}`} />)}
            </div>
        </div>
    );
}

export function OrganDonationPageSkeleton() {
    return (
        <LoadingShell>
            <PublicHeroSkeleton />
            <section className="container-page max-w-6xl py-10 sm:py-14">
                <div className="text-center"><Skeleton className="mx-auto mt-4 h-6 w-96 max-w-full" /><Skeleton className="mx-auto mt-3 h-5 w-64" /></div>
                <div className="my-8 h-px bg-gray-300" />
                <div className="mt-8 grid gap-6 md:grid-cols-2">
                    <div className="surface-card p-5 sm:p-7"><TextSection lines={7} /><Skeleton className="mt-5 h-6 w-64 max-w-full" /><div className="mt-4 space-y-3 pl-5">{Array.from({ length: 6 }).map((_, index) => <Skeleton key={index} className={`h-4 ${index % 2 ? 'w-2/3' : 'w-1/2'}`} />)}</div></div>
                    <div className="surface-card bg-[rgb(var(--color-primary-light)/.4)] p-5 sm:p-7"><TextSection lines={8} /></div>
                </div>
                <div className="my-8 h-px bg-gray-300" />
                <div className="text-center"><Skeleton className="mx-auto h-6 w-56" /><Skeleton className="mx-auto mt-3 h-4 w-2/3" /><Skeleton className="mx-auto mt-5 h-11 w-44" /></div>
            </section>
        </LoadingShell>
    );
}

export function AdminDashboardContentSkeleton() {
    return (
        <div className="mx-auto max-w-6xl" role="status" aria-live="polite" aria-busy="true">
            <span className="sr-only">Loading</span>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div className="w-full"><Skeleton className="h-4 w-32" /><Skeleton className="mt-2 h-8 w-48" /><Skeleton className="mt-3 h-4 w-full max-w-2xl" /><Skeleton className="mt-2 h-4 w-4/5 max-w-xl" /></div>
                <Skeleton className="h-10 w-24 shrink-0" />
            </div>
            <section className="surface-card mt-7 p-6 sm:p-8">
                <Skeleton className="h-12 w-12 rounded-xl" />
                <Skeleton className="mt-5 h-6 w-56" />
                <Skeleton className="mt-3 h-4 w-full max-w-xl" />
                <Skeleton className="mt-2 h-4 w-4/5 max-w-lg" />
            </section>
        </div>
    );
}

export function AdminPageSkeleton() {
    return <LoadingShell><AdminDashboardContentSkeleton /></LoadingShell>;
}

export function PolicyPageSkeleton() {
    return (
        <LoadingShell>
            <PublicHeroSkeleton />
            <section className="container-page max-w-5xl py-10 sm:py-14">
                <article className="surface-card p-5 sm:p-8 lg:p-10">
                    <div className="border-b border-[rgb(var(--color-border))] pb-5"><Skeleton className="h-4 w-56 max-w-full" /></div>
                    <div className="mt-7 space-y-7">
                        <TextSection lines={6} />
                        <TextSection lines={5} />
                        <div><Skeleton className="h-6 w-48" /><div className="mt-4 space-y-3 pl-5">{Array.from({ length: 4 }).map((_, index) => <Skeleton key={index} className={`h-4 ${index % 2 ? 'w-3/4' : 'w-11/12'}`} />)}</div></div>
                    </div>
                </article>
            </section>
        </LoadingShell>
    );
}
