import { Course } from './course';
import { Lesson } from './lesson';
import { Student } from './student';
import { UserAuth } from './user-auth';

export const students: Student[] = [
  {
    id: '1',
    firstName: 'Roman',
    lastName: 'Riquelme',
    email: 'topo@gmail.com',
    pic: 'https://tn.com.ar/resizer/TGDqRgSxa_hMqEze5BC-tarM0Yo=/767x0/smart/cloudfront-us-east-1.images.arcpublishing.com/artear/QLNSCUL7PZIBGS27B4XQPOQ4EU.jpg',
  },
  {
    id: '2',
    firstName: 'Ringo',
    lastName: 'Starr',
    email: 'ringo@gmail.com',
    pic: 'https://www.latercera.com/resizer/7nvCCPSbaeq9KZW9-aWXldE8PDw=/900x600/smart/cloudfront-us-east-1.images.arcpublishing.com/copesa/564WPHDOMNBQJHDKVJL6JFCOUY.jpg',
  },
  {
    id: '3',
    firstName: 'Lars',
    lastName: 'Ulrich',
    email: 'mitallicxxx@gmail.com',
    pic: '',
  },
];

export const courses: Course[] = [
  {
    id: '1',
    name: 'Angular 2',
  },
  {
    id: '2',
    name: 'React JS',
  },
  {
    id: '3',
    name: 'C#',
  },
];

export const lessons: Lesson[] = [
  {
    id: getfakeId(),
    studentId: '1',
    courseId: '1',
  },
  {
    id: getfakeId(),
    studentId: '1',
    courseId: '2',
  },
  {
    id: getfakeId(),
    studentId: '2',
    courseId: '2',
  },
  {
    id: getfakeId(),
    studentId: '3',
    courseId: '3',
  },
];

export function getfakeId() {
  return Math.ceil(Math.random() * 1000000000).toString();
}

export const userAuth: UserAuth[] = [
  { userName: 'admin', pass: 'admin', profile: 'admin', islogin: false },
  { userName: 'user', pass: 'user', profile: 'user', islogin: false },
];
