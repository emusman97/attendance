export interface SelectItem {
  title: string;
  value: string;
}
export type SelectItems = SelectItem[];

export type KeyOf<T> = keyof T;
export type KeysOf<T> = KeyOf<T>[];

export type FilterFn<T> = (value: T, searchTerm: string) => boolean;
