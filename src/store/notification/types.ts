export interface NotificationState {
  loading: boolean;
  error: boolean | string;
  notifications?: any[];
}

export interface NotificationHookReturn extends NotificationState {
  setError: (error: boolean | string) => void;
  getNotifications: () => any;
}

// export interface Lead {
//   id: number;
//   body: string;
//   created_at: string;
//   has_liked: boolean;
//   has_commented: boolean;
//   comments: Comment[];
//   user: User;
//   media_files: MediaFiles[];
//   likes_count: number;
//   comments_count: number;
// }
