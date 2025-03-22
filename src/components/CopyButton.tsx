import { useState, useEffect, useRef } from 'react';

import Button from './Button';

type CopyButtonProps = {
  textToCopy?: string;
};

export default function CopyButton({ textToCopy }: CopyButtonProps) {
  const [success, setSuccess] = useState('');
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);

  const resetSuccessMessage = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    timerRef.current = setTimeout(() => {
      setSuccess('');
    }, 1000);
  };

  const copyToClipboard = async () => {
    if (!textToCopy) {
      return;
    }
    try {
      await navigator.clipboard.writeText(textToCopy);
      setSuccess('Copied!');
      resetSuccessMessage();
    } catch {
      setSuccess('Failed to copy');
      resetSuccessMessage();
    }
  };

  return (
    <Button
      icon="copy"
      iconPosition="right"
      buttonSize="s"
      variant="link"
      title={success || 'Copy to clipboard'}
      onClick={copyToClipboard}
    />
  );
}
