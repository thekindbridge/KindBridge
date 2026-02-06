
import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { BRAND_NAME } from '../constants';
import MotionWrapper from './MotionWrapper';

const Hero: React.FC = () => {
  return (
    <section className="relative min-h-screen w-full max-w-full flex items-center justify-center overflow-hidden pt-20">
      {/* Background Decor */}
      <div className="absolute top-[-10%] left-[-5%] w-[40%] h-[40%] bg-indigo-500/10 blur-[120px] rounded-full dark:opacity-100 opacity-50"></div>
      <div className="absolute bottom-[-5%] right-[-5%] w-[35%] h-[35%] bg-teal-500/10 blur-[120px] rounded-full dark:opacity-100 opacity-50"></div>

      <div className="relative w-full max-w-7xl mx-auto px-4 md:px-8 text-center z-10">
        <MotionWrapper delay={100} className="mb-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass border text-xs md:text-sm font-medium dark:text-teal-300 text-teal-600 dark:border-white/10 border-slate-200">
            <Sparkles size={14} />
            <span>Connecting Innovation & People</span>
          </div>
        </MotionWrapper>

        <MotionWrapper delay={200}>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold font-display tracking-tight mb-6 dark:text-white text-slate-900">
            Building the Future with <span className="gradient-text">{BRAND_NAME}</span>
          </h1>
        </MotionWrapper>

        <MotionWrapper delay={300} className="max-w-2xl mx-auto mb-10">
          <p className="text-lg md:text-xl leading-relaxed dark:text-slate-400 text-slate-600">
            We are the bridge between people, technology, and solutions. 
            Transforming complex challenges into seamless digital experiences.
          </p>
        </MotionWrapper>

        <MotionWrapper delay={400} className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a 
            href="#contact" 
            className="w-full sm:w-auto px-8 py-4 bg-indigo-600 hover:bg-indigo-500 text-white rounded-full font-bold transition-all shadow-xl shadow-indigo-600/20 flex items-center justify-center gap-2 group"
          >
            Request Service
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </a>
          <a 
            href="#services" 
            className="w-full sm:w-auto px-8 py-4 glass rounded-full font-bold transition-all border dark:text-white text-slate-700 dark:border-white/10 border-slate-200 hover:bg-slate-100 dark:hover:bg-white/10"
          >
            Explore Services
          </a>
        </MotionWrapper>
        
        {/* Scroll Indicator */}
        <MotionWrapper delay={800} className="absolute bottom-10 left-1/2 -translate-x-1/2 hidden md:block">
           <div className="w-6 h-10 border-2 rounded-full flex justify-center p-1 dark:border-white/20 border-slate-300">
              <div className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-bounce mt-1"></div>
           </div>
        </MotionWrapper>
      </div>
    </section>
  );
};

export default Hero;
