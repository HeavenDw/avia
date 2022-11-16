import React, { FC, useState } from 'react';
import DatePicker from 'react-datepicker';
import { useNavigate } from 'react-router-dom';

import 'react-datepicker/dist/react-datepicker.css';
import CustomDateInput from './CustomDateInput';
import AutoComplete from './AutoComplete';
import cities from '../data/cities.json';
import styles from '../styles/AviaForm.module.scss';
import Button from './Button';
import { AviaData } from '../types/Data';

interface AviaFormProps {
  setAviaData: (arg: AviaData) => void;
}

const AviaForm: FC<AviaFormProps> = ({ setAviaData }) => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState<AviaData>({
    fromTown: '',
    toTown: '',
    fromDate: new Date(),
    backDate: null,
  });

  const [error, setError] = useState('');

  const handleFromTownInputChange = (value: string) => {
    setError('');
    setFormData({ ...formData, fromTown: value });
  };

  const handleToTownInputChange = (value: string) => {
    setError('');
    setFormData({ ...formData, toTown: value });
  };

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();

    // Set error if typed city not in list
    if (
      !cities.find((city) => city.name === formData.fromTown) ||
      !cities.find((city) => city.name === formData.toTown)
    ) {
      setError('Выберите город из списка');
      return;
    }
    setAviaData(formData);
    navigate('/avia/info');
  };

  return (
    <form onSubmit={handleSubmit} className={styles.aviaForm}>
      <div className={styles.top}>
        <div className={styles.input}>
          <label>Откуда*</label>
          <AutoComplete
            suggestions={cities}
            placeholder="Город вылета"
            value={formData.fromTown}
            onChange={handleFromTownInputChange}
          />
        </div>

        <div className={styles.input}>
          <label>Куда*</label>
          <AutoComplete
            suggestions={cities}
            placeholder="Город прилёта"
            value={formData.toTown}
            onChange={handleToTownInputChange}
          />
        </div>

        <div className={`${styles.input} ${styles.from}`}>
          <label>Туда*</label>
          <DatePicker
            minDate={new Date()}
            selected={formData.fromDate}
            onChange={(date) => setFormData({ ...formData, fromDate: date })}
            dateFormat="dd.MM.yy"
            customInput={React.createElement(React.forwardRef(CustomDateInput))}
          />
        </div>

        <div className={styles.input}>
          <label>Обратно</label>
          <DatePicker
            minDate={formData.fromDate}
            onChange={(date) => setFormData({ ...formData, backDate: date })}
            selected={formData.backDate}
            dateFormat="dd.MM.yy"
            placeholderText="дд.мм.гг"
            customInput={React.createElement(React.forwardRef(CustomDateInput))}
          />
        </div>
      </div>

      <div className={styles.bottom}>
        {error && <span className={styles.error}>{error}</span>}
        <Button type="submit" disabled={!formData.fromTown || !formData.toTown ? true : false}>
          Найти билеты
        </Button>
      </div>
    </form>
  );
};

export default AviaForm;
