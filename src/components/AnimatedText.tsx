import { useState, useEffect } from 'react';

import { sleep } from '../utils/utils';

type AnimatedTextProps = {
  text: string;
  className?: string;
};

export default function AnimatedText({ text, className }: AnimatedTextProps) {
  const [displayedText, setDisplayedText] = useState('');

  useEffect(() => {
    const animate = async () => {
      const words = text.split(/(\s+)/);
      let currentText = '';
      const baseDelay = 3000 / words.length;

      for (const word of words) {
        currentText += word;
        setDisplayedText(currentText);
        await sleep(baseDelay * (0.8 + Math.random() * 0.4));
      }
    };

    animate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <p className={className}>{displayedText}</p>;
}
