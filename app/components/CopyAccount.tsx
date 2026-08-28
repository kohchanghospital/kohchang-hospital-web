"use client";

import { useState } from "react";
import { Icons } from "../icons/icons";

export default function CopyAccount({ account }: { account: string }) {
    const [copied, setCopied] = useState(false);

    const handleCopy = async () => {
        await navigator.clipboard.writeText(account);
        setCopied(true);

        setTimeout(() => {
            setCopied(false);
        }, 2000);
    };

    return (
        <button
            onClick={handleCopy}
            className="inline-flex min-h-10 items-center gap-2 rounded-lg bg-[rgb(var(--color-primary-light))] px-3 font-semibold text-[rgb(var(--color-primary-hover))] hover:bg-[rgb(var(--color-primary-border))]"
        >
            <span>{account}</span>

            <Icons.Copy className="text-sm text-[rgb(var(--color-primary))]" />

            {copied && (
                <span className="text-green-600 text-sm">
                    ✓ คัดลอกแล้ว
                </span>
            )}
        </button>
    );
}
