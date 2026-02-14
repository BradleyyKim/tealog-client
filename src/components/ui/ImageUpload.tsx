import { useRef, useState } from 'react';
import { useUpload } from '@/hooks/useUpload';
import { useI18n } from '@/contexts/I18nContext';
import { getImageUrl } from '@/lib/utils';
import toast from 'react-hot-toast';

interface ImageUploadProps {
  currentUrl?: string;
  onUploaded: (id: number) => void;
}

export default function ImageUpload({ currentUrl, onUploaded }: ImageUploadProps) {
  const fileRef = useRef<HTMLInputElement>(null);
  const upload = useUpload();
  const { t } = useI18n();
  const [preview, setPreview] = useState<string | null>(null);

  const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setPreview(URL.createObjectURL(file));

    try {
      const result = await upload.mutateAsync(file);
      onUploaded(result.id);
    } catch {
      toast.error(t('toast.uploadFailed'));
      setPreview(null);
    }
  };

  const displayUrl = preview || (currentUrl ? getImageUrl(currentUrl) : null);

  return (
    <div>
      <input type="file" ref={fileRef} onChange={handleFile} accept="image/*" className="hidden" />
      <button
        type="button"
        onClick={() => fileRef.current?.click()}
        className="w-full h-40 rounded-xl border-2 border-dashed border-neutral-light dark:border-neutral-dark/50 flex flex-col items-center justify-center gap-2 hover:border-primary/50 transition-colors overflow-hidden relative"
      >
        {displayUrl ? (
          <img src={displayUrl} alt="Preview" className="absolute inset-0 w-full h-full object-cover" />
        ) : (
          <>
            <span className="material-icons-outlined text-3xl text-text-muted">add_a_photo</span>
            <span className="text-xs text-text-muted font-medium">
              {upload.isPending ? t('component.uploading') : t('component.addPhoto')}
            </span>
          </>
        )}
      </button>
    </div>
  );
}
