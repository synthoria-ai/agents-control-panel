import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/lib/api';
import { toast } from 'sonner';

export const useAgents = () => {
    return useQuery({
        queryKey: ['agents'],
        queryFn: () => api.get('/agents'),
        refetchInterval: 10000,
    });
};

export const useAgent = (id: string) => {
    return useQuery({
        queryKey: ['agents', id],
        queryFn: () => api.get(`/agents/${id}`),
        refetchInterval: 5000,
    });
}
