import React from 'react';
import './SelectItem.scss';
import cn from 'classnames';

const SelectItem = ({ item }) => {
  const { index, station, visible, isTarget, revealed } = item;

  if (!visible) {
    return null;
  }

  return (
    <div className={cn('selectItem', { isTarget, revealed })}>
      <div className="index">{index}</div>
      {revealed && <div className="station">{station}</div>}
    </div>
  );
};

export default SelectItem;
