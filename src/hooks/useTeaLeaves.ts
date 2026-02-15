import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiFetch } from '@/lib/api-client';
import type { TeaLeaf, TeaLeafFormData } from '@/types';

const KEY = ['tea-leaves'] as const;

export function useTeaLeaves() {
  return useQuery({
    queryKey: KEY,
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
    onMutate: async (newData) => {
      await qc.cancelQueries({ queryKey: KEY });
      const previous = qc.getQueryData<TeaLeaf[]>(KEY);
      qc.setQueryData<TeaLeaf[]>(KEY, (old) => [
        ...(old ?? []),
        { ...newData, id: Date.now(), documentId: `temp-${Date.now()}`, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() } as TeaLeaf,
      ]);
      return { previous };
    },
    onError: (_err, _vars, context) => {
      if (context?.previous) qc.setQueryData(KEY, context.previous);
    },
    onSettled: async () => { await qc.invalidateQueries({ queryKey: KEY }); },
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
    onMutate: async ({ documentId, data }) => {
      await qc.cancelQueries({ queryKey: KEY });
      const previous = qc.getQueryData<TeaLeaf[]>(KEY);
      qc.setQueryData<TeaLeaf[]>(KEY, (old) =>
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

export function useDeleteTeaLeaf() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (documentId: string) =>
      apiFetch(`/tea-leaves/${documentId}`, { method: 'DELETE' }),
    onMutate: async (documentId) => {
      await qc.cancelQueries({ queryKey: KEY });
      const previous = qc.getQueryData<TeaLeaf[]>(KEY);
      qc.setQueryData<TeaLeaf[]>(KEY, (old) =>
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
