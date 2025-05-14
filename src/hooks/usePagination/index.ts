import { useState, useMemo } from 'react';
import type { UsePaginationProps, UsePaginationReturn } from './types';

export * from './types';

export function usePagination<T>({
  data,
  itemsPerPage,
  initialPage = 1,
}: UsePaginationProps<T>): UsePaginationReturn<T> {
  const [currentPage, setCurrentPage] = useState(() => initialPage);
  const [perPage, setPerPage] = useState(() => itemsPerPage);

  const totalPages = useMemo(
    () => Math.ceil(data.length / perPage),
    [data, perPage]
  );

  const currentData = useMemo(() => {
    const start = (currentPage - 1) * perPage;
    const end = start + perPage;
    return data.slice(start, end);
  }, [data, currentPage, perPage]);

  const nextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  const prevPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const goToPage = (page: number) => {
    const pageNumber = Math.max(1, Math.min(page, totalPages));
    setCurrentPage(pageNumber);
  };

  const gotoFirstPage = () => {
    goToPage(1);
  };
  const gotoLastPage = () => {
    goToPage(totalPages);
  };

  const setItemsPerPage = (items: number) => {
    setPerPage(items);
    setCurrentPage(1);
  };

  return {
    currentPage,
    totalPages,
    currentData,
    nextPage,
    prevPage,
    goToPage,
    gotoFirstPage,
    gotoLastPage,
    setItemsPerPage,
  };
}
