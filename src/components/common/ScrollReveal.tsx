import React, { useEffect, useRef, useState } from 'react';

export type AnimationType =
  | 'fade-up'
  | 'fade-down'
  | 'fade-in'
  | 'slide-left'
  | 'slide-right'
  | 'zoom-in';

interface ScrollRevealProps {
  children: React.ReactNode;
  animation?: AnimationType;
  delay?: number; // delay in ms
  duration?: number; // duration in ms
  threshold?: number;
  className?: string;
  once?: boolean;
}

export const ScrollReveal: React.FC<ScrollRevealProps> = ({
  children,
  animation = 'fade-up',
  delay = 0,
  duration = 500,
  threshold = 0.12,
  className = '',
  once = true,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    // Fallback if IntersectionObserver not supported
    if (!('IntersectionObserver' in window)) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (once) {
            observer.unobserve(element);
          }
        } else if (!once) {
          setIsVisible(false);
        }
      },
      {
        threshold,
        rootMargin: '0px 0px -40px 0px',
      }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [threshold, once]);

  const getInitialStyle = (): React.CSSProperties => {
    const baseStyle: React.CSSProperties = {
      transitionProperty: 'opacity, transform',
      transitionDuration: `${duration}ms`,
      transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
      transitionDelay: `${delay}ms`,
      willChange: 'opacity, transform',
    };

    if (isVisible) {
      return {
        ...baseStyle,
        opacity: 1,
        transform: 'translate3d(0, 0, 0) scale(1)',
      };
    }

    switch (animation) {
      case 'fade-up':
        return {
          ...baseStyle,
          opacity: 0,
          transform: 'translate3d(0, 28px, 0)',
        };
      case 'fade-down':
        return {
          ...baseStyle,
          opacity: 0,
          transform: 'translate3d(0, -28px, 0)',
        };
      case 'fade-in':
        return {
          ...baseStyle,
          opacity: 0,
        };
      case 'slide-left':
        return {
          ...baseStyle,
          opacity: 0,
          transform: 'translate3d(-32px, 0, 0)',
        };
      case 'slide-right':
        return {
          ...baseStyle,
          opacity: 0,
          transform: 'translate3d(32px, 0, 0)',
        };
      case 'zoom-in':
        return {
          ...baseStyle,
          opacity: 0,
          transform: 'scale(0.92)',
        };
      default:
        return baseStyle;
    }
  };

  return (
    <div ref={ref} style={getInitialStyle()} className={className}>
      {children}
    </div>
  );
};

export default ScrollReveal;
