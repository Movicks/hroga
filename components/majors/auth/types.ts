export interface Involvement {
  attendReunion: boolean;
  joinCommittee: boolean;
  contributeFundraising: boolean;
  mentorStudents: boolean;
  shareStory: boolean;
  serveExec: boolean;
}

export interface Address {
  country: string;
  state: string;
  city: string;
  addressLine: string;
}

export interface FormData {
  // Personal Info
  firstName: string;
  middleName: string;
  lastName: string;
  maidenName: string;
  graduationYear: string;
  dateOfBirth: string;
  gender: string;
  email: string;
  phoneNumber: string;
  whatsappNumber: string;
  country: string;
  stateCity: string;
  homeAddress: string;
  password: string;
  image: string;
  // School Details
  entryYear: string;
  house: string;
  classArm: string;
  formTeacher: string;
  positionsHeld: string;
  clubsSocieties: string;
  favoriteMemory: string;
  classmates: string;
  // Life after school
  currentOccupation: string;
  jobTitle: string;
  organisation: string;
  industry: string;
  highestQualification: string;
  institutionAttended: string;
  maritalStatus: string;
  spouseName: string;
  numberOfChildren: string;
  numberOfGrandchildren: string;
  yourStory: string;
  // Get involved
  involvement: Involvement;
  howHeard: string;
  referralName: string;
  socialMedia: {
    linkedIn: string;
    facebook: string;
    whatsApp: string;
  };
  acceptTerms: boolean;
  // Required for API
  currentAddress: Address;
  permanentAddress: Address;
}

export const initialFormData: FormData = {
  // Personal Info
  firstName: '',
  middleName: '',
  lastName: '',
  maidenName: '',
  graduationYear: '',
  dateOfBirth: '',
  gender: '',
  email: '',
  phoneNumber: '',
  whatsappNumber: '',
  country: '',
  stateCity: '',
  homeAddress: '',
  image: '',
  password: '',
  // School Details
  entryYear: '',
  house: '',
  classArm: '',
  formTeacher: '',
  positionsHeld: '',
  clubsSocieties: '',
  favoriteMemory: '',
  classmates: '',
  // Life after school
  currentOccupation: '',
  jobTitle: '',
  organisation: '',
  industry: '',
  highestQualification: '',
  institutionAttended: '',
  maritalStatus: '',
  spouseName: '',
  numberOfChildren: '',
  numberOfGrandchildren: '',
  yourStory: '',
  // Get involved
  involvement: {
    attendReunion: false,
    joinCommittee: false,
    contributeFundraising: false,
    mentorStudents: false,
    shareStory: false,
    serveExec: false,
  },
  howHeard: '',
  referralName: '',
  socialMedia: {
    linkedIn: '',
    facebook: '',
    whatsApp: '',
  },
  acceptTerms: false,
  // Required for API
  currentAddress: {
    country: '',
    state: '',
    city: '',
    addressLine: '',
  },
  permanentAddress: {
    country: '',
    state: '',
    city: '',
    addressLine: '',
  },
};

export const stepNames = [
  'Personal Info',
  'School details',
  'Life after school',
  'Get involved',
];
