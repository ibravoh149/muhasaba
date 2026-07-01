import { useQuery } from '@tanstack/react-query';

import { api } from '@/lib/api';
import type { DeedCategory } from '@/types/deed';

export function useDeedCategories() {
  return useQuery({
    queryKey: ['deed-categories'],
    queryFn: async () => {
      const { data } = await api.get<DeedCategory[]>('/config/deed-categories');
      return data;
    },
    staleTime: 24 * 60 * 60 * 1000,
  });
}
