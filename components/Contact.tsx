
import React from 'react';
import { Mail } from 'lucide-react';
import { CONTACT_EMAIL } from '../constants';
import MotionWrapper from './MotionWrapper';
import ServiceRequestForm from './ServiceRequestForm';

const Contact: React.FC = () => {
  return (
    <section id="contact" className="py-24 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="grid lg:grid-cols-2 gap-16">
          <MotionWrapper direction="right">
            <div>
              <div className="dark:text-indigo-400 text-indigo-600 font-bold uppercase tracking-widest text-sm mb-4">Connect</div>
              <h2 className="text-4xl md:text-5xl font-bold dark:text-white text-slate-900 font-display mb-6">Let's bridge the gap together.</h2>
              <p className="text-lg dark:text-slate-400 text-slate-600 mb-10 leading-relaxed font-medium">
                Ready to take the next step? Whether you have a specific project in mind or just want to explore the possibilities, our team is here to help.
              </p>
              
              <div className="space-y-6">
                <a 
                  href={`mailto:${CONTACT_EMAIL}`}
                  className="flex items-center gap-6 group"
                >
                  <div className={`w-14 h-14 rounded-full flex items-center justify-center transition-all duration-300 dark:bg-indigo-500/10 bg-indigo-50 border dark:border-indigo-500/20 border-indigo-200 text-indigo-600 dark:text-indigo-400 group-hover:bg-indigo-500 group-hover:text-white group-hover:scale-110 shadow-sm`}>
                    <Mail size={24} />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-slate-500 uppercase tracking-wider">Email Us</div>
                    <div className="text-xl font-bold break-all dark:text-white text-slate-900 group-hover:text-indigo-600 transition-colors">{CONTACT_EMAIL}</div>
                  </div>
                </a>
              </div>
            </div>
          </MotionWrapper>

          <MotionWrapper direction="left">
            <ServiceRequestForm title="Let's bridge the gap together." subtitle="Contact / Service Request" />
          </MotionWrapper>
        </div>
      </div>
    </section>
  );
};

export default Contact;
