export interface User {
  id?: string;
  fname?: string;
  lname?: string;
  designation?: string;
  email?: string;
  pincode?: string;
  passwordChanged?: boolean;
}

export type Users = User[];
