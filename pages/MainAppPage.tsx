import React from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import About from '../components/About';
import Services from '../components/Services';
import WhyChooseUs from '../components/WhyChooseUs';
import Contact from '../components/Contact';
import Footer from '../components/Footer';

interface MainAppPageProps {
  isDark: boolean;
  toggleTheme: () => void;
}

const MainAppPage: React.FC<MainAppPageProps> = ({ isDark, toggleTheme }) => {
  return (
    <>
      <Navbar isDark={isDark} toggleTheme={toggleTheme} />
      <main className="animate-in fade-in duration-700">
        <Hero />
        <About />
        <Services />
        <WhyChooseUs />
        <Contact />
      </main>
      <Footer />
    </>
  );
};

export default MainAppPage;
