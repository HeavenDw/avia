import React, { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import AviaForm from './AviaForm';
import AviaInfo from './AviaInfo';
import styles from '../styles/App.module.scss';
import { AviaData } from '../types/Data';

const App = () => {
  const [aviaData, setAviaData] = useState<AviaData>({
    fromTown: '',
    toTown: '',
    fromDate: null,
    backDate: null,
  });

  return (
    <div className={styles.app}>
      <Routes>
        <Route path="/" element={<Navigate to="avia" />} />
        <Route path="avia" element={<AviaForm setAviaData={setAviaData} />} />
        <Route path="avia/info" element={<AviaInfo {...aviaData} />} />
      </Routes>
    </div>
  );
};

export default App;
