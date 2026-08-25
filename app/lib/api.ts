import axios from 'axios';
import { Lang } from "@/i18n";

export const apiBase = (process.env.NEXT_PUBLIC_API_URL ?? '').replace(/\/$/, '');

export function apiUrl(path: string) {
    if (!apiBase) {
        throw new Error('NEXT_PUBLIC_API_URL is not configured');
    }

    return `${apiBase}/${path.replace(/^\//, '')}`;
}

export function publicStorageUrl(path: string) {
    const normalizedPath = path.replace(/^\//, '');
    return `${apiBase.replace(/\/api$/, '')}/storage/${normalizedPath}`;
}

const api = axios.create({
    baseURL: apiBase.replace(/\/api$/, ''),
    withCredentials: true,
    withXSRFToken: true, // ⭐ สำคัญมาก
    headers: {
        Accept: 'application/json',
    },
});

export default api;

export async function getContent(slug: string, lang: Lang) {
    const res = await fetch(apiUrl(`/contents/${slug}?lang=${lang}`), {
        cache: "no-store"
    });

    if (!res.ok) {
        throw new Error("โหลดข้อมูลไม่สำเร็จ");
    }

    return res.json();
}

