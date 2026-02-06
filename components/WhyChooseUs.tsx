
import React from 'react';
import { VALUE_POINTS, getIcon } from '../constants';
import MotionWrapper from './MotionWrapper';

const WhyChooseUs: React.FC = () => {
  return (
    <section id="why-us" className="py-24">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className={`glass rounded-[3rem] p-12 md:p-20 border relative overflow-hidden transition-colors duration-300 dark:border-white/5 border-slate-200 dark:bg-slate-900/30 bg-white/50 shadow-sm`}>
          <div className="absolute top-0 right-0 w-64 h-64 bg-teal-500/10 blur-[100px] rounded-full dark:opacity-100 opacity-30"></div>
          
          <div className="relative z-10 grid lg:grid-cols-5 gap-16 items-center">
            <div className="lg:col-span-2">
              <MotionWrapper direction="right">
                <h2 className="text-4xl md:text-5xl font-bold dark:text-white text-slate-900 font-display mb-6">Why partner with us?</h2>
                <p className="text-lg dark:text-slate-400 text-slate-600 leading-relaxed mb-8 font-medium">
                  We don't just build software. We build bridges that enable your business to cross from where you are now to where you aspire to be.
                </p>
                <div className={`flex items-center gap-4 p-4 rounded-2xl border transition-colors dark:bg-white/5 bg-slate-100 dark:border-white/10 border-slate-200`}>
                   <div className="w-12 h-12 rounded-full bg-indigo-500/20 flex items-center justify-center text-indigo-500 dark:text-indigo-400 font-bold">KB</div>
                   <div>
                     <div className="text-sm font-bold dark:text-white text-slate-900">Startup Ready</div>
                     <div className="text-xs dark:text-slate-400 text-slate-500 font-medium">Scale without limits</div>
                   </div>
                </div>
              </MotionWrapper>
            </div>

            <div className="lg:col-span-3 grid sm:grid-cols-1 md:grid-cols-1 gap-8">
              {VALUE_POINTS.map((point, index) => (
                <MotionWrapper key={index} delay={index * 150} direction="left">
                  <div className="flex gap-6 items-start group">
                    <div className="flex-shrink-0 w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-500 to-indigo-700 flex items-center justify-center text-white shadow-lg shadow-indigo-500/20 transition-transform group-hover:scale-110">
                      {getIcon(point.iconName, 24)}
                    </div>
                    <div>
                      <h4 className="text-xl font-bold dark:text-white text-slate-900 mb-2">{point.title}</h4>
                      <p className="dark:text-slate-400 text-slate-600 leading-relaxed font-medium">{point.description}</p>
                    </div>
                  </div>
                </MotionWrapper>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
