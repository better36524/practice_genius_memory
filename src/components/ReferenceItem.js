import React from 'react';
import cn from 'classnames';
import './ReferenceItem.scss';

const ReferenceItem = ({ item, onClick }) => {
  const { index, station, visible, selected } = item;

  return (
    <div
      className={cn('ReferenceItem', { selected })}
      onClick={() => onClick(item)}
    >
      {visible && <div className="index">{index}</div>}
      <div className="station">{station}</div>
    </div>
  );
};

export default ReferenceItem;
