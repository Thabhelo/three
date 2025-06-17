export type Sex = 'Male' | 'Female' | 'Other' | 'Prefer not to say';

export type SleepCommitment = 'Yes' | 'Try' | 'Suggest other';

export type Availability = 'Yes' | 'No' | 'Suggest alt';

export type FilmingPermission = 'Yes' | 'Yes blurred' | 'No';

export interface DreamSprintFormData {
  // About You
  fullName: string;
  sex: Sex;
  genderIdentity: string;
  email: string;
  phoneNumber: string;
  preferredChat: 'WhatsApp' | 'iMessage' | 'Instagram';
  cityCountry: string;
  age: number;
  currentOccupation: string;
  schoolOrCompany: string;
  linkedinUrl: string;
  socialMedia?: string;

  // Brag Zone
  achievements: string;
  houseCompatibility: string;

  // The Project
  projectDescription: string;
  projectCompletion: string;
  projectImportance: string;
  projectTools: string;

  // Work Style & Logistics
  deepWorkExperience: string;
  focusMethods: string;
  sleepCommitment: SleepCommitment;
  idealSleepAmount: string;

  // Planning Input
  availability: Availability;
  locationPreference: string;
  costSavingIdeas: string;
  dietaryRestrictions: string;
  filmingPermission: FilmingPermission;

  // Devotion & Consent
  committedToWork: boolean;
  understandsNotVacation: boolean;
  acceptsLiability: boolean;

  // Final Notes
  additionalNotes?: string;
} 