// Note: We need to import the internal transformFormData function
// Since it's not exported, we'll test it through the submitApplication function
// or we need to export it for testing purposes

import { submitApplication } from '../applications';
import { supabase } from '../../lib/supabase';

// Mock modules
jest.mock('../../lib/supabase');

describe('Data Transformation Tests', () => {
  let mockFormData;
  
  beforeEach(() => {
    jest.clearAllMocks();
    console.error = jest.fn(); // Mock console.error
    
    // Setup default mock responses
    supabase.from.mockReturnValue({
      select: jest.fn().mockReturnValue({
        eq: jest.fn().mockReturnValue({
          single: jest.fn().mockResolvedValue({ data: null, error: null }) // No existing email
        })
      }),
      insert: jest.fn().mockReturnValue({
        select: jest.fn().mockReturnValue({
          single: jest.fn().mockResolvedValue({
            data: { id: '123', created_at: '2024-01-01T00:00:00Z' },
            error: null
          })
        })
      })
    });
    
    mockFormData = {
      aboutYou: {
        fullName: 'John Doe',
        sex: 'Male',
        genderIdentity: 'Male',
        email: 'john.doe@example.com',
        phone: '+1234567890',
        preferredChat: 'Email',
        location: 'New York, NY',
        age: '25',
        occupation: 'Developer',
        schoolOrCompany: 'TechCorp',
        linkedin: 'https://linkedin.com/in/johndoe',
        social: '@johndoe'
      },
      bragZone: {
        achievements: 'Built multiple React applications',
        greatHousemate: 'I am clean and organized'
      },
      theProject: {
        description: 'Building a React app',
        doneLookLike: 'MVP launched on Vercel',
        importance: 'Will help thousands of users',
        tools: 'React, Node.js, MongoDB'
      },
      workStyle: {
        experience: 'Previous hackathon experience',
        focusMethod: 'Pomodoro technique',
        sleepCommitment: '7-8 hours daily',
        idealSleep: '11pm-7am'
      },
      planningInput: {
        attendancePreference: 'In-person only',
        miamiOk: 'Yes, Miami works for me',
        costSavingIdeas: 'Shared accommodations',
        dietaryRestrictions: 'None',
        filmingPermission: 'Yes'
      },
      datePreferences: [
        { id: 'aug1-11', period: 'August 1-11', rank: 1 },
        { id: 'aug12-22', period: 'August 12-22', rank: 2 }
      ],
      consent: {
        commitment: true,
        notAVacation: true,
        liability: true
      },
      finalNotes: {
        anythingElse: 'Excited to participate!'
      }
    };
  });

  describe('Field Mapping Transformation', () => {
    test('should correctly map aboutYou fields to database schema', async () => {
      const result = await submitApplication(mockFormData);
      
      // Verify the transformation happened by checking the insert call
      const insertCall = supabase.from().insert;
      expect(insertCall).toHaveBeenCalledWith([
        expect.objectContaining({
          full_name: 'John Doe',
          sex: 'Male',
          gender_identity: 'Male',
          email: 'john.doe@example.com',
          phone: '+1234567890',
          preferred_chat: 'Email',
          location: 'New York, NY',
          age: 25, // Should be converted to number
          occupation: 'Developer',
          school_or_company: 'TechCorp',
          linkedin: 'https://linkedin.com/in/johndoe',
          social: '@johndoe'
        })
      ]);
    });

    test('should correctly map bragZone fields to database schema', async () => {
      await submitApplication(mockFormData);
      
      const insertCall = supabase.from().insert;
      expect(insertCall).toHaveBeenCalledWith([
        expect.objectContaining({
          achievements: 'Built multiple React applications',
          great_housemate: 'I am clean and organized'
        })
      ]);
    });

    test('should correctly map theProject fields to database schema', async () => {
      await submitApplication(mockFormData);
      
      const insertCall = supabase.from().insert;
      expect(insertCall).toHaveBeenCalledWith([
        expect.objectContaining({
          project_description: 'Building a React app',
          project_done_look_like: 'MVP launched on Vercel',
          project_importance: 'Will help thousands of users',
          project_tools: 'React, Node.js, MongoDB'
        })
      ]);
    });

    test('should correctly map workStyle fields to database schema', async () => {
      await submitApplication(mockFormData);
      
      const insertCall = supabase.from().insert;
      expect(insertCall).toHaveBeenCalledWith([
        expect.objectContaining({
          work_experience: 'Previous hackathon experience',
          focus_method: 'Pomodoro technique',
          sleep_commitment: '7-8 hours daily',
          ideal_sleep: '11pm-7am'
        })
      ]);
    });

    test('should correctly map planningInput fields to database schema', async () => {
      await submitApplication(mockFormData);
      
      const insertCall = supabase.from().insert;
      expect(insertCall).toHaveBeenCalledWith([
        expect.objectContaining({
          attendance_preference: 'In-person only',
          miami_ok: 'Yes, Miami works for me',
          cost_saving_ideas: 'Shared accommodations',
          dietary_restrictions: 'None',
          filming_permission: 'Yes'
        })
      ]);
    });

    test('should correctly map datePreferences to database schema', async () => {
      await submitApplication(mockFormData);
      
      const insertCall = supabase.from().insert;
      expect(insertCall).toHaveBeenCalledWith([
        expect.objectContaining({
          date_preferences: [
            { id: 'aug1-11', period: 'August 1-11', rank: 1 },
            { id: 'aug12-22', period: 'August 12-22', rank: 2 }
          ]
        })
      ]);
    });

    test('should correctly map consent fields to database schema', async () => {
      await submitApplication(mockFormData);
      
      const insertCall = supabase.from().insert;
      expect(insertCall).toHaveBeenCalledWith([
        expect.objectContaining({
          commitment_checkbox: true,
          not_vacation_checkbox: true,
          liability_checkbox: true
        })
      ]);
    });

    test('should correctly map finalNotes to database schema', async () => {
      await submitApplication(mockFormData);
      
      const insertCall = supabase.from().insert;
      expect(insertCall).toHaveBeenCalledWith([
        expect.objectContaining({
          anything_else: 'Excited to participate!'
        })
      ]);
    });
  });

  describe('Data Type Handling', () => {
    test('should handle age as integer correctly', async () => {
      const testData = { ...mockFormData };
      testData.aboutYou.age = '30';
      
      await submitApplication(testData);
      const insertCall = supabase.from().insert;
      expect(insertCall).toHaveBeenCalledWith([
        expect.objectContaining({
          age: 30 // Should be converted to number
        })
      ]);
    });

    test('should handle boolean consent values correctly', async () => {
      await submitApplication(mockFormData);
      const insertCall = supabase.from().insert;
      expect(insertCall).toHaveBeenCalledWith([
        expect.objectContaining({
          commitment_checkbox: true,
          not_vacation_checkbox: true,
          liability_checkbox: true
        })
      ]);
    });

    test('should handle array data structures correctly', async () => {
      await submitApplication(mockFormData);
      const insertCall = supabase.from().insert;
      expect(insertCall).toHaveBeenCalledWith([
        expect.objectContaining({
          date_preferences: expect.arrayContaining([
            expect.objectContaining({ rank: 1 }),
            expect.objectContaining({ rank: 2 })
          ])
        })
      ]);
    });
  });

  describe('Missing or Empty Fields Handling', () => {
    test('should handle missing optional fields gracefully', async () => {
      const minimalData = {
        aboutYou: {
          fullName: 'John Doe',
          email: 'john.doe@example.com',
          phone: '+1234567890',
          age: '25',
          linkedin: 'https://linkedin.com/in/johndoe'
        },
        bragZone: {
          achievements: 'Some achievements',
          greatHousemate: 'Good housemate'
        },
        theProject: {
          description: 'A project',
          doneLookLike: 'Done',
          importance: 'Important',
          tools: 'Tools'
        },
        workStyle: {},
        planningInput: {},
        datePreferences: [],
        consent: {
          commitment: true,
          notAVacation: true,
          liability: true
        },
        finalNotes: {}
      };

      await submitApplication(minimalData);
      const insertCall = supabase.from().insert;
      
      // Required fields should be present
      expect(insertCall).toHaveBeenCalledWith([
        expect.objectContaining({
          full_name: 'John Doe',
          email: 'john.doe@example.com'
        })
      ]);
    });

    test('should handle empty strings correctly', async () => {
      const dataWithEmptyStrings = { ...mockFormData };
      dataWithEmptyStrings.aboutYou.sex = '';
      dataWithEmptyStrings.aboutYou.social = '';

      await submitApplication(dataWithEmptyStrings);
      const insertCall = supabase.from().insert;
      expect(insertCall).toHaveBeenCalledWith([
        expect.objectContaining({
          sex: '',
          social: ''
        })
      ]);
    });

    test('should handle null and undefined values', async () => {
      const dataWithNulls = { ...mockFormData };
      dataWithNulls.aboutYou.sex = null;
      dataWithNulls.aboutYou.social = undefined;

      await submitApplication(dataWithNulls);
      const insertCall = supabase.from().insert;
      expect(insertCall).toHaveBeenCalledWith([
        expect.objectContaining({
          sex: null,
          social: undefined
        })
      ]);
    });
  });

  describe('Complex Data Structure Transformation', () => {
    test('should preserve datePreferences array structure and order', async () => {
      const complexDatePrefs = [
        { id: 'aug1-11', period: 'August 1-11', rank: 1 },
        { id: 'aug12-22', period: 'August 12-22', rank: 2 },
        { id: 'aug23-31', period: 'August 23-31', rank: 3 }
      ];
      
      const testData = { ...mockFormData };
      testData.datePreferences = complexDatePrefs;

      await submitApplication(testData);
      const insertCall = supabase.from().insert;
      expect(insertCall).toHaveBeenCalledWith([
        expect.objectContaining({
          date_preferences: complexDatePrefs
        })
      ]);
    });

    test('should handle empty datePreferences array', async () => {
      const testData = { ...mockFormData };
      testData.datePreferences = [];

      await submitApplication(testData);
      const insertCall = supabase.from().insert;
      expect(insertCall).toHaveBeenCalledWith([
        expect.objectContaining({
          date_preferences: []
        })
      ]);
    });
  });

  describe('Field Name Conversion Accuracy', () => {
    test('should convert camelCase to snake_case correctly', async () => {
      await submitApplication(mockFormData);
      const insertCall = supabase.from().insert;
      
      // Verify all snake_case conversions
      const expectedSnakeCaseFields = [
        'full_name',
        'gender_identity',
        'preferred_chat',
        'school_or_company',
        'great_housemate',
        'project_description',
        'project_done_look_like',
        'project_importance',
        'project_tools',
        'work_experience',
        'focus_method',
        'sleep_commitment',
        'ideal_sleep',
        'attendance_preference',
        'miami_ok',
        'cost_saving_ideas',
        'dietary_restrictions',
        'filming_permission',
        'date_preferences',
        'commitment_checkbox',
        'not_vacation_checkbox',
        'liability_checkbox',
        'anything_else'
      ];
      
      expectedSnakeCaseFields.forEach(field => {
        expect(insertCall).toHaveBeenCalledWith([
          expect.objectContaining({
            [field]: expect.anything()
          })
        ]);
      });
    });

    test('should not include any camelCase fields in database payload', async () => {
      await submitApplication(mockFormData);
      const insertCall = supabase.from().insert;
      
      // These camelCase fields should NOT exist in the database payload
      const forbiddenCamelCaseFields = [
        'fullName',
        'genderIdentity',
        'schoolOrCompany',
        'greatHousemate',
        'doneLookLike',
        'workExperience',
        'focusMethod',
        'sleepCommitment',
        'idealSleep',
        'attendancePreference',
        'miamiOk',
        'costSavingIdeas',
        'dietaryRestrictions',
        'filmingPermission',
        'datePreferences',
        'anythingElse'
      ];
      
      const insertedData = insertCall.mock.calls[0][0][0];
      forbiddenCamelCaseFields.forEach(field => {
        expect(insertedData).not.toHaveProperty(field);
      });
    });
  });

  describe('Data Integrity and Validation', () => {
    test('should preserve all required field values accurately', async () => {
      await submitApplication(mockFormData);
      const insertCall = supabase.from().insert;
      
      // Test that transformation doesn't alter the actual values
      expect(insertCall).toHaveBeenCalledWith([
        expect.objectContaining({
          full_name: mockFormData.aboutYou.fullName,
          email: mockFormData.aboutYou.email,
          achievements: mockFormData.bragZone.achievements,
          project_description: mockFormData.theProject.description
        })
      ]);
    });

    test('should handle special characters and unicode correctly', async () => {
      const unicodeData = { ...mockFormData };
      unicodeData.aboutYou.fullName = 'José María González';
      unicodeData.aboutYou.location = 'São Paulo, Brasil';
      unicodeData.theProject.description = 'Aplicação com acentuação';

      await submitApplication(unicodeData);
      const insertCall = supabase.from().insert;
      expect(insertCall).toHaveBeenCalledWith([
        expect.objectContaining({
          full_name: 'José María González',
          location: 'São Paulo, Brasil',
          project_description: 'Aplicação com acentuação'
        })
      ]);
    });
  });
}); 