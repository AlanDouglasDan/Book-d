export interface BookingState {
  loading: boolean;
  error: boolean | string;
  bookings?: any[];
}

export interface BookingHookReturn extends BookingState {
  setError: (error: boolean | string) => void;
  createBooking: (data: any) => any;
  updateBooking: (data: any) => any;
  deleteBooking: (data: any) => any;
  getBookings: () => any;
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
