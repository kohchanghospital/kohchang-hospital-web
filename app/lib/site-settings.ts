import { apiUrl } from './api';

export type SiteSettings = {
    show_mourning_ribbon: boolean;
};

const defaultSiteSettings: SiteSettings = {
    show_mourning_ribbon: true,
};

export async function getSiteSettings(): Promise<SiteSettings> {
    try {
        const response = await fetch(apiUrl('/site-settings'), { cache: 'no-store' });
        if (!response.ok) return defaultSiteSettings;

        const payload = await response.json();
        return {
            show_mourning_ribbon: payload.data?.show_mourning_ribbon ?? defaultSiteSettings.show_mourning_ribbon,
        };
    } catch {
        return defaultSiteSettings;
    }
}
