function SkeletonBlock({ className = '' }: { className?: string }) {
    return (
        <div
            aria-hidden="true"
            className={`animate-pulse rounded-lg bg-gradient-to-r from-slate-200 via-slate-100 to-slate-200 ${className}`}
        />
    );
}

function LoadingShell({ children }: { children: React.ReactNode }) {
    return (
        <div className="bg-[#F8FAFC]" role="status" aria-live="polite" aria-busy="true">
            <span className="sr-only">Loading</span>
            {children}
        </div>
    );
}

function HeroSkeleton({ compact = false }: { compact?: boolean }) {
    return (
        <header className={`relative overflow-hidden px-4 text-center ${compact ? 'py-20 md:py-24' : 'py-20 sm:py-24 lg:py-28'}`}>
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(196,181,253,0.32),transparent_34%),linear-gradient(135deg,#F8FAFC_0%,#FFFFFF_48%,rgba(167,139,250,0.16)_100%)]" />
            <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-[#7C3AED] via-[#A78BFA] to-[#C4B5FD]" />
            <div className="relative mx-auto flex max-w-4xl flex-col items-center">
                {!compact && <SkeletonBlock className="h-9 w-40 rounded-full bg-white/80" />}
                <SkeletonBlock className={`${compact ? 'h-8 w-56 md:h-9' : 'mt-6 h-10 w-full max-w-xl sm:h-12'}`} />
                {!compact && (
                    <>
                        <SkeletonBlock className="mt-5 h-4 w-full max-w-2xl" />
                        <SkeletonBlock className="mt-3 h-4 w-10/12 max-w-xl" />
                        <SkeletonBlock className="mt-8 h-12 w-36 rounded-full" />
                    </>
                )}
            </div>
        </header>
    );
}

function ArticleCardSkeleton() {
    return (
        <div className="rounded-xl border border-[#E5E7EB] bg-white p-5 shadow-md shadow-slate-900/5">
            <div className="flex items-start gap-4">
                <SkeletonBlock className="h-12 w-12 shrink-0 rounded-xl" />
                <div className="min-w-0 flex-1 space-y-3">
                    <SkeletonBlock className="h-4 w-11/12" />
                    <SkeletonBlock className="h-4 w-8/12" />
                    <SkeletonBlock className="h-3 w-28" />
                </div>
            </div>
        </div>
    );
}

function SectionHeadingSkeleton() {
    return (
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div className="space-y-3">
                <SkeletonBlock className="h-1 w-10 rounded-full" />
                <SkeletonBlock className="h-7 w-48" />
            </div>
            <SkeletonBlock className="h-10 w-28 rounded-full" />
        </div>
    );
}

export function HomePageSkeleton() {
    return (
        <LoadingShell>
            <HeroSkeleton />
            <div className="mx-auto max-w-7xl space-y-12 px-4 py-12 sm:px-6 lg:px-8">
                {Array.from({ length: 3 }).map((_, sectionIndex) => (
                    <section key={sectionIndex} className="space-y-6">
                        <SectionHeadingSkeleton />
                        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
                            {Array.from({ length: 6 }).map((_, index) => (
                                <ArticleCardSkeleton key={index} />
                            ))}
                        </div>
                    </section>
                ))}
            </div>
        </LoadingShell>
    );
}

export function HubPageSkeleton({ cards = 5 }: { cards?: number }) {
    return (
        <LoadingShell>
            <HeroSkeleton compact />
            <section className="mx-auto max-w-7xl px-4 py-10 md:py-12">
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {Array.from({ length: cards }).map((_, index) => (
                        <div key={index} className="rounded-xl border border-gray-200 bg-white p-5 shadow-md">
                            <SkeletonBlock className="h-6 w-3/5" />
                            <SkeletonBlock className="mt-4 h-4 w-full" />
                            <SkeletonBlock className="mt-2 h-4 w-4/5" />
                        </div>
                    ))}
                </div>
            </section>
        </LoadingShell>
    );
}

export function ListPageSkeleton({ grid = false }: { grid?: boolean }) {
    return (
        <LoadingShell>
            <HeroSkeleton compact />
            <section className="mx-auto max-w-7xl px-4 py-10 md:py-12">
                <div className={grid ? 'grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3' : 'mx-auto max-w-4xl space-y-4'}>
                    {Array.from({ length: 10 }).map((_, index) => (
                        <ArticleCardSkeleton key={index} />
                    ))}
                </div>
                <div className="mt-8 flex justify-center gap-2">
                    {Array.from({ length: 4 }).map((_, index) => (
                        <SkeletonBlock key={index} className="h-10 w-10 rounded-full" />
                    ))}
                </div>
            </section>
        </LoadingShell>
    );
}

export function ContentPageSkeleton({ withImage = false }: { withImage?: boolean }) {
    return (
        <LoadingShell>
            <HeroSkeleton compact />
            <section className="mx-auto max-w-4xl px-6 py-12">
                <div className={withImage ? 'grid items-center gap-8 md:grid-cols-2' : 'space-y-4'}>
                    <div className="space-y-4">
                        <SkeletonBlock className="h-8 w-56" />
                        <SkeletonBlock className="h-4 w-full" />
                        <SkeletonBlock className="h-4 w-11/12" />
                        <SkeletonBlock className="h-4 w-10/12" />
                    </div>
                    {withImage && <SkeletonBlock className="aspect-video w-full rounded-lg" />}
                </div>
                {Array.from({ length: 2 }).map((_, index) => (
                    <div key={index} className="mt-8 border-t border-gray-300 pt-8">
                        <SkeletonBlock className="h-7 w-48" />
                        <div className="mt-4 space-y-3">
                            <SkeletonBlock className="h-4 w-full" />
                            <SkeletonBlock className="h-4 w-11/12" />
                            <SkeletonBlock className="h-4 w-9/12" />
                        </div>
                    </div>
                ))}
            </section>
        </LoadingShell>
    );
}

export function ManagementPageSkeleton() {
    return (
        <LoadingShell>
            <HeroSkeleton />
            <section className="mx-auto max-w-7xl px-4 py-12 text-center sm:px-6 lg:px-8 lg:py-16">
                {Array.from({ length: 3 }).map((_, groupIndex) => (
                    <section key={groupIndex} className="mb-12 last:mb-0">
                        <SkeletonBlock className="mx-auto mb-8 h-12 w-72 rounded-full" />
                        <div className="flex flex-wrap justify-center gap-10">
                            {Array.from({ length: groupIndex === 0 ? 1 : 4 }).map((_, index) => (
                                <div key={index} className="w-64 overflow-hidden rounded-xl border border-[#E5E7EB] bg-white shadow-md">
                                    <SkeletonBlock className="h-80 w-full rounded-none" />
                                    <div className="space-y-3 p-5">
                                        <SkeletonBlock className="h-5 w-11/12" />
                                        <SkeletonBlock className="h-4 w-4/5" />
                                        <SkeletonBlock className="h-4 w-3/5" />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                ))}
            </section>
        </LoadingShell>
    );
}

export function CalendarPageSkeleton() {
    return (
        <LoadingShell>
            <HeroSkeleton compact />
            <section className="mx-auto max-w-4xl px-6 py-12">
                <div className="rounded-xl bg-white p-6 shadow-xl">
                    <div className="mb-5 flex items-center justify-between">
                        <SkeletonBlock className="h-9 w-40" />
                        <div className="flex gap-2">
                            <SkeletonBlock className="h-9 w-20" />
                            <SkeletonBlock className="h-9 w-20" />
                        </div>
                    </div>
                    <div className="grid grid-cols-7 gap-2">
                        {Array.from({ length: 42 }).map((_, index) => (
                            <SkeletonBlock key={index} className="h-16 rounded-md" />
                        ))}
                    </div>
                </div>
            </section>
        </LoadingShell>
    );
}

export function DetailPageSkeleton({ rows = 5 }: { rows?: number }) {
    return (
        <LoadingShell>
            <section className="mx-auto max-w-3xl px-6 py-12">
                <div className="mb-4 flex items-center">
                    <SkeletonBlock className="mr-4 h-10 w-24 rounded-full" />
                    <SkeletonBlock className="h-9 w-56" />
                </div>
                <div className="space-y-4 rounded-xl border bg-white p-6 shadow-sm">
                    {Array.from({ length: rows }).map((_, index) => (
                        <SkeletonBlock key={index} className={`h-5 ${index === rows - 1 ? 'w-2/3' : 'w-full'}`} />
                    ))}
                    <SkeletonBlock className="h-24 w-full" />
                </div>
            </section>
        </LoadingShell>
    );
}

export function CashDonationPageSkeleton() {
    return (
        <LoadingShell>
            <HeroSkeleton compact />
            <section className="mx-auto max-w-4xl space-y-12 px-6 py-12">
                <div className="space-y-4 text-center">
                    <SkeletonBlock className="mx-auto h-8 w-3/4" />
                    <SkeletonBlock className="mx-auto h-4 w-full max-w-3xl" />
                    <SkeletonBlock className="mx-auto h-4 w-4/5" />
                </div>
                <div className="rounded-xl bg-white p-6 shadow-md">
                    <SkeletonBlock className="h-7 w-56" />
                    <div className="mt-5 space-y-3">
                        <SkeletonBlock className="h-5 w-2/3" />
                        <SkeletonBlock className="h-5 w-3/4" />
                        <SkeletonBlock className="h-5 w-1/2" />
                    </div>
                </div>
                <div className="text-center">
                    <SkeletonBlock className="mx-auto h-7 w-64" />
                    <SkeletonBlock className="mx-auto mt-4 h-80 w-80 rounded-lg" />
                    <SkeletonBlock className="mx-auto mt-4 h-10 w-36 rounded-md" />
                </div>
                <div className="rounded-xl bg-gray-50 p-6">
                    <SkeletonBlock className="h-7 w-72" />
                    <div className="mt-5 space-y-3">
                        <SkeletonBlock className="h-4 w-full" />
                        <SkeletonBlock className="h-4 w-10/12" />
                        <SkeletonBlock className="h-4 w-8/12" />
                    </div>
                </div>
            </section>
        </LoadingShell>
    );
}

export function OrganDonationPageSkeleton() {
    return (
        <LoadingShell>
            <HeroSkeleton compact />
            <section className="mx-auto max-w-6xl px-6 py-12">
                <div className="space-y-3 text-center">
                    <SkeletonBlock className="mx-auto h-7 w-96 max-w-full" />
                    <SkeletonBlock className="mx-auto h-6 w-72" />
                </div>
                <div className="my-8 h-px bg-gray-300" />
                <div className="grid gap-8 md:grid-cols-2">
                    <div className="space-y-4">
                        <SkeletonBlock className="h-8 w-72" />
                        {Array.from({ length: 6 }).map((_, index) => (
                            <SkeletonBlock key={index} className={`h-4 ${index % 2 ? 'w-10/12' : 'w-full'}`} />
                        ))}
                        <SkeletonBlock className="h-7 w-64" />
                        <div className="space-y-2 pl-5">
                            {Array.from({ length: 6 }).map((_, index) => (
                                <SkeletonBlock key={index} className="h-4 w-32" />
                            ))}
                        </div>
                    </div>
                    <div className="rounded-xl bg-gray-100 p-6">
                        <SkeletonBlock className="h-8 w-72" />
                        <div className="mt-5 space-y-3">
                            {Array.from({ length: 7 }).map((_, index) => (
                                <SkeletonBlock key={index} className="h-4 w-full" />
                            ))}
                        </div>
                    </div>
                </div>
                <SkeletonBlock className="mx-auto mt-8 h-12 w-72 rounded-lg" />
            </section>
        </LoadingShell>
    );
}

export function AdminPageSkeleton() {
    return (
        <LoadingShell>
            <section className="p-8">
                <div className="flex items-center justify-between">
                    <SkeletonBlock className="h-8 w-52" />
                    <SkeletonBlock className="h-10 w-24 rounded-md" />
                </div>
                <SkeletonBlock className="mt-4 h-5 w-96 max-w-full" />
            </section>
        </LoadingShell>
    );
}
