import React, { useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { Button } from 'shared/ui/Button/Button';
import Table from 'shared/ui/Table/Table';

import style from  './styles/index.module.css';
import './styles/reset.css';
import pokemonStore from 'store/Store';
import { Loader } from 'shared/ui/Loader/Loader';
import { classNames } from 'shared/lib/classNames';

const App = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    setIsLoading(true);
    setError(null);

    try {
      await pokemonStore.fetchData();
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={style.root}>
    
      <div className={style.header}>
        <Button className='queryBtn' onClick={fetchData}>
          {isLoading ? 'Загрузка...' : 'Обновить'}
        </Button>
      </div>

      <Table />

      {error && <p style={{ color: 'red' }}>Error: {error}</p>}

      {isLoading && <Loader />}
    </div>
  );
};

export default observer(App);
