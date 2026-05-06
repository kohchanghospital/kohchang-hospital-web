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
            className="inline-flex items-center gap-2 text-black hover:underline"
        >
            <span>{account}</span>

            <Icons.Copy className="text-xs text-gray-500 hover:text-black" />

            {copied && (
                <span className="text-green-600 text-sm">
                    ✓ คัดลอกแล้ว
                </span>
            )}
        </button>
    );
}