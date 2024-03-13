import React, { useMemo, useState } from 'react';
import { observer } from 'mobx-react-lite';
import  style from './Table.module.css';
import pokemonStore from 'store/Store';
import { toJS } from 'shared/lib/toJS';
import ConfirmModal from '../ConfirmModal/ConfirmModal';
import { Button } from '../Button/Button';

const Table: React.FC = observer((): JSX.Element => {
  const { data, clearData, removePokemon } = pokemonStore;
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
  const [deletePokemonId, setDeletePokemonId] = useState<number | null>(null);
  const [sortBy, setSortBy] = useState<string>('');
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('asc');

  const sortedData = useMemo(() => {
    if (!sortBy) return data;
    return [...data].sort((a, b) => {
        if (sortDir === 'asc') {
            return a[sortBy] > b[sortBy] ? 1 : -1;
        } else {
            return a[sortBy] < b[sortBy] ? 1 : -1;
        }
    });
}, [data, sortBy, sortDir]);

  if (!data || data.length === 0) {
    return <p className={style.warning}>Нет данных</p>;
  }
  
  const handleSort = (column: string) => {
    if (sortBy === column) {
        setSortDir(sortDir === 'asc' ? 'desc' : 'asc');
    } else {
        setSortBy(column);
        setSortDir('asc');
    }
};
  const allColumns = data.length > 0 ? Object.keys(toJS(data[0] || {})) : [];

  const handleClearTable = (): void => {
    clearData();
  };

  
  const handleDeleteClick = (id: number) => {
    setDeletePokemonId(id);
    setShowDeleteModal(true);
  };
  
  const handleConfirmDelete = (id: number) => {
    removePokemon(id);
    setShowDeleteModal(false);
    setDeletePokemonId(null)
  };

const columnHeaders = allColumns.filter(column => [
    'id', 'name', 'height', 'weight', 'location_area_encounters'
].includes(column)).map(column => ({
    name: column,
    isSortable: true
}));
  return (
    <div className={style.root} >
      <div className={style.wrapp}>
        {data.length > 0 && 
          <Button className='clearBtn'
          onClick={handleClearTable}>Очистить</Button>}
      </div>
      <table>
        <thead>
            {columnHeaders.length > 0 && (
                <tr>
                    {columnHeaders.map(({name, isSortable}) => (
                        <th key={name} onClick={() => isSortable && handleSort(name)}>
                            {name} {isSortable && <span>{sortBy === name ? (sortDir === 'asc' ? '▲' : '▼') : ''}</span>}
                        </th>
                    ))}
                    <th>{''}</th>
                </tr>
            )}
        </thead>
        <tbody>
            {sortedData.map((pokemon, index) => (
                <tr key={index.toString()}>
                    {columnHeaders.map(({name}) => (
                        <td key={name}>{pokemon[name]}</td>
                    ))}
                      <td>
                <Button className='removeBtn' onClick={() => handleDeleteClick(pokemon.id)}>Удалить</Button>
              </td>
                </tr>
            ))}
        </tbody>
    </table>
      <ConfirmModal isOpen={showDeleteModal} onClose={() => setShowDeleteModal(false)}>
        <h2>Подтвердите удаление</h2>
        <p>Вы действительно хотите удалить строку?</p>
        <div className={style.btnsWrapper}>
          <Button className='confirmBtn' onClick={() => handleConfirmDelete(deletePokemonId || 0)}>Удалить</Button>
          <Button className='cancelBtn' onClick={() => setShowDeleteModal(false)}>Отмена</Button>
        </div>
      </ConfirmModal>
    </div>
  );
});

export default Table;
