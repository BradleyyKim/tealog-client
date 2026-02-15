import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiFetch } from '@/lib/api-client';
import type { BrewLog, BrewLogFormData } from '@/types';

const KEY = ['brew-logs'] as const;

export function useBrewLogs() {
  return useQuery({
    queryKey: KEY,
    queryFn: () => apiFetch<{ data: BrewLog[] }>('/brew-logs').then((r) => r.data),
  });
}

export function useBrewLog(documentId: string | undefined) {
  return useQuery({
    queryKey: ['brew-logs', documentId],
    queryFn: () =>
      apiFetch<{ data: BrewLog }>(
        `/brew-logs/${documentId}?populate[tea][populate]=cover_photo&populate[teawares][populate]=photo&populate=photos`,
      ).then((r) => r.data),
    enabled: !!documentId,
  });
}

export function useCreateBrewLog() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: BrewLogFormData) =>
      apiFetch<{ data: BrewLog }>('/brew-logs', {
        method: 'POST',
        body: JSON.stringify({ data }),
      }),
    onMutate: async (newData) => {
      await qc.cancelQueries({ queryKey: KEY });
      const previous = qc.getQueryData<BrewLog[]>(KEY);
      const { tea, teawares, ...scalar } = newData;
      qc.setQueryData<BrewLog[]>(KEY, (old) => [
        ...(old ?? []),
        { ...scalar, id: Date.now(), documentId: `temp-${Date.now()}`, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() } as BrewLog,
      ]);
      return { previous };
    },
    onError: (_err, _vars, context) => {
      if (context?.previous) qc.setQueryData(KEY, context.previous);
    },
    onSettled: async () => { await qc.invalidateQueries({ queryKey: KEY }); },
  });
}

export function useUpdateBrewLog() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ documentId, data }: { documentId: string; data: Partial<BrewLogFormData> }) =>
      apiFetch<{ data: BrewLog }>(`/brew-logs/${documentId}`, {
        method: 'PUT',
        body: JSON.stringify({ data }),
      }),
    onMutate: async ({ documentId, data }) => {
      await qc.cancelQueries({ queryKey: KEY });
      const previous = qc.getQueryData<BrewLog[]>(KEY);
      const { tea, teawares, ...scalar } = data;
      qc.setQueryData<BrewLog[]>(KEY, (old) =>
        old?.map((item) =>
          item.documentId === documentId ? { ...item, ...scalar, updatedAt: new Date().toISOString() } : item,
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

export function useDeleteBrewLog() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (documentId: string) =>
      apiFetch(`/brew-logs/${documentId}`, { method: 'DELETE' }),
    onMutate: async (documentId) => {
      await qc.cancelQueries({ queryKey: KEY });
      const previous = qc.getQueryData<BrewLog[]>(KEY);
      qc.setQueryData<BrewLog[]>(KEY, (old) =>
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
