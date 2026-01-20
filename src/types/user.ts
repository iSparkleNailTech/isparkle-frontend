export interface UserResponse {
  _id: string;
  supabaseUserId: string;
  email: string;
  name: string;
  phone?: string;
  createdAt: string;
  updatedAt: string;
}

export interface UpdateUserRequest {
  name?: string;
  phone?: string;
}
