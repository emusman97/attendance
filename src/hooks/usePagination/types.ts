export interface UsePaginationProps<T> {
  data: T[];
  itemsPerPage: number;
  initialPage?: number;
}

export interface UsePaginationReturn<T> {
  currentPage: number;
  totalPages: number;
  currentData: T[];
  nextPage: () => void;
  prevPage: () => void;
  goToPage: (page: number) => void;
  gotoFirstPage: (page: number) => void;
  gotoLastPage: (page: number) => void;
  setItemsPerPage: (items: number) => void;
}
