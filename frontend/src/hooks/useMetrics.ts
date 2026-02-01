import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/api';

export const useMetrics = () => {
    return useQuery({
        queryKey: ['metrics'],
        queryFn: async () => {
            try {
                return await api.get('/metrics');
            } catch (error) {
                // Metrics endpoint doesn't exist yet, return empty object
                console.warn('Metrics endpoint not available:', error);
                return {};
            }
        },
        refetchInterval: 10000,
        retry: false, // Don't retry if metrics endpoint doesn't exist
    });
};
