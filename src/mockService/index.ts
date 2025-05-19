import { faker } from '@faker-js/faker';
import type {
  Attendances,
  AttendanceStatus,
  OfficeHours,
  User,
  UserId,
  Users,
} from '../models';
import type { UserCredentials } from '../state/slices';
import { DefaultPinCode } from '../constants';

function generateRandomAttendance() {
  const attendanceData: Attendances = [];

  for (let i = 0; i < 1000; i++) {
    const month = Math.floor(Math.random() * 12) + 1;
    const day = Math.floor(Math.random() * 28) + 1;
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

export const SoftwareDesignations = [
  { title: 'Software Engineer', code: 'SE' },
  { title: 'Senior Software Engineer', code: 'SSE' },
  { title: 'Principal Software Engineer', code: 'PSE' },
  { title: 'Frontend Developer', code: 'FE' },
  { title: 'Backend Developer', code: 'BE' },
  { title: 'Full Stack Developer', code: 'FS' },
  { title: 'DevOps Engineer', code: 'DO' },
  { title: 'QA Engineer', code: 'QA' },
  { title: 'Test Automation Engineer', code: 'TA' },
  { title: 'Software Architect', code: 'SA' },
  { title: 'Technical Lead', code: 'TL' },
  { title: 'Engineering Manager', code: 'EM' },
  { title: 'CTO', code: 'CTO' },
  { title: 'Product Manager', code: 'PM' },
  { title: 'Project Manager', code: 'PJM' },
  { title: 'Scrum Master', code: 'SM' },
  { title: 'UI/UX Designer', code: 'UX' },
  { title: 'Data Scientist', code: 'DS' },
  { title: 'Machine Learning Engineer', code: 'ML' },
  { title: 'Database Administrator', code: 'DBA' },
  { title: 'Systems Analyst', code: 'SYS' },
  { title: 'Cloud Architect', code: 'CA' },
  { title: 'Security Engineer', code: 'SEC' },
  { title: 'Mobile Developer', code: 'MD' },
  { title: 'Embedded Systems Engineer', code: 'ESE' },
];

function generateUser(index: number): User {
  const firstName = faker.person.firstName();
  const lastName = faker.person.lastName();
  const designationObj = faker.helpers.arrayElement(SoftwareDesignations);
  const designation = designationObj.title;
  const designationCode = designationObj.code;
  const email = faker.internet.email({
    firstName,
    lastName,
    provider: 'example.com',
  });

  const idNumber = (index + 1).toString().padStart(3, '0');
  const id = `${designationCode}-${idNumber}`;

  return {
    id,
    fname: firstName,
    lname: lastName,
    email,
    designation,
    designationCode,
    role: 'user',
    pincode: DefaultPinCode,
  };
}

function createUserMockService() {
  let users: Users = [
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
    ...Array.from({ length: 999 }, (_, i) => generateUser(i)),
  ];
  const attendance: Record<UserId, Attendances> = users.reduce(
    (acc, currUser) => {
      acc[currUser.id ?? ''] = generateRandomAttendance();

      return acc;
    },
    {} as Record<UserId, Attendances>
  );
  let officeHours: OfficeHours = {
    startTime: '09:00 AM',
    finishTime: '5:00 PM',
    workingHours: '8',
  };

  const getUsers = () => users;

  const findUser = (creds: UserCredentials) =>
    users.find(
      (user) =>
        user.fname?.toLocaleLowerCase() === creds.username &&
        creds.pincode === user.pincode
    );
  const findUserById = (userId: UserId) =>
    users.find((user) => user.id === userId);
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
  const setOfficeHours = (newHours: OfficeHours) => {
    officeHours = newHours;
  };
  const addUser = (newUser: User) => {
    users.push(newUser);
  };
  const deleteUser = (userId: UserId) => {
    users = users.filter((user) => user.id !== userId);
  };
  const editUser = (userId: UserId, updatedUser: User) => {
    users = users.map((user) => {
      if (user.id === userId) {
        return { ...user, updatedUser };
      }

      return user;
    });
  };

  return {
    addUser,
    editUser,
    deleteUser,
    getUsers,
    findUser,
    findUserById,
    changePincode,
    findAttendance,
    filterAttendance,
    getOfficeHours,
    setOfficeHours,
  };
}

export const UserMockService = createUserMockService();
