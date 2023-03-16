import React, { useEffect, useState } from 'react';
import ProgressBar from 'react-bootstrap/ProgressBar';

export const AnimatedProgress = ({ label, start, end, t }) => {
  const [progress, setProgress] = useState(start);
  const animateProgressBar = (value, time) => {
    const steps = 50;
    const diff = value - start;
    const increment = diff > 0 ? diff / steps : -diff / steps;

    const timer = setInterval(() => {
      setProgress(prevProgress => {
        const nextProgress = prevProgress + (diff > 0 ? increment : -increment);
        return diff > 0 ? (nextProgress > value ? value : nextProgress) : nextProgress < value ? value : nextProgress;
      });

      if ((diff > 0 && progress >= value) || (diff < 0 && progress <= value)) {
        clearInterval(timer);
      }
    }, time / steps);
  };

  useEffect(() => {
    animateProgressBar(end, t);
  }, []);

  return <ProgressBar animated striped now={progress} label={label} />;
};
export default AnimatedProgress;
