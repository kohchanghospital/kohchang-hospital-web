import api from './api';

export async function getCurrentUser() {
    try {
        const res = await api.get('/api/me'); // หรือ /api/me
        return res.data;
    } catch (error) {
        return null;
    }
}
