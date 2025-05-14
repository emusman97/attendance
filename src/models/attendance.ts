export type AttendanceStatus = 'present' | 'absent' | 'leave';

export interface Attendance {
  id?: string;
  date?: string;
  status?: AttendanceStatus;
}
export type Attendances = Attendance[];
