'use client';

import { useState } from 'react';
import HomePage from '@/components/HomePage';
import RoadmapDetailView from '@/components/RoadmapDetailView';
import { getCourseById } from '@/data/coursesData';
import { Course } from '@/data/coursesData';

export default function Home() {
  const [currentView, setCurrentView] = useState<'home' | 'roadmap'>('home');
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);

  const handleCourseSelect = (courseId: string) => {
    const course = getCourseById(courseId);
    if (course) {
      setSelectedCourse(course);
      setCurrentView('roadmap');
    }
  };

  const handleBackToHome = () => {
    setCurrentView('home');
    setSelectedCourse(null);
  };

  if (currentView === 'roadmap' && selectedCourse) {
    return (
      <RoadmapDetailView
        course={selectedCourse}
        onBack={handleBackToHome}
      />
    );
  }

  return (
    <HomePage onCourseSelect={handleCourseSelect} />
  );
}
