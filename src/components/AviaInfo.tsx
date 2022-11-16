import React, { FC } from 'react';
import { AviaData } from '../types/Data';
import Ticket from './Ticket';
import styles from '../styles/AviaInfo.module.scss';

const timesListFrom = [
  { timeStart: '09:20', timeEnd: '11:05' },
  { timeStart: '10:20', timeEnd: '12:05' },
  { timeStart: '11:20', timeEnd: '13:05' },
];

const timesListBack = [
  { timeStart: '19:20', timeEnd: '21:05' },
  { timeStart: '20:20', timeEnd: '22:05' },
  { timeStart: '21:20', timeEnd: '23:05' },
];

const AviaInfo: FC<AviaData> = ({ fromTown, toTown, fromDate, backDate }) => {
  return (
    <div className={styles.aviaInfo}>
      <div className={styles.tickets}>
        <Ticket fromTown={fromTown} toTown={toTown} fromDate={fromDate} timesList={timesListFrom} />
        {backDate && (
          <>
            <span className={styles.divider}></span>
            <Ticket
              fromTown={toTown}
              toTown={fromTown}
              fromDate={backDate}
              timesList={timesListBack}
            />
          </>
        )}
      </div>
      <div className={styles.price}>{backDate ? '9 300 ₽' : '4 150 ₽'}</div>
    </div>
  );
};

export default AviaInfo;
