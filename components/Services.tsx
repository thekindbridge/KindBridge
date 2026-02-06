import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Info, X } from 'lucide-react';
import MotionWrapper from './MotionWrapper';

interface ServiceItem {
  title: string;
  description: string;
  details: string[];
  custom?: boolean;
}

interface ServiceCategory {
  title: string;
  subtitle: string;
  services: ServiceItem[];
}

const SERVICE_CATEGORIES: ServiceCategory[] = [
  {
    title: 'Project Services',
    subtitle: 'End-to-end execution for product, analytics, and academic outcomes.',
    services: [
      {
        title: 'Full-Stack Web & Mobile Projects',
        description: 'Complete product development from planning to deployment.',
        details: [
          'Architecture and feature planning for scalable web/mobile apps.',
          'Modern frontend + backend implementation with production standards.',
          'Testing, deployment support, and post-delivery guidance.',
        ],
      },
      {
        title: 'AI / ML Projects',
        description: 'Practical AI solutions built for measurable business goals.',
        details: [
          'Model design for forecasting, language, and visual intelligence use-cases.',
          'Data preparation, training pipelines, and evaluation workflows.',
          'Integration-ready outputs with clear performance metrics.',
        ],
      },
      {
        title: 'Automation Agents & Workflow Systems(n8n)',
        description: 'Automate repetitive workflows with reliable agent-based systems.',
        details: [
          'Workflow mapping and automation opportunities across operations.',
          'Setup with n8n, Zapier, or custom automation bots.',
          'Monitoring and fail-safe design for stable execution.',
        ],
      },
      {
        title: 'Data Analytics Dashboards',
        description: 'Interactive dashboards for decision-ready insights.',
        details: [
          'Data cleaning and KPI design around your real reporting needs.',
          'Responsive dashboards with intuitive filters and visual storytelling.',
          'Actionable insights aligned with business or academic outcomes.',
        ],
      },
      {
        title: 'Academic Final-Year Projects(B.Tech)',
        description: 'Structured implementation support for final-year submissions.',
        details: [
          'Topic shaping, milestone planning, and implementation guidance.',
          'Code quality support, documentation, and presentation readiness.',
          'Focused help for B.Tech, M.Tech, and MCA project tracks.',
        ],
      },
      {
        title: 'Custom Service',
        description: 'Tailored project scope designed around your exact requirement.',
        details: [
          'No predefined scope: we start from your specific objective.',
          'Flexible engagement model based on complexity and timeline.',
          'Fully custom solution planning and delivery path.',
        ],
        custom: true,
      },
    ],
  },
  {
    title: 'Mini Services',
    subtitle: 'Fast-turn support tasks for code, design, content, and academics.',
    services: [
      {
        title: 'Code Debugging & Error Fixing',
        description: 'Targeted debugging to unblock and stabilize your code quickly.',
        details: [
          'Root-cause analysis across frontend, backend, and integration issues.',
          'Fix implementation with clear explanations of what changed.',
          'Validation checklist to avoid recurring errors.',
        ],
      },
      {
        title: 'Poster & Creative Design',
        description: 'Clean visual creatives for events, branding, and campaigns.',
        details: [
          'Concept-to-design execution with brand-consistent visuals.',
          'High-quality outputs optimized for print and digital.',
          'Quick iteration support based on feedback.',
        ],
      },
      {
        title: 'Presentation (PPT) Design',
        description: 'Professional slide decks with strong narrative clarity.',
        details: [
          'Content structuring for business, academic, or pitch contexts.',
          'Visual hierarchy, typography, and design consistency.',
          'Audience-ready decks that communicate clearly and quickly.',
        ],
      },
      {
        title: 'Research Paper Writing & Formatting',
        description: 'Well-structured papers aligned to academic formatting standards.',
        details: [
          'Assistance with structure, flow, references, and formatting.',
          'Support for clarity, grammar, and publication readiness.',
          'Template alignment for journals, conferences, or institutions.',
        ],
      },
      {
        title: 'Resume & CV Building',
        description: 'Role-focused resumes that improve interview visibility.',
        details: [
          'Profile positioning based on target role or domain.',
          'ATS-friendly formatting and impact-driven bullet points.',
          'Refined resume/CV versions for fresher and experienced profiles.',
        ],
      },
      {
        title: 'Technical & Non-Technical Content Writing',
        description: 'Readable, audience-focused content for multiple formats.',
        details: [
          'Blogs, documentation, social copy, and website content support.',
          'Tone and structure tailored to audience and purpose.',
          'Clear, concise writing with practical storytelling.',
        ],
      },
      {
        title: 'Video & Photo Editing',
        description: 'Polished edits for social, academic, and professional use.',
        details: [
          'Cuts, transitions, color correction, and audio cleanup.',
          'Thumbnail and image enhancement for better engagement.',
          'Delivery in platform-ready formats.',
        ],
      },
      {
        title: 'Academic Assignments Support',
        description: 'Guided academic support for quality and timely completion.',
        details: [
          'Requirement-based drafting and structure support.',
          'Formatting, references, and submission-readiness checks.',
          'Focused help across technical and non-technical subjects.',
        ],
      },
      {
        title: 'Custom Service (As Per Requirement)',
        description: 'Flexible mini-service support for unique one-off needs.',
        details: [
          'Fully custom task scope with no fixed predefined package.',
          'Adaptable turnaround based on urgency and complexity.',
          'Requirement-led execution from start to finish.',
        ],
        custom: true,
      },
    ],
  },
];

const Services: React.FC = () => {
  const navigate = useNavigate();
  const [activeService, setActiveService] = useState<ServiceItem | null>(null);

  const handleRequestService = (service: ServiceItem) => {
    if (service.custom) {
      navigate('/requests/new');
      return;
    }

    navigate(`/requests/new?service=${encodeURIComponent(service.title)}`);
  };

  return (
    <section id="services" className="py-24">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <MotionWrapper>
            <p className="text-teal-600 dark:text-teal-400 font-bold uppercase tracking-widest text-xs sm:text-sm mb-4">What We Offer</p>
            <h2 className="text-4xl md:text-5xl font-bold dark:text-white text-slate-900 font-display mb-4">Our Services</h2>
            <p className="text-base md:text-lg dark:text-slate-400 text-slate-600">
              Choose a service and submit a request in one click. Everything is optimized for fast mobile-first interaction.
            </p>
          </MotionWrapper>
        </div>

        <div className="space-y-12">
          {SERVICE_CATEGORIES.map((category) => (
            <MotionWrapper key={category.title} direction="up">
              <div>
                <div className="mb-5">
                  <h3 className="text-2xl md:text-3xl font-bold dark:text-white text-slate-900 font-display">{category.title}</h3>
                  <p className="mt-2 text-sm md:text-base dark:text-slate-400 text-slate-600">{category.subtitle}</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-5">
                  {category.services.map((service) => (
                    <article
                      key={service.title}
                      className="glass rounded-2xl border dark:border-white/10 border-slate-200 p-5 md:p-6 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col"
                    >
                      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-[0.16em] dark:bg-indigo-500/15 bg-indigo-50 dark:text-indigo-300 text-indigo-700 mb-4">
                        <Info size={14} />
                        <span>Service</span>
                      </div>

                      <h4 className="text-lg md:text-xl font-bold dark:text-white text-slate-900 leading-snug">{service.title}</h4>
                      <p className="mt-3 text-sm md:text-base dark:text-slate-400 text-slate-600 leading-relaxed flex-grow">{service.description}</p>

                      <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-2">
                        <button
                          type="button"
                          onClick={() => handleRequestService(service)}
                          className="h-10 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-bold transition-colors active:scale-[0.98]"
                        >
                          Request this service
                        </button>
                        <button
                          type="button"
                          onClick={() => setActiveService(service)}
                          className="h-10 px-4 rounded-xl border text-sm font-bold transition-colors active:scale-[0.98] dark:bg-white/5 bg-white dark:border-white/10 border-slate-200 dark:text-slate-200 text-slate-700 dark:hover:bg-white/10 hover:bg-slate-100"
                        >
                          More Info
                        </button>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            </MotionWrapper>
          ))}
        </div>
      </div>

      {activeService && (
        <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-3 sm:p-4">
          <div
            className="absolute inset-0 bg-slate-950/75 backdrop-blur-sm"
            onClick={() => setActiveService(null)}
          />

          <div className="relative z-10 w-full max-w-xl glass rounded-3xl p-6 md:p-8 border dark:border-white/10 border-slate-200 dark:bg-slate-900/90 bg-white shadow-2xl">
            <button
              type="button"
              onClick={() => setActiveService(null)}
              className="absolute top-4 right-4 h-9 w-9 rounded-lg inline-flex items-center justify-center border dark:border-white/10 border-slate-200 dark:text-slate-300 text-slate-600 dark:hover:bg-white/10 hover:bg-slate-100"
              aria-label="Close"
            >
              <X size={18} />
            </button>

            <p className="text-xs uppercase tracking-[0.2em] font-bold dark:text-slate-400 text-slate-500">More Info</p>
            <h4 className="mt-2 text-2xl font-bold dark:text-white text-slate-900 leading-snug pr-8">{activeService.title}</h4>

            <p className="mt-4 text-sm md:text-base dark:text-slate-300 text-slate-700">
              We consider your requirement by contacting you and follow all your goals.
            </p>

            <div className="mt-4 space-y-2">
              {activeService.details.map((line) => (
                <p key={line} className="text-sm dark:text-slate-400 text-slate-600 leading-relaxed">
                  {line}
                </p>
              ))}
            </div>

            <div className="mt-6 flex flex-col sm:flex-row gap-2">
              <button
                type="button"
                onClick={() => handleRequestService(activeService)}
                className="h-10 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-bold transition-colors"
              >
                Request this service
              </button>
              <button
                type="button"
                onClick={() => setActiveService(null)}
                className="h-10 px-4 rounded-xl border text-sm font-bold transition-colors dark:bg-white/5 bg-white dark:border-white/10 border-slate-200 dark:text-slate-200 text-slate-700 dark:hover:bg-white/10 hover:bg-slate-100"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Services;
