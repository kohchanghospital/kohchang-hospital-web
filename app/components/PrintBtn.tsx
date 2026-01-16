'use client'

import { Icons } from '@/app/icons/icons'

export default function DetailActions() {

    return (
        <button
            onClick={() => window.print()}
            className="rounded-lg bg-blue-600 px-4 py-2 text-sm text-white"
        >
            <Icons.PrinterFills className="text-lg" />
        </button>
    )
}
