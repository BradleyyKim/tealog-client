import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiFetch } from '@/lib/api-client';
import type { TeaLeaf, TeaLeafFormData } from '@/types';

export function useTeaLeaves() {
  return useQuery({
    queryKey: ['tea-leaves'],
    queryFn: () => apiFetch<{ data: TeaLeaf[] }>('/tea-leaves').then((r) => r.data),
  });
}

export function useTeaLeaf(documentId: string | undefined) {
  return useQuery({
    queryKey: ['tea-leaves', documentId],
    queryFn: () =>
      apiFetch<{ data: TeaLeaf }>(`/tea-leaves/${documentId}?populate=cover_photo`).then(
        (r) => r.data,
      ),
    enabled: !!documentId,
  });
}

export function useCreateTeaLeaf() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: TeaLeafFormData) =>
      apiFetch<{ data: TeaLeaf }>('/tea-leaves', {
        method: 'POST',
        body: JSON.stringify({ data }),
      }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['tea-leaves'] }),
  });
}

export function useUpdateTeaLeaf() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ documentId, data }: { documentId: string; data: Partial<TeaLeafFormData> }) =>
      apiFetch<{ data: TeaLeaf }>(`/tea-leaves/${documentId}`, {
        method: 'PUT',
        body: JSON.stringify({ data }),
      }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['tea-leaves'] }),
  });
}

export function useDeleteTeaLeaf() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (documentId: string) =>
      apiFetch(`/tea-leaves/${documentId}`, { method: 'DELETE' }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['tea-leaves'] }),
  });
}
