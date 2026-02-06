
import React from 'react';
import MotionWrapper from './MotionWrapper';

const About: React.FC = () => {
  return (
    <section id="about" className="py-24 relative w-full max-w-full overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <MotionWrapper direction="right">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500/20 to-teal-500/20 blur-3xl rounded-full dark:opacity-100 opacity-50"></div>
              <div className="relative overflow-hidden rounded-3xl border dark:border-white/10 border-slate-200">
                 <img 
                  src="https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=800" 
                  alt="Our Team" 
                  className="w-full h-auto grayscale-[30%] hover:grayscale-0 transition-all duration-700 hover:scale-105"
                />
              </div>
              <div className="absolute -bottom-8 -right-8 glass p-6 rounded-2xl border dark:border-white/20 border-slate-200 hidden lg:block shadow-xl">
                <div className="flex items-center gap-4">
                  <div className="text-4xl font-bold gradient-text">100%</div>
                  <div className="text-sm dark:text-slate-400 text-slate-600 leading-tight font-medium">Focus on<br/>Human Connection</div>
                </div>
              </div>
            </div>
          </MotionWrapper>

          <MotionWrapper direction="left">
            <div className="space-y-6">
              <div className="text-indigo-500 dark:text-indigo-400 font-bold uppercase tracking-widest text-sm">Our Essence</div>
              <h2 className="text-4xl md:text-5xl font-bold dark:text-white text-slate-900 font-display">More than just a firm, we're a bridge.</h2>
              <p className="text-lg dark:text-slate-400 text-slate-600 leading-relaxed">
                Kind-Bridge was founded on the belief that technology should serve people, not the other way around. In a world increasingly dominated by automation, we bring the human touch back to the center of every digital solution.
              </p>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="mt-1.5 w-5 h-5 rounded-full dark:bg-teal-500/20 bg-teal-500/10 flex items-center justify-center border border-teal-500/30">
                    <div className="w-2 h-2 rounded-full bg-teal-500"></div>
                  </div>
                  <div>
                    <h4 className="dark:text-white text-slate-900 font-bold mb-1">Human-Centric Approach</h4>
                    <p className="dark:text-slate-400 text-slate-600 text-sm">Every line of code and strategy is designed with the end-user's emotional and practical needs in mind.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="mt-1.5 w-5 h-5 rounded-full dark:bg-indigo-500/20 bg-indigo-500/10 flex items-center justify-center border border-indigo-500/30">
                    <div className="w-2 h-2 rounded-full bg-indigo-500"></div>
                  </div>
                  <div>
                    <h4 className="dark:text-white text-slate-900 font-bold mb-1">Empowering Technology</h4>
                    <p className="dark:text-slate-400 text-slate-600 text-sm">We don't just solve problems; we build systems that empower your team to achieve more with less friction.</p>
                  </div>
                </div>
              </div>
            </div>
          </MotionWrapper>
        </div>
      </div>
    </section>
  );
};

export default About;
