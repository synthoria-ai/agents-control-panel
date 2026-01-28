import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/api';

export const useMetrics = () => {
    return useQuery({
        queryKey: ['metrics'],
        queryFn: () => api.get('/metrics'),
        refetchInterval: 10000,
    });
};
