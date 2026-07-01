import { useMutation, useQuery } from '@tanstack/react-query';

import { api } from '@/lib/api';
import { queryClient } from '@/lib/query-client';
import type { NotificationSettings, UpdateNotificationSettingBody } from '@/types/user';

export function useNotificationSettings() {
  return useQuery({
    queryKey: ['notification-settings'],
    queryFn: () =>
      api.get<NotificationSettings>('/users/notification-settings').then((r) => r.data),
  });
}

export function useUpdateNotificationSettings() {
  return useMutation({
    mutationFn: (body: UpdateNotificationSettingBody) =>
      api.patch('/users/update-notification-setting', body).then((r) => r.data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notification-settings'] });
    },
  });
}
