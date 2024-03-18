export interface UserState {
  loading: boolean;
  error: boolean | string;
}

export interface UserHookReturn extends UserState {
  setError: (error: boolean | string) => void;
  updateUser: (data: any) => any;
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
