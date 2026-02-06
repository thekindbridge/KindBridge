import React from 'react';
import Navbar from '../components/Navbar';
import ServiceRequestForm from '../components/ServiceRequestForm';

interface RequestFormPageProps {
  isDark: boolean;
  toggleTheme: () => void;
}

const RequestFormPage: React.FC<RequestFormPageProps> = ({ isDark, toggleTheme }) => {
  return (
    <>
      <Navbar isDark={isDark} toggleTheme={toggleTheme} />
      <main className="pt-28 px-4 md:px-8 pb-8">
        <div className="max-w-3xl mx-auto">
          <ServiceRequestForm showCloseButton closeTo="/app" />
        </div>
      </main>
    </>
  );
};

export default RequestFormPage;
