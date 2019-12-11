import React from 'react';
import ReferenceItem from './ReferenceItem';
import './Reference.scss'

const Reference = ({ items, onClick }) => {
  return (
    <div className="Reference">
      {items.map(item => (
        <ReferenceItem item={item} onClick={onClick} />
      ))}
    </div>
  );
};

export default Reference;
