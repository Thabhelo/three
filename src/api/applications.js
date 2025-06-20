// /src/api/applications.js
// API functions for DreamSprint applications

import { supabase } from '../lib/supabase'

// Transform form data to match database schema
const transformFormData = (formData) => {
  return {
    // About You
    full_name: formData.aboutYou.fullName,
    sex: formData.aboutYou.sex,
    gender_identity: formData.aboutYou.genderIdentity,
    email: formData.aboutYou.email,
    phone: formData.aboutYou.phone,
    preferred_chat: formData.aboutYou.preferredChat,
    location: formData.aboutYou.location,
    age: formData.aboutYou.age,
    occupation: formData.aboutYou.occupation,
    school_or_company: formData.aboutYou.schoolOrCompany,
    linkedin: formData.aboutYou.linkedin,
    social: formData.aboutYou.social,
    
    // Brag Zone
    achievements: formData.bragZone.achievements,
    great_housemate: formData.bragZone.greatHousemate,
    
    // The Project
    project_description: formData.theProject.description,
    project_done_look_like: formData.theProject.doneLookLike,
    project_importance: formData.theProject.importance,
    project_tools: formData.theProject.tools,
    
    // Work Style
    work_experience: formData.workStyle.experience,
    focus_method: formData.workStyle.focusMethod,
    sleep_commitment: formData.workStyle.sleepCommitment,
    ideal_sleep: formData.workStyle.idealSleep,
    
    // Planning Input
    attendance_preference: formData.planningInput.attendancePreference,
    miami_ok: formData.planningInput.miamiOk,
    cost_saving_ideas: formData.planningInput.costSavingIdeas,
    dietary_restrictions: formData.planningInput.dietaryRestrictions,
    filming_permission: formData.planningInput.filmingPermission,
    
    // Date Preferences
    date_preferences: formData.datePreferences,
    
    // Consent
    commitment_checkbox: formData.consent.commitment,
    not_vacation_checkbox: formData.consent.notAVacation,
    liability_checkbox: formData.consent.liability,
    
    // Final Notes
    anything_else: formData.finalNotes.anythingElse
  }
}

// Submit a new application
export const submitApplication = async (formData) => {
  try {
    // Transform the form data
    const applicationData = transformFormData(formData)
    
    // Validate required fields
    const requiredFields = [
      'full_name', 'email', 'phone', 'age', 'linkedin',
      'achievements', 'great_housemate',
      'project_description', 'project_done_look_like', 'project_importance', 'project_tools'
    ]
    
    for (const field of requiredFields) {
      if (!applicationData[field]) {
        throw new Error(`Missing required field: ${field}`)
      }
    }
    
    // Check if email already exists
    const { data: existingApplication } = await supabase
      .from('applications')
      .select('id, email, created_at')
      .eq('email', applicationData.email)
      .single()
    
    if (existingApplication) {
      throw new Error('An application with this email already exists')
    }
    
    // Insert the application
    const { data, error } = await supabase
      .from('applications')
      .insert([applicationData])
      .select('id, created_at, email, full_name')
      .single()
    
    if (error) {
      console.error('Supabase error:', error)
      throw new Error(error.message || 'Failed to submit application')
    }
    
    return {
      success: true,
      data: data,
      message: 'Application submitted successfully!'
    }
    
  } catch (error) {
    console.error('Application submission error:', error)
    return {
      success: false,
      error: error.message || 'An unexpected error occurred'
    }
  }
}

// Check if an email has already applied
export const checkExistingApplication = async (email) => {
  try {
    const { data, error } = await supabase
      .rpc('get_application_by_email', { user_email: email })
    
    if (error) {
      console.error('Error checking existing application:', error)
      return { exists: false }
    }
    
    return {
      exists: data && data.length > 0,
      application: data?.[0] || null
    }
  } catch (error) {
    console.error('Error checking existing application:', error)
    return { exists: false }
  }
}

// Get application statistics (for admin use)
export const getApplicationStats = async () => {
  try {
    const { data, error } = await supabase
      .from('application_stats')
      .select('*')
      .single()
    
    if (error) {
      console.error('Error fetching stats:', error)
      return null
    }
    
    return data
  } catch (error) {
    console.error('Error fetching stats:', error)
    return null
  }
}

// Get all applications (for admin use)
export const getAllApplications = async (filters = {}) => {
  try {
    let query = supabase
      .from('applications')
      .select('*')
      .order('created_at', { ascending: false })
    
    // Apply filters
    if (filters.status) {
      query = query.eq('status', filters.status)
    }
    
    if (filters.limit) {
      query = query.limit(filters.limit)
    }
    
    const { data, error } = await query
    
    if (error) {
      console.error('Error fetching applications:', error)
      return []
    }
    
    return data || []
  } catch (error) {
    console.error('Error fetching applications:', error)
    return []
  }
}

// Update application status (for admin use)
export const updateApplicationStatus = async (applicationId, status, adminNotes = '') => {
  try {
    const { data, error } = await supabase
      .from('applications')
      .update({ 
        status, 
        admin_notes: adminNotes,
        reviewed_at: new Date().toISOString()
      })
      .eq('id', applicationId)
      .select('id, status, full_name, email')
      .single()
    
    if (error) {
      console.error('Error updating application status:', error)
      throw new Error(error.message)
    }
    
    return {
      success: true,
      data: data
    }
  } catch (error) {
    console.error('Error updating application status:', error)
    return {
      success: false,
      error: error.message
    }
  }
}

// Validate form data before submission
export const validateFormData = (formData) => {
  const errors = []
  
  // Required fields validation
  if (!formData.aboutYou.fullName?.trim()) {
    errors.push('Full name is required')
  }
  
  if (!formData.aboutYou.email?.trim()) {
    errors.push('Email is required')
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.aboutYou.email)) {
    errors.push('Invalid email format')
  }
  
  if (!formData.aboutYou.phone?.trim()) {
    errors.push('Phone number is required')
  }
  
  if (!formData.aboutYou.age || !['18-25', '26+'].includes(formData.aboutYou.age)) {
    errors.push('Please select a valid age range')
  }
  
  if (!formData.aboutYou.linkedin?.trim()) {
    errors.push('LinkedIn URL is required')
  }
  
  if (!formData.bragZone.achievements?.trim()) {
    errors.push('Achievements section is required')
  }
  
  if (!formData.bragZone.greatHousemate?.trim()) {
    errors.push('Great housemate section is required')
  }
  
  if (!formData.theProject.description?.trim()) {
    errors.push('Project description is required')
  }
  
  if (!formData.theProject.doneLookLike?.trim()) {
    errors.push('Project completion definition is required')
  }
  
  if (!formData.theProject.importance?.trim()) {
    errors.push('Project importance is required')
  }
  
  if (!formData.theProject.tools?.trim()) {
    errors.push('Project tools are required')
  }
  
  // Consent validation
  if (!formData.consent.commitment) {
    errors.push('You must agree to the work commitment')
  }
  
  if (!formData.consent.notAVacation) {
    errors.push('You must acknowledge this is not a vacation')
  }
  
  if (!formData.consent.liability) {
    errors.push('You must agree to the liability waiver')
  }
  
  return {
    isValid: errors.length === 0,
    errors
  }
}