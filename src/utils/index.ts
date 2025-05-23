import { addHours, isWithinInterval, parse } from 'date-fns';
import { UserMockService } from '../mockService';
import type { FilterFn } from '../types';

export const EmailRegex =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export const delay = (duration = 600) =>
  new Promise<void>((resolve) => {
    setTimeout(resolve, duration);
  });

export const isError = (error: unknown) => error instanceof Error;

export const getInitials = (fname: string, lname: string) =>
  `${fname?.[0]?.toUpperCase() ?? ''}${lname?.[0]?.toUpperCase() ?? ''}`;

export const makeFullName = (fname: string, lname: string) =>
  `${fname} ${lname}`;

export const canShowApplyLeaveButton = () => {
  const now = new Date();
  const officeHours = UserMockService.getOfficeHours();

  const startTimeToday = parse(
    officeHours.startTime ?? '',
    'hh:mm a',
    new Date()
  );

  const oneHourAfterStart = addHours(startTimeToday, 1);

  return isWithinInterval(now, {
    start: startTimeToday,
    end: oneHourAfterStart,
  });
};

export const safeParseNumber = (value: string, defaultValue = -1) => {
  try {
    const parsedValue = Number(value);
    return isNaN(parsedValue) ? defaultValue : parsedValue;
  } catch (error) {
    console.log('Unable to parse ', value, error);
    return defaultValue;
  }
};

export const filterByKeys = <T>(
  data: T[],
  filterKeys: Array<keyof T>,
  searchTerm: string
): T[] => {
  if (searchTerm.trim() === '') {
    return data;
  }

  const lowerCaseSearchTerm = searchTerm.toLowerCase();

  return data.filter((item) => {
    const filterBy = filterKeys
      .map((key) => String(item[key])?.toLocaleLowerCase())
      .join(' ');

    return filterBy.includes(lowerCaseSearchTerm);
  });
};

export const filterByFilterFn = <T>(
  data: T[],
  searchTerm: string,
  filterFn: FilterFn<T>
): T[] => {
  if (searchTerm.trim() === '') {
    return data;
  }

  const lowerCaseSearchTerm = searchTerm.toLowerCase();

  return data.filter((item) => filterFn(item, lowerCaseSearchTerm));
};

export const isEmailValid = (email: string) => EmailRegex.test(email);
