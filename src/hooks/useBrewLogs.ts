import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiFetch } from '@/lib/api-client';
import type { BrewLog, BrewLogFormData } from '@/types';

export function useBrewLogs() {
  return useQuery({
    queryKey: ['brew-logs'],
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
    onSuccess: () => qc.invalidateQueries({ queryKey: ['brew-logs'] }),
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
    onSuccess: () => qc.invalidateQueries({ queryKey: ['brew-logs'] }),
  });
}

export function useDeleteBrewLog() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (documentId: string) =>
      apiFetch(`/brew-logs/${documentId}`, { method: 'DELETE' }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['brew-logs'] }),
  });
}
