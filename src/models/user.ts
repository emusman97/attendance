export interface User {
  id?: string;
  fname?: string;
  lname?: string;
  designation?: string;
  designationCode?: string;
  email?: string;
  pincode?: string;
  passwordChanged?: boolean;
  role?: UserRole;
}

export type UserId = NonNullable<User['id']>;
export type UserIds = UserId[];

export type Users = User[];

export type UserRole = 'admin' | 'user';
export type UserRoles = UserRole[];
