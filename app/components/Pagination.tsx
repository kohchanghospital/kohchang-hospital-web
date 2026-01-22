'use client'

export default function Pagination({ currentPage, last_page, lang, path }: { currentPage: number; last_page: number; lang: string; path: string }) {

    return (
        <div className="flex justify-center items-center gap-2 mt-8">

            {/* First */}
            {currentPage > 1 ? (
                <a
                    href={`/${lang}${path}?page=1`}
                    className="px-2 py-1 rounded hover:bg-[rgb(var(--color-primary-light)/0.1)] hover:text-[rgb(var(--color-primary))]"
                >
                    «
                </a>
            ) : (
                <span className="px-2 py-1 rounded opacity-50 cursor-not-allowed">
                    «
                </span>
            )}

            {/* Prev */}
            {currentPage > 1 ? (
                <a
                    href={`/${lang}${path}?page=${currentPage - 1}`}
                    className="px-2 py-1 rounded hover:bg-[rgb(var(--color-primary-light)/0.1)] hover:text-[rgb(var(--color-primary))]"
                >
                    ‹
                </a>
            ) : (
                <span className="px-2 py-1 rounded opacity-50 cursor-not-allowed">
                    ‹
                </span>
            )}

            {/* Page Numbers */}
            {getSmartPagination(currentPage, last_page).map((p, i) =>
                p === "..." ? (
                    <span key={`ellipsis-${i}`} className="px-2 text-gray-400">...</span>
                ) : (
                    <a
                        key={`page-${p}`}
                        href={`/${lang}${path}?page=${p}`}
                        className={`px-3 py-1 rounded-full border text-sm ${p === currentPage
                            ? "bg-[rgb(var(--color-primary))] text-white font-semibold border-[rgb(var(--color-primary))]"
                            : "hover:bg-[rgb(var(--color-primary-light)/0.1)] hover:text-[rgb(var(--color-primary))]"
                            }`}
                    >
                        {p}
                    </a>
                ))}

            {/* Next */}
            {currentPage < last_page ? (
                <a
                    href={`/${lang}${path}?page=${currentPage + 1}`}
                    className="px-2 py-1 rounded hover:bg-[rgb(var(--color-primary-light)/0.1)] hover:text-[rgb(var(--color-primary))]"
                >
                    ›
                </a>
                ) : (
                <span className="px-2 py-1 rounded opacity-50 cursor-not-allowed">
                    ›
                </span>
            )}
            

            {/* Last */}
            {currentPage < last_page ? (
                <a
                    href={`/${lang}${path}?page=${last_page}`}
                    className="px-2 py-1 rounded hover:bg-[rgb(var(--color-primary-light)/0.1)] hover:text-[rgb(var(--color-primary))]"
                >
                    »
                </a>
                ) : (
                <span className="px-2 py-1 rounded opacity-50 cursor-not-allowed">
                    »
                </span>
            )}
        </div>
    )
}


function getSmartPagination(current: number, total: number, delta = 1) {
    const range: (number | string)[] = [];

    if (total <= 7) {
        for (let i = 1; i <= total; i++) range.push(i);
        return range;
    }

    const left = Math.max(2, current - delta);
    const right = Math.min(total - 1, current + delta);

    range.push(1);

    if (left > 2) range.push("...");

    for (let i = left; i <= right; i++) {
        range.push(i);
    }

    if (right < total - 1) range.push("...");

    range.push(total);

    return range;
}
