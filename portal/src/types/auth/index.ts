export interface SignUpRequest {
  email: string;
  password: string;
  name: string;
}

export interface SignInRequest {
  email: string;
  password: string;
}

export interface User {
  id: string;
  email: string;
  name?: string;
  createdAt: string;
  updatedAt: string;
  organization?: string;
  profession?: string;
  howDidYouHearAboutUs?: string;
  schoolName?: string;
  yearsOfExperience?: number;
  subjectsTaught?: string;
  gradeLevel?: string;
  educationalQualification?: string;
  teacherLicenseNumber?: string;
}

export interface AuthResponse {
  user: User;
  token: string;
}
