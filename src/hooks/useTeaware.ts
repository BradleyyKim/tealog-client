import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiFetch } from '@/lib/api-client';
import type { Teaware, TeawareFormData } from '@/types';

export function useTeawares() {
  return useQuery({
    queryKey: ['teawares'],
    queryFn: () => apiFetch<{ data: Teaware[] }>('/teawares').then((r) => r.data),
  });
}

export function useTeaware(documentId: string | undefined) {
  return useQuery({
    queryKey: ['teawares', documentId],
    queryFn: () =>
      apiFetch<{ data: Teaware }>(`/teawares/${documentId}?populate=photo`).then(
        (r) => r.data,
      ),
    enabled: !!documentId,
  });
}

export function useCreateTeaware() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: TeawareFormData) =>
      apiFetch<{ data: Teaware }>('/teawares', {
        method: 'POST',
        body: JSON.stringify({ data }),
      }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['teawares'] }),
  });
}

export function useUpdateTeaware() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ documentId, data }: { documentId: string; data: Partial<TeawareFormData> }) =>
      apiFetch<{ data: Teaware }>(`/teawares/${documentId}`, {
        method: 'PUT',
        body: JSON.stringify({ data }),
      }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['teawares'] }),
  });
}

export function useDeleteTeaware() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (documentId: string) =>
      apiFetch(`/teawares/${documentId}`, { method: 'DELETE' }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['teawares'] }),
  });
}
