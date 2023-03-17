import React, { useEffect, useState } from 'react';
import ProgressBar from 'react-bootstrap/ProgressBar';

export const AnimatedProgress = ({ label, start, end, delay }) => {
  const [progress, setProgress] = useState(0);
  const animateProgressBar = time => {
    const steps = 50;
    const diff = end - start;
    const increment = diff / steps;

    const timer = setInterval(() => {
      setProgress(prevProgress => {
        const nextProgress = prevProgress + increment;
        return nextProgress > diff ? diff : nextProgress;
      });

      if (progress > end) {
        clearInterval(timer);
      }
    }, time / steps);
  };

  useEffect(() => {
    animateProgressBar(delay);
  }, []);

  return (
    <ProgressBar>
      <ProgressBar animated striped variant="success" now={start} key={1} />
      <ProgressBar animated striped now={progress} label={label} key={2} />
    </ProgressBar>
  );
};
export default AnimatedProgress;
