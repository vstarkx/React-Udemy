import React, { forwardRef, useImperativeHandle, useRef } from 'react';
import { createPortal } from 'react-dom';

interface ResultModalProps {
  targetTime: number;
  remainingTime: number;
  onReset: () => void;
}

export interface ResultModalRef {
  open: () => void;
}

const ResultModal = forwardRef<ResultModalRef, ResultModalProps>(
  ({ targetTime, remainingTime, onReset }, ref) => {
    const dialog = useRef<HTMLDialogElement>(null);

    useImperativeHandle(ref, () => ({
      open() {
        if (dialog.current) {
          dialog.current.showModal();
        }
      },
    }));

    const userLost = remainingTime <= 0;
    const formattedRemainingTime = (remainingTime / 1000).toFixed(2);
    const score = Math.round((1 - remainingTime / (targetTime * 1000)) * 100);

    return createPortal(
      <dialog ref={dialog} className="result-modal">
        {userLost && <h2>You lost</h2>}
        {!userLost && <h2>Your Score: {score}</h2>}
        <p>
          The target time was <strong>{targetTime} seconds.</strong>
        </p>
        <p>
          You stopped the timer with <strong>{formattedRemainingTime} seconds left.</strong>
        </p>
        <form method="dialog" onSubmit={onReset}>
          <button>Close</button>
        </form>
      </dialog>,
      document.getElementById('modal') as HTMLElement
    );
  }
);

ResultModal.displayName = 'ResultModal';

export default ResultModal;