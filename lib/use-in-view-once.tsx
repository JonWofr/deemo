import React, { useEffect, useRef, useState } from 'react';

const defaultOptions: IntersectionObserverInit = {
  root: null,
  rootMargin: '0px 0px -100px 0px',
  threshold: 0,
};

const useInViewOnce = (
  options: IntersectionObserverInit = defaultOptions
): [React.MutableRefObject<null>, boolean] => {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      intersectionObserverCallback,
      options
    );
    if (ref.current) observer.observe(ref.current);
    return () => {
      if (ref.current) observer.unobserve(ref.current);
    };
  }, [options, ref]);

  const intersectionObserverCallback = (
    entries: IntersectionObserverEntry[],
    observer: IntersectionObserver
  ) => {
    const [entry] = entries;
    if (entry.isIntersecting) {
      setIsVisible(entry.isIntersecting);
      observer.unobserve(entry.target);
    }
  };

  return [ref, isVisible];
};

export default useInViewOnce;
