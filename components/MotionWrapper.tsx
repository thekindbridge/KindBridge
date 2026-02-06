
import React, { useEffect, useRef } from 'react';

interface MotionWrapperProps {
  children: React.ReactNode;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  className?: string;
}

const MotionWrapper: React.FC<MotionWrapperProps> = ({ 
  children, 
  delay = 0, 
  direction = 'up',
  className = "" 
}) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('opacity-100', 'translate-x-0', 'translate-y-0');
          entry.target.classList.remove('opacity-0', 'translate-y-10', 'translate-y--10', 'translate-x-10', 'translate-x--10');
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const getInitialStyles = () => {
    switch (direction) {
      case 'up': return 'translate-y-10';
      case 'down': return '-translate-y-10';
      case 'left': return 'translate-x-10';
      case 'right': return '-translate-x-10';
      default: return '';
    }
  };

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`opacity-0 transition-all duration-700 ease-out transform ${getInitialStyles()} ${className}`}
    >
      {children}
    </div>
  );
};

export default MotionWrapper;
