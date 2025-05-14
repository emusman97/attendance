import type { Attendances, AttendanceStatus, UserId, Users } from '../models';
import type { UserCredentials } from '../state/slices';

function generateRandomAttendance() {
  const attendanceData: Attendances = [];

  for (let i = 0; i < 1000; i++) {
    const month = Math.floor(Math.random() * 12) + 1;
    const day = Math.floor(Math.random() * 28) + 1; // Using 28 to avoid invalid dates
    const date = `${month.toString().padStart(2, '0')}/${day.toString().padStart(2, '0')}/2022`;

    const random = Math.random();
    let status: AttendanceStatus;
    if (random < 0.6) {
      status = 'present';
    } else if (random < 0.9) {
      status = 'absent';
    } else {
      status = 'leave';
    }

    attendanceData.push({
      id: i.toString(),
      date,
      status,
    });
  }

  return attendanceData;
}

function createUserMockService() {
  const users: Users = [
    {
      id: 'ADM-001',
      fname: 'Super',
      lname: 'Admin',
      passwordChanged: true,
      pincode: '9999',
      role: 'admin',
    },
    {
      id: 'SE-000',
      fname: 'Test',
      lname: 'User',
      passwordChanged: false,
      pincode: '0000',
      role: 'user',
    },
  ];
  const attendance: Record<UserId, Attendances> = {
    'SE-000': generateRandomAttendance(),
  };
  const officeHours = {
    startTime: '09:00 AM',
    finishTime: '6:00 PM',
    workingHours: 8,
  };

  const findUser = (creds: UserCredentials) =>
    users.find(
      (user) =>
        user.fname?.toLocaleLowerCase() === creds.username &&
        creds.pincode === user.pincode
    );
  const changePincode = (id: UserId, newPincode: string) => {
    const userIndex = users.findIndex((user) => user.id === id);

    if (userIndex !== -1) {
      users[userIndex] = {
        ...users[userIndex],
        pincode: newPincode,
        passwordChanged: true,
      };
    }
  };
  const findAttendance = (userId: UserId) => attendance?.[userId] ?? [];
  const filterAttendance = (userId: UserId, by: AttendanceStatus) =>
    findAttendance(userId)?.filter((attendance) => attendance.status === by);
  const getOfficeHours = () => officeHours;

  return {
    findUser,
    changePincode,
    findAttendance,
    filterAttendance,
    getOfficeHours,
  };
}

export const UserMockService = createUserMockService();
