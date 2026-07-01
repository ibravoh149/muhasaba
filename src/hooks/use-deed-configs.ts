import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { api } from '@/lib/api';
import type { UserDeedConfig } from '@/types/deed';

export function useUserDeedConfigs() {
  return useQuery({
    queryKey: ['user-deed-configs'],
    queryFn: async () => {
      const { data } = await api.get<UserDeedConfig[]>('/users-deeds-config/get-categories');
      return data;
    },
  });
}

export function useAddDeedCategories() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (ids: string[]) =>
      api.post('/users-deeds-config/add-category', { category_id: ids }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user-deed-configs'] });
    },
  });
}
