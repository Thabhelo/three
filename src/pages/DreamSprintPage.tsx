import React from 'react';
import { DreamSprintForm } from '../components/dreamsprint/DreamSprintForm';

export const DreamSprintPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <h1 className="text-2xl font-semibold text-gray-900">DreamSprint</h1>
        </div>
      </header>

      <main className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg shadow">
            <DreamSprintForm />
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