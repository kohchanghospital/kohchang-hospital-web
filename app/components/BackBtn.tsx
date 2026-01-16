'use client'

import { Icons } from '@/app/icons/icons'
import { useRouter } from 'next/navigation'

export default function BackBtn({ lang, base }: { lang: string, base: string }) {
    const router = useRouter()

    return (
        <button
            onClick={() => router.push(`/${lang}/${base}/`)}
            className="rounded-lg border px-4 py-2 text-sm hover:bg-[rgb(var(--color-primary-light)/0.1)] hover:text-[rgb(var(--color-primary))]"
        >
            <Icons.ChevronCircleLeft className="text-lg" />
        </button>
    )
}
