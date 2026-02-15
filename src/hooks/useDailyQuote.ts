import { useQuery } from '@tanstack/react-query';
import { API_URL } from '@/lib/constants';

interface Sentence {
  id: number;
  text: string;
  category: string;
  theme_ko: string;
  source: string;
}

function getDailyIndex(total: number): number {
  const now = new Date();
  const dayOfYear = Math.floor(
    (now.getTime() - new Date(now.getFullYear(), 0, 0).getTime()) / 86400000,
  );
  return dayOfYear % total;
}

async function fetchSentences(): Promise<Sentence[]> {
  const res = await fetch(`${API_URL}/sentences.json`);
  if (!res.ok) throw new Error('Failed to fetch sentences');
  return res.json();
}

export function useDailyQuote() {
  const { data: sentences, isLoading } = useQuery({
    queryKey: ['sentences'],
    queryFn: fetchSentences,
    staleTime: 24 * 60 * 60 * 1000,
    gcTime: 24 * 60 * 60 * 1000,
  });

  if (!sentences || sentences.length === 0) {
    return { quote: null, isLoading };
  }

  const index = getDailyIndex(sentences.length);
  const sentence = sentences[index];

  return {
    quote: { text: sentence.text, theme_ko: sentence.theme_ko },
    isLoading,
  };
}
