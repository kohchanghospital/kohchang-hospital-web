import axios from 'axios';
import { Lang } from "@/i18n";

const api = axios.create({
    baseURL: 'http://localhost:8000',
    withCredentials: true,
    withXSRFToken: true, // ⭐ สำคัญมาก
    headers: {
        Accept: 'application/json',
    },
});

export default api;

export async function getContent(slug: string, lang: Lang) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/contents/${slug}?lang=${lang}`, {
        cache: "no-store"
    });

    if (!res.ok) {
        throw new Error("โหลดข้อมูลไม่สำเร็จ");
    }

    return res.json();
}

