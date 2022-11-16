import React, { FC } from 'react';
import styles from '../styles/TimeButton.module.scss';

interface ButtonProps {
  timeStart: string;
  timeEnd: string;
  active: boolean;
  index: number;
  onClick: (buttonIndex: number, timeStart: string, timeEnd: string) => void;
}

const TimeButton: FC<ButtonProps> = ({ timeStart, timeEnd, active, onClick, index }) => {
  return (
    <button
      className={active ? `${styles.button} ${styles.active}` : styles.button}
      onClick={() => onClick(index, timeStart, timeEnd)}>
      <span>{timeStart} -</span> {timeEnd}
    </button>
  );
};

export default TimeButton;
