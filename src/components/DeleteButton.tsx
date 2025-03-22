import { useState, useEffect, useRef } from 'react';

import Button from './Button';

type DeleteButtonProps = {
  onDelete: () => void;
};

export default function DeleteButton({ onDelete }: DeleteButtonProps) {
  const [confirmState, setConfirmState] = useState<'initial' | 'confirm'>(
    'initial',
  );
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);

  const resetConfirmState = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    timerRef.current = setTimeout(() => {
      setConfirmState('initial');
    }, 2000);
  };

  const handleClick = () => {
    if (confirmState === 'initial') {
      setConfirmState('confirm');
      resetConfirmState();
    } else {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
      setConfirmState('initial');
      onDelete();
    }
  };

  return (
    <Button
      icon="trash"
      buttonSize="s"
      variant="link"
      title={
        confirmState === 'confirm' ? 'Click again to confirm delete' : 'Delete'
      }
      onClick={handleClick}
    />
  );
}
