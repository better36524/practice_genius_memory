import React from 'react';
import './SelectList.scss'
import SelectItem from './SelectItem';

const SelectList = ({ items }) => {
  return (
    <div className='SelectList'>
      {items.map(item => (
        <SelectItem item={item} />
      ))}
    </div>
  );
};

export default SelectList;