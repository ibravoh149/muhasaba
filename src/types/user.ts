export type NotificationConfig = {
  notification_time: { hour: number; minute: number };
};

export type NotificationSettings = {
  has_subscribed_for_push_notification: boolean;
  push_notification_tokens: string[];
  salat_notification: {
    is_on: boolean;
    salat_notification_config: NotificationConfig | null;
  };
  fasting_notification: {
    is_on: boolean;
    fasting_notification_config: NotificationConfig | null;
  };
  daily_notification: {
    is_on: boolean;
    daily_notification_config: {
      notification_time: { minute: number; hour: number };
    } | null;
  };
};

export type UserLocation = {
  country: string | null;
  city: string | null;
  latitude: number | null;
  longitude: number | null;
  timezone: string | null;
};

export type ProfileResponse = {
  _id: string;
  user_id: string;
  first_name: string;
  last_name: string;
  avatar: string | null;
  phone: string | null;
  gender: string | null;
  location: UserLocation;
  language: string | null;
  onboarding_completed: boolean;
  notification: NotificationSettings;
  createdAt: string;
  updatedAt: string;
};

export type UpdateProfileBody = {
  first_name?: string;
  last_name?: string;
  phone?: string;
  avatar?: string;
  language?: string;
  location?: Partial<UserLocation>;
};

export type UpdateNotificationSettingBody = {
  push_notification_token?: string;
  has_subscribed_for_push_notification?: boolean;
  salat_notification?: {
    is_on: boolean;
    salat_notification_config?: NotificationConfig;
  };
  daily_notification?: {
    is_on: boolean;
    daily_notification_config?: {
      notification_time: { hour: number; minute: number };
    };
  };
  fasting_notification?: {
    is_on: boolean;
    fasting_notification_config?: NotificationConfig;
  };
};
