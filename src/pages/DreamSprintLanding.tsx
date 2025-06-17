import React from 'react';
import { Link } from 'react-router-dom';

export const DreamSprintLanding: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <h1 className="text-2xl font-semibold text-gray-900">DreamSprint</h1>
        </div>
      </header>

      <main className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="px-6 py-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Join the 10-Day Deep Work Sprint
              </h2>
              <p className="text-gray-600 mb-6">
                If you're here, you're probably a startup founder grinding through your MVP, an ambitious student pushing limits, a software engineer with a bold side project, a content creator with a backlog to shoot, or just someone chasing a big dream.
              </p>
              <p className="text-gray-600 mb-6">
                I'm organizing a 10-day deep work sprint in Miami from August 1 to August 11, and I'm looking for up to 9 other highly motivated people to join. The goal is simple: come with one big project you've been meaning to finish—whether it's a startup, a coding project, a set of 50 videos, a book, a course, or something creative—and use this time to get it done.
              </p>
              <p className="text-gray-600 mb-6">
                We'll rent one big Airbnb, stock it with food and everything we need, and work side-by-side every day with full focus. This is not a vacation or retreat—it's an intense grind. No one sleeps more than 2 hours a day, and there are no distractions. We'll start each day with a short check-in and end with progress updates or demos. Everyone is expected to contribute to the energy and momentum of the house.
              </p>
              <p className="text-gray-600 mb-8">
                We may stream the experience live 24/7 if one of us is a content creator. We'll have fast Wi-Fi, a solid setup for creators or coders, and shared spaces for working or brainstorming. There will be daily challenges, spontaneous team-ups, and constant encouragement to push through. You'll have people around you who are just as serious about their goals. It's going to be intense, but also exciting and productive.
              </p>
              <div className="flex justify-center">
                <Link
                  to="/dreamsprint/apply"
                  className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Apply Now
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="bg-white border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
          <div className="text-center text-gray-500">
            <h3 className="text-lg font-medium">Contact Information</h3>
            <p className="mt-2">Organizer: Thabhelo Duve</p>
            <p>Email: thabheloduve@gmail.com</p>
            <p>Phone: +1 256 375 4207</p>
          </div>
        </div>
      </footer>
    </div>
  );
}; 