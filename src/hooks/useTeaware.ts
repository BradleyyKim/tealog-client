import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiFetch } from '@/lib/api-client';
import type { Teaware, TeawareFormData } from '@/types';

const KEY = ['teawares'] as const;

export function useTeawares() {
  return useQuery({
    queryKey: KEY,
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
    onMutate: async (newData) => {
      await qc.cancelQueries({ queryKey: KEY });
      const previous = qc.getQueryData<Teaware[]>(KEY);
      qc.setQueryData<Teaware[]>(KEY, (old) => [
        ...(old ?? []),
        { ...newData, id: Date.now(), documentId: `temp-${Date.now()}`, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() } as Teaware,
      ]);
      return { previous };
    },
    onError: (_err, _vars, context) => {
      if (context?.previous) qc.setQueryData(KEY, context.previous);
    },
    onSettled: async () => { await qc.invalidateQueries({ queryKey: KEY }); },
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
    onMutate: async ({ documentId, data }) => {
      await qc.cancelQueries({ queryKey: KEY });
      const previous = qc.getQueryData<Teaware[]>(KEY);
      qc.setQueryData<Teaware[]>(KEY, (old) =>
        old?.map((item) =>
          item.documentId === documentId ? { ...item, ...data, updatedAt: new Date().toISOString() } : item,
        ),
      );
      return { previous };
    },
    onError: (_err, _vars, context) => {
      if (context?.previous) qc.setQueryData(KEY, context.previous);
    },
    onSettled: async () => { await qc.invalidateQueries({ queryKey: KEY }); },
  });
}

export function useDeleteTeaware() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (documentId: string) =>
      apiFetch(`/teawares/${documentId}`, { method: 'DELETE' }),
    onMutate: async (documentId) => {
      await qc.cancelQueries({ queryKey: KEY });
      const previous = qc.getQueryData<Teaware[]>(KEY);
      qc.setQueryData<Teaware[]>(KEY, (old) =>
        old?.filter((item) => item.documentId !== documentId),
      );
      return { previous };
    },
    onError: (_err, _vars, context) => {
      if (context?.previous) qc.setQueryData(KEY, context.previous);
    },
    onSettled: async () => { await qc.invalidateQueries({ queryKey: KEY }); },
  });
}
