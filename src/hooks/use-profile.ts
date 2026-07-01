import { useMutation, useQuery } from '@tanstack/react-query';

import { api } from '@/lib/api';
import { queryClient } from '@/lib/query-client';
import type { ProfileResponse, UpdateProfileBody } from '@/types/user';

export function useProfile() {
  return useQuery({
    queryKey: ['profile'],
    queryFn: () => api.get<ProfileResponse>('/users/profile').then((r) => r.data),
  });
}

export function useUpdateProfile() {
  return useMutation({
    mutationFn: (body: UpdateProfileBody) =>
      api.patch<ProfileResponse>('/users/profile', body).then((r) => r.data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['profile'] });
    },
  });
}
