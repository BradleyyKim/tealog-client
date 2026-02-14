import { useMutation } from '@tanstack/react-query';
import { apiUpload } from '@/lib/api-client';

export function useUpload() {
  return useMutation({
    mutationFn: (file: File) => apiUpload(file),
  });
}
