export interface Child {
  id?: string;
  name: string;
  class: string;
  image: File | null;
  schoolAttended: string;
  bootcampCourse: string;
  age: string;
  gender: string;
  allergies?: string; // Optional if not always provided
}

export interface Registration {
  parentName: string;
  parentEmail: string;
  parentPhone: string;
  parentAddress: string;
  imageOfDad: File | null;
  thirdpartyRelationship: string;
  children: Child[];
}