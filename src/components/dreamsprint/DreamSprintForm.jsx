import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Form Section Component
const FormSection = ({ title, fields, data, onChange, sectionNumber }) => {
  const fieldVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        delay: i * 0.08,
        type: "spring",
        stiffness: 100,
        damping: 15
      }
    })
  };

  const commonInputStyles = "w-full px-6 py-4 bg-white/80 backdrop-blur-sm border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 ease-out text-gray-800 placeholder-gray-500 text-lg shadow-sm hover:shadow-md";

  return (
    <motion.div 
      className="space-y-12 py-12"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.8 }}
        className="relative"
      >
        <div className="flex items-center mb-8">
          <motion.div
            className="flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl text-white font-bold text-xl shadow-lg mr-6"
            whileHover={{ scale: 1.05, rotate: 5 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            {sectionNumber}
          </motion.div>
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tight">
            {title}
          </h2>
        </div>
        
        {/* Decorative Line */}
        <motion.div
          className="h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500 rounded-full"
          initial={{ width: 0 }}
          animate={{ width: "100%" }}
          transition={{ delay: 0.5, duration: 1 }}
        />
      </motion.div>

      {/* Fields Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {fields.map((field, index) => (
          <motion.div
            key={field.name}
            className={`relative ${(field.type === 'textarea' || field.type === 'checkbox') ? 'lg:col-span-2' : ''}`}
            custom={index}
            variants={fieldVariants}
            initial="hidden"
            animate="visible"
            whileHover={{ y: -2 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            {field.type !== 'checkbox' && (
              <motion.label 
                htmlFor={field.name} 
                className="block text-lg font-bold text-gray-800 mb-3"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: index * 0.1 + 0.3 }}
              >
                {field.label}
                {field.required && (
                  <motion.span 
                    className="text-red-500 ml-2"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    *
                  </motion.span>
                )}
              </motion.label>
            )}

            {field.description && field.type !== 'checkbox' && (
              <p className="text-gray-600 mb-4 text-base leading-relaxed">
                {field.description}
              </p>
            )}

            {/* Input Rendering */}
            {field.type === 'textarea' ? (
              <motion.div
                className="relative"
                whileFocus={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <textarea
                  id={field.name}
                  value={data[field.name] || ''}
                  onChange={(e) => onChange(field.name, e.target.value)}
                  className={`${commonInputStyles} min-h-[160px] resize-y`}
                  required={field.required}
                  placeholder={field.placeholder}
                />
              </motion.div>
            ) : field.type === 'select' ? (
              <motion.select
                id={field.name}
                value={data[field.name] || ''}
                onChange={(e) => onChange(field.name, e.target.value)}
                className={commonInputStyles}
                required={field.required}
                whileFocus={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <option value="" disabled>{field.placeholder || 'Select an option'}</option>
                {field.options?.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </motion.select>
            ) : field.type === 'checkbox' ? (
              <motion.div 
                className="relative p-8 bg-gradient-to-br from-gray-50 to-blue-50/50 rounded-3xl border-2 border-gray-200 hover:border-blue-300 transition-all duration-300"
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="flex items-start">
                  <motion.div
                    className="relative"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <input
                      id={field.name}
                      type="checkbox"
                      checked={data[field.name] || false}
                      onChange={(e) => onChange(field.name, e.target.checked)}
                      className="h-7 w-7 text-blue-600 border-2 border-gray-300 rounded-lg focus:ring-blue-500 focus:ring-4 transition-all duration-200"
                      required={field.required}
                    />
                    {data[field.name] && (
                      <motion.div
                        className="absolute inset-0 pointer-events-none"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 500, damping: 15 }}
                      >
                        <div className="w-7 h-7 bg-blue-500 rounded-lg flex items-center justify-center">
                          <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </div>
                      </motion.div>
                    )}
                  </motion.div>
                  
                  <div className="ml-6">
                    <label htmlFor={field.name} className="text-lg font-bold text-gray-800 leading-relaxed cursor-pointer">
                      {field.label}
                      {field.required && (
                        <span className="text-red-500 ml-2">*</span>
                      )}
                    </label>
                    {field.description && (
                      <p className="text-gray-600 mt-2 leading-relaxed">
                        {field.description}
                      </p>
                    )}
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.input
                id={field.name}
                type={field.type}
                value={data[field.name] || ''}
                onChange={(e) => onChange(field.name, e.target.value)}
                className={commonInputStyles}
                required={field.required}
                placeholder={field.placeholder}
                min={field.type === 'number' ? 18 : undefined}
                whileFocus={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
              />
            )}
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

// Main DreamSprint Form Component
const DreamSprintForm = () => {
  const [formData, setFormData] = useState({
    aboutYou: {
      fullName: '', sex: '', genderIdentity: '', email: '', phone: '',
      preferredChat: '', location: '', age: '', occupation: '',
      schoolOrCompany: '', linkedin: '', social: ''
    },
    bragZone: { achievements: '', greatHousemate: '' },
    theProject: { description: '', doneLookLike: '', importance: '', tools: '' },
    workStyle: { experience: '', focusMethod: '', sleepCommitment: '', idealSleep: '' },
    planningInput: { availability: '', miamiOk: '', costSavingIdeas: '', dietaryRestrictions: '', filmingPermission: '' },
    consent: { commitment: false, notAVacation: false, liability: false },
    finalNotes: { anythingElse: '' }
  });

  const [currentStep, setCurrentStep] = useState(0);
  const [submissionStatus, setSubmissionStatus] = useState('idle');

  const handleInputChange = (section, field, value) => {
    setFormData(prev => ({
      ...prev,
      [section]: { ...prev[section], [field]: value }
    }));
  };

  const handleSubmit = async () => {
    setSubmissionStatus('submitting');
    
    // Simulate submission - replace with actual API call
    console.log('Form Data:', formData);
    
    // Simulate API call delay
    setTimeout(() => {
      setSubmissionStatus('success');
    }, 2000);
  };

  const sections = [
    { title: 'About You', key: 'aboutYou' },
    { title: 'Brag Zone', key: 'bragZone' },
    { title: 'The Project', key: 'theProject' },
    { title: 'Work Style & Logistics', key: 'workStyle' },
    { title: 'Planning Input', key: 'planningInput' },
    { title: 'Devotion & Consent', key: 'consent' },
    { title: 'Final Notes', key: 'finalNotes' }
  ];

  const nextStep = () => setCurrentStep(prev => Math.min(prev + 1, sections.length - 1));
  const prevStep = () => setCurrentStep(prev => Math.max(prev - 1, 0));

  const sectionVariants = {
    hidden: { opacity: 0, x: 100, scale: 0.95 },
    visible: { 
      opacity: 1, 
      x: 0, 
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 20,
        mass: 1
      }
    },
    exit: { 
      opacity: 0, 
      x: -100, 
      scale: 0.95,
      transition: {
        duration: 0.3
      }
    }
  };

  // Success Screen
  if (submissionStatus === 'success') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-blue-50">
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
          className="text-center p-12 bg-white rounded-3xl shadow-2xl max-w-2xl mx-4"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 300 }}
            className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-8"
          >
            <svg className="w-12 h-12 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          </motion.div>
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Application Submitted!</h2>
          <p className="text-xl text-gray-600 leading-relaxed">
            Thank you for applying to DreamSprint. We'll review your application and get back to you soon. 
            Get ready to transform your vision into reality!
          </p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50/30">
      <div className="max-w-7xl mx-auto px-4 py-16">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl md:text-7xl font-black text-gray-900 mb-6 tracking-tight">
            Application
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Complete this application to join our intensive 10-day sprint where dreams become reality.
          </p>
        </motion.div>

        {/* Progress Bar */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-20"
        >
          <div className="flex justify-between items-center mb-6">
            <motion.span 
              className="text-2xl font-bold text-gray-800"
              key={currentStep}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.4 }}
            >
              {sections[currentStep].title}
            </motion.span>
            <span className="text-xl font-semibold text-gray-600 bg-gray-100 px-4 py-2 rounded-full">
              {currentStep + 1} of {sections.length}
            </span>
          </div>
          
          <div className="relative w-full bg-gray-200 rounded-full h-4 overflow-hidden">
            <motion.div 
              className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500 h-full rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${((currentStep + 1) / sections.length) * 100}%` }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            />
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-blue-400/50 to-purple-400/50 rounded-full"
              animate={{
                x: ["-100%", "100%"]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          </div>
        </motion.div>

        {/* Form Sections */}
        <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              variants={sectionVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="p-8 md:p-16"
            >
              {currentStep === 0 && (
                <FormSection 
                  title="About You" 
                  sectionNumber={1}
                  fields={[
                    { name: 'fullName', label: 'Full Name', type: 'text', required: true, placeholder: 'Jane Doe' },
                    { name: 'sex', label: 'Sex', type: 'text', placeholder: 'Female' },
                    { name: 'genderIdentity', label: 'Gender Identity', type: 'text', placeholder: 'Woman' },
                    { name: 'email', label: 'Email Address', type: 'email', required: true, placeholder: 'jane.doe@example.com' },
                    { name: 'phone', label: 'Phone Number', type: 'tel', required: true, placeholder: '+1 (555) 123-4567' },
                    { name: 'preferredChat', label: 'Preferred Group Chat', type: 'select', options: ['WhatsApp', 'iMessage', 'Instagram'], placeholder: 'Select app' },
                    { name: 'location', label: 'City & Country of Residence', type: 'text', placeholder: 'New York, USA' },
                    { name: 'age', label: 'Age', type: 'number', required: true, placeholder: '25', description: 'You must be over 18.' },
                    { name: 'occupation', label: 'Current Occupation', type: 'text', placeholder: 'Software Engineer' },
                    { name: 'schoolOrCompany', label: 'School or Company', type: 'text', placeholder: 'Example Inc.' },
                    { name: 'linkedin', label: 'LinkedIn URL', type: 'url', required: true, placeholder: 'https://linkedin.com/in/janedoe' },
                    { name: 'social', label: 'Instagram/Social (optional)', type: 'url', placeholder: 'https://instagram.com/janedoe' },
                  ]} 
                  data={formData.aboutYou} 
                  onChange={(f, v) => handleInputChange('aboutYou', f, v)} 
                />
              )}

              {currentStep === 1 && (
                <FormSection 
                  title="Brag Zone" 
                  sectionNumber={2}
                  fields={[
                    { name: 'achievements', label: 'Top 3 achievements', type: 'textarea', required: true, placeholder: 'Tell us about your proudest moments and biggest wins...' },
                    { name: 'greatHousemate', label: 'What makes you a great person to share this house with?', type: 'textarea', required: true, placeholder: 'Describe your qualities as a collaborator, housemate, and team player...' },
                  ]} 
                  data={formData.bragZone} 
                  onChange={(f, v) => handleInputChange('bragZone', f, v)} 
                />
              )}

              {currentStep === 2 && (
                <FormSection 
                  title="The Project" 
                  sectionNumber={3}
                  fields={[
                    { name: 'description', label: 'Main project description', type: 'textarea', required: true, placeholder: 'Describe the project you will be working on during the sprint...' },
                    { name: 'doneLookLike', label: 'What does "done" look like for your project?', type: 'textarea', required: true, placeholder: 'e.g., MVP launched, 50 videos edited, book manuscript completed, app in app store...' },
                    { name: 'importance', label: 'Why is it important to you?', type: 'textarea', required: true, placeholder: 'What drives you to complete this project? Why now?' },
                    { name: 'tools', label: 'What tools/tech will you use?', type: 'textarea', required: true, placeholder: 'e.g., React, Figma, Final Cut Pro, Python, etc.' },
                  ]} 
                  data={formData.theProject} 
                  onChange={(f, v) => handleInputChange('theProject', f, v)} 
                />
              )}

              {currentStep === 3 && (
                <FormSection 
                  title="Work Style & Logistics" 
                  sectionNumber={4}
                  fields={[
                    { name: 'experience', label: 'Deep work/hackathon experience', type: 'textarea', placeholder: 'Describe any past experiences with intense work sprints, hackathons, or deep focus sessions...' },
                    { name: 'focusMethod', label: 'How do you stay focused?', type: 'textarea', placeholder: 'What are your strategies for maintaining deep focus and avoiding distractions?' },
                    { name: 'sleepCommitment', label: 'Can you commit to < 3hrs sleep/day?', type: 'select', required: true, options: ['Yes', 'Try', 'Suggest other'], placeholder: 'Select an answer' },
                    { name: 'idealSleep', label: 'Ideal sleep amount?', type: 'text', placeholder: 'e.g., 8 hours, 6 hours, etc.' },
                  ]} 
                  data={formData.workStyle} 
                  onChange={(f, v) => handleInputChange('workStyle', f, v)} 
                />
              )}

              {currentStep === 4 && (
                <FormSection 
                  title="Planning Input" 
                  sectionNumber={5}
                  fields={[
                    { name: 'availability', label: 'Are you available Aug 1–11?', type: 'select', required: true, options: ['Yes', 'No', 'Suggest alt'], placeholder: 'Select an answer' },
                    { name: 'miamiOk', label: 'Is Miami OK? Suggest other?', type: 'text', placeholder: 'Yes, or suggest alternative locations...' },
                    { name: 'costSavingIdeas', label: 'Tips/ideas for saving cost or setup?', type: 'textarea', placeholder: 'Any frugal hacks, cost-cutting ideas, or setup suggestions?' },
                    { name: 'dietaryRestrictions', label: 'Dietary restrictions', type: 'text', placeholder: 'e.g., Vegetarian, gluten-free, allergies, etc.' },
                    { name: 'filmingPermission', label: 'Filming permission?', type: 'select', required: true, options: ['Yes', 'Yes, blurred', 'No'], placeholder: 'Select an answer' },
                  ]} 
                  data={formData.planningInput} 
                  onChange={(f, v) => handleInputChange('planningInput', f, v)} 
                />
              )}

              {currentStep === 5 && (
                <FormSection 
                  title="Devotion & Consent" 
                  sectionNumber={6}
                  fields={[
                    { 
                      name: 'commitment', 
                      type: 'checkbox', 
                      required: true, 
                      label: "I swear I'm deeply committed to doing real work.", 
                      description: 'I understand this is a focused work sprint and I am dedicated to making significant progress on my project. I will not treat this as leisure time and will maintain the intense work ethic required for the duration of the sprint.' 
                    },
                    { 
                      name: 'notAVacation', 
                      type: 'checkbox', 
                      required: true, 
                      label: 'I understand this is not a vacation.', 
                      description: 'I acknowledge that the primary purpose of this event is intense work, not leisure, tourism, or relaxation. I am prepared for long work days, minimal sleep, and maximum focus on achieving my project goals.' 
                    },
                    { 
                      name: 'liability', 
                      type: 'checkbox', 
                      required: true, 
                      label: 'I agree to the liability waiver and hold harmless agreement.', 
                      description: 'I agree not to hold anyone liable for effects of sleep deprivation, caffeine consumption, or any physical or mental strain. I understand that I am responsible for my own safety and well-being, and I indemnify the organizers from any accidents, injuries, health issues, or incidents that may occur during the sprint. I participate at my own risk.' 
                    },
                  ]} 
                  data={formData.consent} 
                  onChange={(f, v) => handleInputChange('consent', f, v)} 
                />
              )}
              
              {currentStep === 6 && (
                <FormSection 
                  title="Final Notes" 
                  sectionNumber={7}
                  fields={[
                    { name: 'anythingElse', label: 'Anything else to share?', type: 'textarea', placeholder: 'Any other information, questions, concerns, or thoughts you would like to share with us?' },
                  ]} 
                  data={formData.finalNotes} 
                  onChange={(f, v) => handleInputChange('finalNotes', f, v)} 
                />
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="flex justify-between items-center mt-16 pt-8"
        >
          <motion.button
            type="button"
            onClick={prevStep}
            className="px-8 py-4 bg-gray-100 text-gray-800 font-bold rounded-2xl hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-all text-lg shadow-lg hover:shadow-xl"
            disabled={currentStep === 0}
            whileHover={{ scale: currentStep > 0 ? 1.05 : 1, y: currentStep > 0 ? -2 : 0 }}
            whileTap={{ scale: currentStep > 0 ? 0.95 : 1 }}
          >
            ← Previous
          </motion.button>

          {currentStep < sections.length - 1 ? (
            <motion.button
              type="button"
              onClick={nextStep}
              className="px-8 py-4 bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500 text-white font-bold rounded-2xl shadow-lg hover:shadow-2xl transform hover:-translate-y-1 transition-all text-lg"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Next →
            </motion.button>
          ) : (
            <motion.button
              type="button"
              onClick={handleSubmit}
              className="px-8 py-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold rounded-2xl shadow-lg hover:shadow-2xl disabled:opacity-50 text-lg"
              disabled={submissionStatus === 'submitting'}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              animate={submissionStatus === 'submitting' ? { scale: [1, 1.05, 1] } : {}}
              transition={{ duration: 0.5, repeat: submissionStatus === 'submitting' ? Infinity : 0 }}
            >
              {submissionStatus === 'submitting' ? (
                <span className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Submitting...
                </span>
              ) : (
                'Submit Application'
              )}
            </motion.button>
          )}
        </motion.div>

        {submissionStatus === 'error' && (
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-red-500 text-center mt-6 text-lg bg-red-50 py-4 px-6 rounded-2xl border border-red-200"
          >
            An error occurred. Please try again.
          </motion.p>
        )}
      </div>
    </div>
  );
};

export default DreamSprintForm;