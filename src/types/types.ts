export interface Child {
  name: string;
  class: string;
  image: File | null;
  schoolAttended: string;
  bootcampCourse: string;
  age: string;
}

export interface Registration {
  parentName: string;
  parentEmail: string;
  parentPhone: string;
  children: Child[];
}
