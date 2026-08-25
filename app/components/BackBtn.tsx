'use client'

import { Icons } from '@/app/icons/icons'
import { useRouter } from 'next/navigation'

export default function BackBtn({ lang, base }: { lang: string, base: string }) {
    const router = useRouter()

    return (
        <button
            onClick={() => router.push(`/${lang}/${base}/`)}
            className="btn-outline"
        >
            <Icons.ChevronCircleLeft className="text-lg" />
        </button>
    )
}
