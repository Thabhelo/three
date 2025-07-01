-- Fix Database Security Issues
-- This migration addresses security linter warnings by:
-- 1. Enabling RLS on admin_users table
-- 2. Fixing application_stats view security definer issue

-- =====================================================
-- 1. FIX ADMIN_USERS TABLE RLS ISSUES
-- =====================================================

-- First, let's check if admin_users table exists, if not create it
CREATE TABLE IF NOT EXISTS public.admin_users (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    last_login TIMESTAMP WITH TIME ZONE,
    is_active BOOLEAN DEFAULT true NOT NULL
);

-- Enable Row Level Security on admin_users table
ALTER TABLE public.admin_users ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist to avoid conflicts
DROP POLICY IF EXISTS "Admin users can view admin list" ON public.admin_users;
DROP POLICY IF EXISTS "Enable read access for authenticated users" ON public.admin_users;
DROP POLICY IF EXISTS "Enable insert for authenticated users" ON public.admin_users;

-- Create proper RLS policies for admin_users
-- Only authenticated users can view admin users (for admin dashboard)
CREATE POLICY "Enable read access for authenticated users" ON public.admin_users
    FOR SELECT USING (auth.role() = 'authenticated');

-- Only authenticated users can insert new admin users
CREATE POLICY "Enable insert for authenticated users" ON public.admin_users
    FOR INSERT WITH CHECK (auth.role() = 'authenticated');

-- Only authenticated users can update admin records
CREATE POLICY "Enable update for authenticated users" ON public.admin_users
    FOR UPDATE USING (auth.role() = 'authenticated');

-- =====================================================
-- 2. FIX APPLICATION_STATS VIEW SECURITY DEFINER ISSUE
-- =====================================================

-- Drop the existing application_stats view if it exists
DROP VIEW IF EXISTS public.application_stats;

-- Recreate the application_stats view with SECURITY INVOKER (not SECURITY DEFINER)
-- This view provides statistics for the admin dashboard
-- Note: age column is INTEGER, so we calculate age ranges accordingly
CREATE VIEW public.application_stats
WITH (security_invoker = on) AS
SELECT 
    COUNT(*) as total_applications,
    COUNT(*) FILTER (WHERE created_at >= CURRENT_DATE - INTERVAL '7 days') as applications_this_week,
    COUNT(*) FILTER (WHERE created_at >= CURRENT_DATE - INTERVAL '30 days') as applications_this_month,
    ROUND(AVG(age), 1) as average_age,
    COUNT(*) FILTER (WHERE age BETWEEN 18 AND 25) as age_18_25,
    COUNT(*) FILTER (WHERE age >= 26) as age_26_plus,
    COUNT(*) FILTER (WHERE status = 'pending') as pending_applications,
    COUNT(*) FILTER (WHERE status = 'approved') as approved_applications,
    COUNT(*) FILTER (WHERE status = 'rejected') as rejected_applications,
    COUNT(*) FILTER (WHERE attendance_preference = 'In-person only') as in_person_preference,
    COUNT(*) FILTER (WHERE attendance_preference = 'Virtual only') as virtual_preference,
    COUNT(*) FILTER (WHERE attendance_preference = 'Either works') as either_preference
FROM public.applications;

-- Enable RLS on the view (inherits from underlying table permissions)
-- Note: Views don't have RLS directly, but they inherit from underlying tables

-- Grant appropriate permissions
GRANT SELECT ON public.application_stats TO authenticated;
GRANT SELECT ON public.admin_users TO authenticated;

-- =====================================================
-- 3. ENSURE APPLICATIONS TABLE HAS PROPER RLS
-- =====================================================

-- Ensure applications table has RLS enabled (should already be done in previous migrations)
ALTER TABLE public.applications ENABLE ROW LEVEL SECURITY;

-- Add comment for documentation
COMMENT ON TABLE public.admin_users IS 'Admin users table with proper RLS enabled';
COMMENT ON VIEW public.application_stats IS 'Application statistics view with SECURITY INVOKER for proper user permissions'; 