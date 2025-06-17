import React, { useState } from 'react';
import { FormSection } from './FormSection';
import type { DreamSprintFormData, Sex, SleepCommitment, Availability, FilmingPermission } from '../../types/dreamsprint';

export const DreamSprintForm: React.FC = () => {
  const [formData, setFormData] = useState<DreamSprintFormData>({
    fullName: '',
    sex: 'Prefer not to say',
    genderIdentity: '',
    email: '',
    phoneNumber: '',
    preferredChat: 'WhatsApp',
    cityCountry: '',
    age: 18,
    currentOccupation: '',
    schoolOrCompany: '',
    linkedinUrl: '',
    socialMedia: '',
    achievements: '',
    houseCompatibility: '',
    projectDescription: '',
    projectCompletion: '',
    projectImportance: '',
    projectTools: '',
    deepWorkExperience: '',
    focusMethods: '',
    sleepCommitment: 'Try',
    idealSleepAmount: '',
    availability: 'Yes',
    locationPreference: '',
    costSavingIdeas: '',
    dietaryRestrictions: '',
    filmingPermission: 'Yes',
    committedToWork: false,
    understandsNotVacation: false,
    acceptsLiability: false,
    additionalNotes: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-3xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4 text-gray-900">DreamSprint Application</h1>
        <p className="text-gray-600">
          Join us for an intense 10-day deep work sprint in Miami from August 1 to August 11.
        </p>
      </div>

      <FormSection title="1. About You">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Full Name *
            </label>
            <input
              type="text"
              name="fullName"
              required
              value={formData.fullName}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Sex
            </label>
            <select
              name="sex"
              value={formData.sex}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
              <option value="Prefer not to say">Prefer not to say</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Gender Identity
            </label>
            <input
              type="text"
              name="genderIdentity"
              value={formData.genderIdentity}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email Address *
            </label>
            <input
              type="email"
              name="email"
              required
              value={formData.email}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Phone Number *
            </label>
            <input
              type="tel"
              name="phoneNumber"
              required
              value={formData.phoneNumber}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Preferred Chat Platform
            </label>
            <select
              name="preferredChat"
              value={formData.preferredChat}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="WhatsApp">WhatsApp</option>
              <option value="iMessage">iMessage</option>
              <option value="Instagram">Instagram</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              City & Country of Residence
            </label>
            <input
              type="text"
              name="cityCountry"
              value={formData.cityCountry}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Age *
            </label>
            <input
              type="number"
              name="age"
              required
              min="18"
              value={formData.age}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Current Occupation
            </label>
            <input
              type="text"
              name="currentOccupation"
              value={formData.currentOccupation}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              School or Company
            </label>
            <input
              type="text"
              name="schoolOrCompany"
              value={formData.schoolOrCompany}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              LinkedIn URL *
            </label>
            <input
              type="url"
              name="linkedinUrl"
              required
              value={formData.linkedinUrl}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Instagram/Social (optional)
            </label>
            <input
              type="text"
              name="socialMedia"
              value={formData.socialMedia}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
      </FormSection>

      <FormSection title="2. Brag Zone">
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Top 3 achievements
            </label>
            <textarea
              name="achievements"
              value={formData.achievements}
              onChange={handleInputChange}
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              What makes you a great person to share this house with?
            </label>
            <textarea
              name="houseCompatibility"
              value={formData.houseCompatibility}
              onChange={handleInputChange}
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
      </FormSection>

      <FormSection title="3. The Project">
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Main project description
            </label>
            <textarea
              name="projectDescription"
              value={formData.projectDescription}
              onChange={handleInputChange}
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              What does "done" look like for your project?
            </label>
            <textarea
              name="projectCompletion"
              value={formData.projectCompletion}
              onChange={handleInputChange}
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Why is it important to you?
            </label>
            <textarea
              name="projectImportance"
              value={formData.projectImportance}
              onChange={handleInputChange}
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              What tools/tech will you use?
            </label>
            <textarea
              name="projectTools"
              value={formData.projectTools}
              onChange={handleInputChange}
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
      </FormSection>

      <FormSection title="4. Work Style & Logistics">
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Deep work/hackathon experience
            </label>
            <textarea
              name="deepWorkExperience"
              value={formData.deepWorkExperience}
              onChange={handleInputChange}
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              How do you stay focused?
            </label>
            <textarea
              name="focusMethods"
              value={formData.focusMethods}
              onChange={handleInputChange}
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Can you commit to < 3hrs sleep/day?
            </label>
            <select
              name="sleepCommitment"
              value={formData.sleepCommitment}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="Yes">Yes</option>
              <option value="Try">Try</option>
              <option value="Suggest other">Suggest other</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Ideal sleep amount?
            </label>
            <input
              type="text"
              name="idealSleepAmount"
              value={formData.idealSleepAmount}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
      </FormSection>

      <FormSection title="5. Planning Input">
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Are you available Aug 1–11?
            </label>
            <select
              name="availability"
              value={formData.availability}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="Yes">Yes</option>
              <option value="No">No</option>
              <option value="Suggest alt">Suggest alt</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Is Miami OK? Suggest other?
            </label>
            <input
              type="text"
              name="locationPreference"
              value={formData.locationPreference}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Tips/ideas for saving cost or setup?
            </label>
            <textarea
              name="costSavingIdeas"
              value={formData.costSavingIdeas}
              onChange={handleInputChange}
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Dietary restrictions
            </label>
            <input
              type="text"
              name="dietaryRestrictions"
              value={formData.dietaryRestrictions}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Filming permission?
            </label>
            <select
              name="filmingPermission"
              value={formData.filmingPermission}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="Yes">Yes</option>
              <option value="Yes blurred">Yes blurred</option>
              <option value="No">No</option>
            </select>
          </div>
        </div>
      </FormSection>

      <FormSection title="6. Devotion & Consent">
        <div className="space-y-4">
          <div className="flex items-start">
            <input
              type="checkbox"
              name="committedToWork"
              checked={formData.committedToWork}
              onChange={handleInputChange}
              required
              className="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label className="ml-2 block text-sm text-gray-700">
              I swear I'm deeply committed to doing real work and will maintain high productivity throughout the sprint. I understand that this is an intense work environment and I am ready to push my limits.
            </label>
          </div>
          <div className="flex items-start">
            <input
              type="checkbox"
              name="understandsNotVacation"
              checked={formData.understandsNotVacation}
              onChange={handleInputChange}
              required
              className="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label className="ml-2 block text-sm text-gray-700">
              I understand this is not a vacation or retreat. This is an intense work environment where we will be pushing our limits and working long hours with minimal sleep.
            </label>
          </div>
          <div className="flex items-start">
            <input
              type="checkbox"
              name="acceptsLiability"
              checked={formData.acceptsLiability}
              onChange={handleInputChange}
              required
              className="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label className="ml-2 block text-sm text-gray-700">
              I agree not to hold anyone liable for effects of sleep deprivation, caffeine, or any other consequences of participating in this intense work environment. I understand that I am responsible for my own safety and well-being, and I will not hold the organizer or other participants responsible for any accidents or health issues that may occur.
            </label>
          </div>
        </div>
      </FormSection>

      <FormSection title="7. Final Notes">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Anything else to share?
          </label>
          <textarea
            name="additionalNotes"
            value={formData.additionalNotes}
            onChange={handleInputChange}
            rows={4}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </FormSection>

      <div className="mt-8">
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 px-6 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Submit Application
        </button>
      </div>
    </form>
  );
}; 