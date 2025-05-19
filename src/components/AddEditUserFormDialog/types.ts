import type { User } from '../../models';

export type AddEditUserFormType = 'add' | 'edit';

export interface UserFormFields {
  fname: string;
  lname: string;
  designation: string;
  email: string;
}

export interface AddEditUserFormDialogProps {
  type: AddEditUserFormType;
  open: boolean;
  user?: User;
  onClose?: () => void;
  onSubmit?: (user: User) => void;
}
