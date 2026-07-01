export type DeedCategory = {
  id: string;
  key: string;
  name: string;
  description: string;
};

export type UserDeedConfig = {
  id: string;
  user_id: string;
  category_id: DeedCategory;
  deed_sub_category_id: string | null;
  isConfigured: boolean;
  config: Record<string, unknown>;
};
