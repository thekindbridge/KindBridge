
import React from 'react';
import { Service, ServiceDetail, ServiceId, ValuePoint } from './types';

export const PROJECT_SERVICES: Service[] = [
  {
    id: 'full_stack',
    title: 'Full-Stack Web Applications',
    description: 'Scalable frontend and backend web applications using modern technologies.',
    imageUrl: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=800&h=600',
  },
  {
    id: 'ai_ml',
    title: 'AI / ML Model Development',
    description: 'Custom machine learning models for prediction, classification, and automation.',
    imageUrl: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800&h=600',
  },
  {
    id: 'automation',
    title: 'Automation & Workflow Systems',
    description: 'Automating repetitive tasks and business workflows using smart systems.',
    imageUrl: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=800&h=600',
  },
  {
    id: 'data_analytics',
    title: 'Data Analytics & Dashboards',
    description: 'Interactive dashboards and data insights for informed decision-making.',
    imageUrl: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=800&h=600',
  },
  {
    id: 'academic_projects',
    title: 'Academic Final-Year Projects',
    description: 'Complete guidance and development for B.Tech, M.Tech, and MCA projects.',
    imageUrl: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&q=80&w=800&h=600',
  },
];

export const SMALL_SERVICES: Service[] = [
  {
    id: 'debugging',
    title: 'Code Debugging & Fixes',
    description: 'Identifying and fixing bugs in existing codebases.',
    imageUrl: 'https://images.unsplash.com/photo-1542831371-29b0f74f9713?auto=format&fit=crop&q=80&w=800&h=600',
  },
  {
    id: 'mini_projects',
    title: 'Mini Projects / Assignments',
    description: 'Small academic or practice projects with clean implementation.',
    imageUrl: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80&w=800&h=600',
  },
  {
    id: 'resume_support',
    title: 'Resume & Portfolio Support',
    description: 'Technical resumes and project portfolios for students and job seekers.',
    imageUrl: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?auto=format&fit=crop&q=80&w=800&h=600',
  },
  {
    id: 'system_design',
    title: 'System Design Diagrams',
    description: 'Architecture diagrams, ER diagrams, flowcharts, and UMLs.',
    imageUrl: 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&q=80&w=800&h=600',
  },
  {
    id: 'simplification',
    title: 'Content Simplification',
    description: 'Converting complex technical content into easy-to-understand format.',
    imageUrl: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&q=80&w=800&h=600',
  },
];

export const SERVICE_DETAILS: Record<ServiceId, ServiceDetail> = {
  full_stack: {
    title: 'Full-Stack Web Applications',
    shortDescription: 'End-to-end web products with reliable architecture and polished UX.',
    fullDescription:
      'We design and build complete web applications that balance performance, usability, and long-term maintainability. From requirements to deployment, we focus on scalable architecture, clean interfaces, and robust backend systems tailored to your business goals.',
    features: [
      'Product discovery and technical planning',
      'Responsive, accessible UI with reusable components',
      'Secure authentication and role-based access',
      'API design and integration',
      'Deployment guidance and handoff documentation',
    ],
    technologies: ['React', 'TypeScript', 'Node.js', 'PostgreSQL', 'Firebase', 'Vercel'],
    idealFor: 'Startups, small businesses, and teams launching or modernizing web platforms.',
    deliveryTime: '5 to 7 days depending on scope and integrations.',
  },
  ai_ml: {
    title: 'AI / ML Model Development',
    shortDescription: 'Production-ready machine learning solutions from data to deployment.',
    fullDescription:
      'We build custom AI and ML models that solve real business problems and integrate seamlessly into your product. Our process includes data preparation, model training, evaluation, and deployment strategies to ensure reliable performance in real-world environments.',
    features: [
      'Data assessment and feature engineering',
      'Model selection, training, and evaluation',
      'Explainability and bias review',
      'API or pipeline integration',
      'Performance monitoring recommendations',
    ],
    technologies: ['Python', 'scikit-learn', 'TensorFlow', 'PyTorch', 'FastAPI', 'Pandas'],
    idealFor: 'Teams seeking predictive analytics, automation, or intelligent decision systems.',
    deliveryTime: '4 to 7 days based on data quality and complexity.',
  },
  automation: {
    title: 'Automation & Workflow Systems',
    shortDescription: 'Streamlined operations through smart, repeatable workflows.',
    fullDescription:
      'We automate repetitive processes to reduce manual effort and improve reliability. From internal operations to customer-facing workflows, we design systems that connect tools, trigger actions, and provide visibility into execution.',
    features: [
      'Workflow mapping and optimization',
      'Integration across apps and services',
      'Scheduled or event-driven automation',
      'Error handling and notifications',
      'Audit trails and reporting',
    ],
    technologies: ['Node.js', 'Python', 'Zapier', 'Make', 'Firebase', 'REST APIs'],
    idealFor: 'Operations teams, founders, and businesses scaling manual processes.',
    deliveryTime: '3 to 7 days depending on integrations and workflow depth.',
  },
  data_analytics: {
    title: 'Data Analytics & Dashboards',
    shortDescription: 'Actionable insights with clean, interactive dashboards.',
    fullDescription:
      'We transform raw data into clear, decision-ready dashboards. Our focus is on accuracy, clarity, and real-time visibility so you can track KPIs, spot trends, and make confident decisions faster.',
    features: [
      'KPI definition and metric alignment',
      'Data modeling and cleaning',
      'Interactive charts and filters',
      'Role-based access to reports',
      'Documentation for ongoing updates',
    ],
    technologies: ['React', 'TypeScript', 'D3.js', 'Chart.js', 'SQL', 'Supabase'],
    idealFor: 'Business leaders and analysts who need trustworthy reporting.',
    deliveryTime: '4 to 7 days based on data sources and complexity.',
  },
  academic_projects: {
    title: 'Academic Final-Year Projects',
    shortDescription: 'Guided, high-quality project development for academic success.',
    fullDescription:
      'We provide structured mentoring and development support for final-year academic projects. From topic selection to implementation and documentation, we help students deliver polished, presentation-ready outcomes.',
    features: [
      'Project scoping and feasibility review',
      'Architecture planning and implementation',
      'Documentation and report assistance',
      'Testing and validation guidance',
      'Presentation and demo preparation',
    ],
    technologies: ['React', 'Python', 'Java', 'MySQL', 'Firebase', 'Git'],
    idealFor: 'B.Tech, M.Tech, and MCA students seeking reliable project support.',
    deliveryTime: '5 to 7 days based on project complexity and timeline.',
  },
  debugging: {
    title: 'Code Debugging & Fixes',
    shortDescription: 'Fast, accurate bug identification and resolution.',
    fullDescription:
      'We diagnose issues efficiently and deliver clean fixes with minimal disruption. Our approach focuses on root-cause analysis, safe refactoring, and clear explanations to prevent future regressions.',
    features: [
      'Root-cause analysis',
      'Targeted fixes with minimal risk',
      'Optional refactors for stability',
      'Regression checks and validation',
      'Clear summary of changes',
    ],
    technologies: ['JavaScript', 'TypeScript', 'Python', 'React', 'Node.js', 'Jest'],
    idealFor: 'Teams needing urgent fixes or stability improvements.',
    deliveryTime: '1 to 5 days depending on severity and scope.',
  },
  mini_projects: {
    title: 'Mini Projects / Assignments',
    shortDescription: 'Compact builds with clean code and strong fundamentals.',
    fullDescription:
      'We help deliver small projects and assignments with attention to structure, clarity, and best practices. Each build is organized for easy evaluation and future improvements.',
    features: [
      'Well-structured project setup',
      'Clear, readable codebase',
      'Core features fully implemented',
      'Basic testing or validation',
      'Concise documentation',
    ],
    technologies: ['HTML', 'CSS', 'JavaScript', 'React', 'Python', 'Git'],
    idealFor: 'Students and learners with deadlines or lab requirements.',
    deliveryTime: '3 to 10 days depending on requirements.',
  },
  resume_support: {
    title: 'Resume & Portfolio Support',
    shortDescription: 'Professional presentation of your skills and projects.',
    fullDescription:
      'We craft or refine technical resumes and portfolios that highlight your strengths. Expect clean formatting, clear impact statements, and a cohesive personal brand.',
    features: [
      'Resume review and rewrite',
      'Project summaries and impact bullets',
      'Portfolio content structure',
      'ATS-friendly formatting',
      'LinkedIn alignment tips',
    ],
    technologies: ['Figma', 'Canva', 'Notion', 'Google Docs', 'Markdown'],
    idealFor: 'Students and professionals preparing for internships or jobs.',
    deliveryTime: '2 to 5 days depending on revisions.',
  },
  system_design: {
    title: 'System Design Diagrams',
    shortDescription: 'Clear architecture visuals that communicate systems effectively.',
    fullDescription:
      'We create crisp, easy-to-understand diagrams that explain how systems work. This includes architecture, data flow, ER, UML, and process diagrams for technical or academic use.',
    features: [
      'Architecture and data flow diagrams',
      'ER and UML diagrams',
      'Clean visual hierarchy and labels',
      'Multiple export formats',
      'Revision support',
    ],
    technologies: ['Lucidchart', 'Figma', 'Draw.io', 'Mermaid', 'PlantUML'],
    idealFor: 'Teams and students needing clear system communication.',
    deliveryTime: '2 to 7 days depending on scope.',
  },
  simplification: {
    title: 'Content Simplification',
    shortDescription: 'Complex technical content translated into clear language.',
    fullDescription:
      'We rewrite and structure dense technical material to make it easier to understand. This includes summaries, notes, and learning aids that preserve accuracy while improving clarity.',
    features: [
      'Content restructuring and editing',
      'Visual explanations and examples',
      'Glossary and key terms',
      'Study-friendly formatting',
      'Iterative review',
    ],
    technologies: ['Google Docs', 'Notion', 'Markdown', 'Figma'],
    idealFor: 'Students, educators, and teams preparing learning materials.',
    deliveryTime: '1 to 4 days depending on length.',
  },
};

export const ALL_SERVICES = [...PROJECT_SERVICES, ...SMALL_SERVICES];

export const VALUES: ValuePoint[] = [
  {
    title: 'Human-First',
    description: 'Technology should serve people, not the other way around. We prioritize empathy.',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
      </svg>
    ),
  },
  {
    title: 'Unwavering Trust',
    description: 'We build long-term relationships through transparency and reliable delivery.',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
  },
  {
    title: 'Innovative Care',
    description: 'Cutting-edge solutions delivered with meticulous attention to detail.',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
  },
  {
    title: 'Global Connectivity',
    description: 'Bridging the gap between diverse needs and expert capabilities.',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
      </svg>
    ),
  },
];
