'use client'

import { Icons } from '@/app/icons/icons'

export default function DetailActions() {

    return (
        <button
            onClick={() => window.print()}
            className="btn-outline !h-11 !w-11 !px-0"
            aria-label="พิมพ์"
        >
            <Icons.PrinterFills className="text-lg" />
        </button>
    )
}
